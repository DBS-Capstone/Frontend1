import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiInfo, FiEye } from 'react-icons/fi';
import { getConservationStatusColor, formatSize } from '../../data/realBirdData';

const EnhancedBirdCard = ({ bird, index = 0 }) => {
  const truncateText = (text, maxLength = 120) => {
    if (!text) return 'Deskripsi tidak tersedia';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-ui-surface rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-ui-border"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={bird.image_url}
          alt={bird.common_name || 'Burung'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Conservation status badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConservationStatusColor(bird.conservation_status)}`}>
            {bird.conservation_status}
          </span>
        </div>

        {/* Confidence badge if available */}
        {bird.confidence && (
          <div className="absolute top-3 left-3 bg-brand-sage text-white px-2 py-1 rounded-full text-xs font-semibold">
            {Math.round(bird.confidence * 100)}%
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Bird Names */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-brand-sage transition-colors duration-200">
            {bird.common_name || 'Burung Tidak Dikenal'}
          </h3>
          <p className="text-sm text-text-secondary italic">
            {bird.scientific_name || 'Nama ilmiah tidak tersedia'}
          </p>
          <p className="text-xs text-brand-sage font-medium mt-1">
            {bird.family} • {bird.order_name}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
              Panjang
            </p>
            <p className="text-sm font-bold text-green-800">
              {formatSize(bird.size_length_cm, 'cm')}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
              Berat
            </p>
            <p className="text-sm font-bold text-blue-800">
              {formatSize(bird.size_weight_g, 'g')}
            </p>
          </div>
        </div>

        {/* Habitat */}
        {bird.habitat && (
          <div className="flex items-start mb-3 text-sm text-text-secondary">
            <FiMapPin className="w-4 h-4 mr-2 text-brand-sage mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{bird.habitat.split(',')[0].trim()}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {truncateText(bird.description)}
        </p>

        {/* Vocalization preview */}
        {bird.vocalization && (
          <div className="flex items-start mb-4 text-sm text-text-secondary bg-ui-bg rounded-lg p-3">
            <FiEye className="w-4 h-4 mr-2 text-brand-sage mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 italic">"{truncateText(bird.vocalization, 80)}"</span>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/birdpedia/${bird.id}`}
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-brand-sage to-brand-forest text-white font-semibold rounded-lg hover:from-brand-forest hover:to-brand-sage transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <FiInfo className="w-4 h-4 mr-2" />
          Lihat Detail Lengkap
        </Link>
      </div>
    </motion.div>
  );
};

export default EnhancedBirdCard;