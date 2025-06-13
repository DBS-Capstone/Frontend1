import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FiSearch, FiFilter } from 'react-icons/fi';
import birdService from '../services/birdService';
import BirdCard from '../components/birdpedia/BirdCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BirdpediaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [habitatFilter, setHabitatFilter] = useState('');

  // Fetch all birds
  const { data: birds, isLoading, isError, error } = useQuery(
    'allBirds',
    () => birdService.getAllBirds(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Get unique habitats for filter
  const habitats = React.useMemo(() => {
    if (!birds) return [];
    const uniqueHabitats = [...new Set(
      birds
        .map(bird => bird.habitat)
        .filter(habitat => habitat)
        .map(habitat => habitat.split(',')[0].trim()) // Take first habitat if multiple
    )];
    return uniqueHabitats.sort();
  }, [birds]);

  // Filter birds based on search and habitat
  const filteredBirds = React.useMemo(() => {
    if (!birds) return [];
    
    return birds.filter(bird => {
      const matchesSearch = !searchTerm || 
        bird.common_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bird.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesHabitat = !habitatFilter || 
        bird.habitat?.toLowerCase().includes(habitatFilter.toLowerCase());
      
      return matchesSearch && matchesHabitat;
    });
  }, [birds, searchTerm, habitatFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600">Memuat data burung...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Gagal Memuat Data
          </h1>
          <p className="text-gray-600 mb-4">
            {error?.message || 'Terjadi kesalahan saat memuat data burung'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Birdpedia
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Jelajahi koleksi lengkap informasi burung dari berbagai spesies di seluruh dunia
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari burung berdasarkan nama..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Habitat Filter */}
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={habitatFilter}
                onChange={(e) => setHabitatFilter(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Semua Habitat</option>
                {habitats.map((habitat) => (
                  <option key={habitat} value={habitat}>
                    {habitat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {filteredBirds.length} dari {birds?.length || 0} burung
          </div>
        </div>

        {/* Birds Grid */}
        {filteredBirds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBirds.map((bird, index) => (
              <div
                key={bird.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BirdCard bird={bird} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tidak ada burung ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah kata kunci pencarian atau filter habitat
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirdpediaPage;