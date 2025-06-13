import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import birdService from '../services/birdService';
import { useBirdStore } from '../store/birdStore';

export const useBirdIdentification = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { addHistoryItem } = useBirdStore();

  const identifyBird = useCallback(async (file) => {
    if (!file) {
      toast.error('Silakan berikan file audio');
      return;
    }

    try {
      setUploadProgress(0);

      const result = await birdService.identifyBird(file, (progress) => {
        setUploadProgress(progress);
      });

      // Save the result to history
      try {
        const historyItem = {
          audioFileName: file.name,
          audioFileSize: file.size,
          results: result.predictions || result,
          confidence: result.predictions?.[0]?.confidence || result[0]?.confidence || 0,
          processingTime: result.processingTime || 0,
        };

        await birdService.saveIdentificationResult(historyItem);
        addHistoryItem(historyItem);
      } catch (saveError) {
        console.warn('Failed to save identification result:', saveError);
      }

      toast.success('Burung berhasil diidentifikasi!');
      return result;
    } catch (error) {
      console.error('Identification failed:', error);
      toast.error(error.message || 'Gagal mengidentifikasi burung');
      throw error;
    } finally {
      setUploadProgress(0);
    }
  }, [addHistoryItem]);

  const handleFileUpload = useCallback((file) => {
    setAudioFile(file);
  }, []);

  const clearAudio = useCallback(() => {
    setAudioFile(null);
    setUploadProgress(0);
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const handleRecordingComplete = useCallback((recordedBlob) => {
    const audioFile = new File([recordedBlob.blob], 'recorded-audio.wav', {
      type: 'audio/wav',
    });
    setAudioFile(audioFile);
  }, []);

  return {
    audioFile,
    isRecording,
    uploadProgress,
    identifyBird,
    startRecording,
    stopRecording,
    handleRecordingComplete,
    handleFileUpload,
    clearAudio,
  };
};
