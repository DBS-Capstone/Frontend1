import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiInfo } from 'react-icons/fi';

const BirdCard = ({ bird }) => {
  // Get the first photo or use placeholder
  const imageUrl = bird.foto_voice && bird.foto_voice.length > 0 
    ? bird.foto_voice[0].foto_url 
    : 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400';

  // Format size data
  const formatSize = (value, unit) => {
    if (!value) return 'N/A';
    return `${value} ${unit}`;
  };

  // Truncate description
  const truncateText = (text, maxLength = 120) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={bird.common_name || 'Bird'}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        {bird.confidence && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {Math.round(bird.confidence * 100)}%
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Bird Names */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {bird.common_name || 'Unknown Bird'}
          </h3>
          <p className="text-sm text-gray-600 italic">
            {bird.scientific_name || 'Scientific name not available'}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
              Panjang
            </p>
            <p className="text-lg font-bold text-green-800">
              {formatSize(bird.size_length_cm, 'cm')}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              Berat
            </p>
            <p className="text-lg font-bold text-blue-800">
              {formatSize(bird.size_weight_g, 'g')}
            </p>
          </div>
        </div>

        {/* Habitat */}
        {bird.habitat && (
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <FiMapPin className="w-4 h-4 mr-2 text-green-500" />
            <span className="line-clamp-1">{bird.habitat}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {truncateText(bird.description)}
        </p>

        {/* Action Button */}
        <Link
          to={`/birdpedia/${bird.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
        >
          <FiInfo className="w-4 h-4 mr-2" />
          Lihat Detail Lengkap
        </Link>
      </div>
    </div>
  );
};

export default BirdCard;