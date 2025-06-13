import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiVolumeX, 
  FiHeart, 
  FiEye, 
  FiStar,
  FiInfo,
  FiHome,
  FiShare2
} from 'react-icons/fi';
import { realBirdData, getConservationStatusColor, formatSize } from '../../data/realBirdData';
import EnhancedBirdCard from './EnhancedBirdCard';

const BirdDetailPage = () => {
  const { birdId } = useParams();
  const navigate = useNavigate();
  
  const bird = realBirdData.find(b => b.id === parseInt(birdId));
  
  // Get other birds for recommendations
  const otherBirds = realBirdData
    .filter(b => b.id !== bird?.id)
    .slice(0, 4);

  if (!bird) {
    return (
      <div className="min-h-screen bg-ui-bg flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-red-500 text-6xl mb-4">🐦</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Burung Tidak Ditemukan
          </h1>
          <p className="text-text-secondary mb-4">
            Burung yang Anda cari tidak ditemukan dalam database kami
          </p>
          <Link
            to="/birdpedia"
            className="bg-brand-sage text-white px-6 py-2 rounded-lg hover:bg-brand-forest transition-colors"
          >
            Kembali ke Birdpedia
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `${bird.common_name} - Kicau Finder`,
      text: `Pelajari tentang ${bird.common_name} (${bird.scientific_name}) di Kicau Finder!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-ui-bg">
      {/* Header with Back Button */}
      <div className="bg-ui-surface shadow-sm border-b border-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/birdpedia"
              className="inline-flex items-center text-brand-sage hover:text-brand-forest transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Birdpedia
            </Link>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-brand-sage text-white rounded-lg hover:bg-brand-forest transition-colors"
            >
              <FiShare2 className="w-4 h-4 mr-2" />
              Bagikan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bird Details */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-ui-surface rounded-2xl shadow-lg overflow-hidden border border-ui-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={bird.image_url}
                  alt={bird.common_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow-soft">
                    {bird.common_name}
                  </h1>
                  <p className="text-lg italic opacity-90">
                    {bird.scientific_name}
                  </p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConservationStatusColor(bird.conservation_status)}`}>
                      {bird.conservation_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Content Panel */}
              <div className="max-h-[600px] overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                        Panjang
                      </p>
                      <p className="text-lg font-bold text-green-800">
                        {formatSize(bird.size_length_cm, 'cm')}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        Berat
                      </p>
                      <p className="text-lg font-bold text-blue-800">
                        {formatSize(bird.size_weight_g, 'g')}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                        Rentang Sayap
                      </p>
                      <p className="text-lg font-bold text-purple-800">
                        {formatSize(bird.size_wingspan_cm, 'cm')}
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
                        Famili
                      </p>
                      <p className="text-sm font-bold text-orange-800">
                        {bird.family}
                      </p>
                    </div>
                  </div>

                  {/* Description Section */}
                  {bird.description && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiInfo className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Deskripsi</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.description}
                      </p>
                    </div>
                  )}

                  {/* Habitat Section */}
                  {bird.habitat && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Habitat</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.habitat}
                      </p>
                    </div>
                  )}

                  {/* Vocalization Section */}
                  {bird.vocalization && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiVolumeX className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Suara</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.vocalization}
                      </p>
                    </div>
                  )}

                  {/* Diet Section */}
                  {bird.diet && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiHeart className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Makanan</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.diet}
                      </p>
                    </div>
                  )}

                  {/* Behavior Section */}
                  {bird.behavior && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiEye className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Perilaku</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.behavior}
                      </p>
                    </div>
                  )}

                  {/* Nesting Section */}
                  {bird.nesting && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiHome className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Bersarang</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.nesting}
                      </p>
                    </div>
                  )}

                  {/* Cool Facts Section */}
                  {bird.cool_facts && Array.isArray(bird.cool_facts) && bird.cool_facts.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiStar className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Fakta Menarik</h2>
                      </div>
                      <ul className="space-y-2">
                        {bird.cool_facts.map((fact, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-brand-sage rounded-full mt-2 flex-shrink-0" />
                            <span className="text-text-secondary">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Finding Tips Section */}
                  {bird.finding_tips && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FiEye className="w-5 h-5 text-brand-sage" />
                        <h2 className="text-xl font-semibold text-text-primary">Tips Menemukan</h2>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {bird.finding_tips}
                      </p>
                    </div>
                  )}

                  {/* External Link */}
                  {bird.ebird_url && (
                    <div className="pt-4 border-t border-ui-border">
                      <a
                        href={bird.ebird_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FiInfo className="w-4 h-4 mr-2" />
                        Lihat di eBird
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Other Birds */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-ui-surface rounded-2xl shadow-lg p-6 border border-ui-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Burung Lainnya
              </h3>
              
              {otherBirds.length > 0 ? (
                <div className="space-y-6">
                  {otherBirds.map((otherBird, index) => (
                    <motion.div 
                      key={otherBird.id} 
                      className="transform scale-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    >
                      <EnhancedBirdCard bird={otherBird} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-text-secondary text-4xl mb-2">🐦</div>
                  <p className="text-text-secondary">Tidak ada burung lain tersedia</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdDetailPage;