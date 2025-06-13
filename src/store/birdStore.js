import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useBirdStore = create(
  persist(
    (set, get) => ({
      // State untuk audio dan hasil
      audioFile: null,
      results: [],
      isLoading: false,
      error: null,
      uploadProgress: 0,

      // State untuk riwayat - sekarang disimpan di localStorage
      history: [],

      // Actions
      setAudioFile: (file) => set({ audioFile: file, error: null }),
      setResults: (results) => set({ results }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setUploadProgress: (progress) => set({ uploadProgress: progress }),
      
      addHistoryItem: (item) => {
        const newItem = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...item
        };
        set((state) => ({ 
          history: [newItem, ...state.history.slice(0, 49)] // Keep only last 50 items
        }));
      },
      
      removeHistoryItem: (id) => set((state) => ({
        history: state.history.filter(item => item.id !== id)
      })),
      
      clearHistory: () => set({ history: [] }),
      
      // Reset state
      resetState: () => set({
        audioFile: null,
        results: [],
        isLoading: false,
        error: null,
        uploadProgress: 0
      })
    }),
    {
      name: 'bird-finder-storage',
      storage: createJSONStorage(() => localStorage),
      // Persist semua state termasuk history
      partialize: (state) => ({ 
        history: state.history 
      }),
    }
  )
);