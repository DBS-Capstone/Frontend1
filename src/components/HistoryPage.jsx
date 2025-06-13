import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaTrash, FaClock, FaFileAudio, FaHistory } from "react-icons/fa";
import { useBirdStore } from "../store/birdStore";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const { history, removeHistoryItem, clearHistory } = useBirdStore();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Empty State Component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center py-20"
    >
      <div className="relative mb-8">
        {/* Bird on branch illustration */}
        <svg
          className="mx-auto w-32 h-32 text-brand-sage/30"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Branch */}
          <path
            d="M20 120 L180 120"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M40 120 L50 110 M60 120 L70 110 M80 120 L90 110"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Bird silhouette */}
          <path
            d="M100 100 C95 95, 85 95, 80 100 C75 105, 75 115, 80 120 L120 120 C125 115, 125 105, 120 100 C115 95, 105 95, 100 100 Z"
            fill="currentColor"
          />
          <circle cx="90" cy="105" r="2" fill="#1E403C" />
          <path
            d="M75 108 C70 110, 65 108, 60 105"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        
        {/* Floating leaves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 text-brand-sage/20"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>
      
      <h2 className="text-3xl font-montserrat font-bold text-text-primary mb-4">
        Belum Ada Riwayat
      </h2>
      <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
        Mulai identifikasi burung untuk melihat hasilnya di sini! Riwayat identifikasi akan membantu Anda melacak penemuan burung.
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-brand-sage text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-brand-forest hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <i className="fas fa-microphone mr-2" />
        Mulai Identifikasi Burung
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-ui-bg">
      <Helmet>
        <title>Riwayat - Kicau Finder</title>
      </Helmet>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-sage to-brand-forest text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaHistory className="text-4xl text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold">
                Riwayat Identifikasi
              </h1>
            </div>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Hasil identifikasi burung Anda tersimpan di sini untuk referensi masa depan
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-ui-surface rounded-2xl shadow-sm border border-ui-border"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-brand-sage/20 rounded-full flex items-center justify-center">
                <FaFileAudio className="text-brand-sage text-lg" />
              </div>
              <div>
                <p className="text-text-primary font-semibold">
                  {history.length} identifikasi{history.length !== 1 ? '' : ''} ditemukan
                </p>
                <p className="text-text-secondary text-sm">
                  Terus jelajahi untuk menemukan lebih banyak burung!
                </p>
              </div>
            </div>
            <motion.button
              onClick={clearHistory}
              className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash />
              <span>Hapus Semua Riwayat</span>
            </motion.button>
          </motion.div>
        )}

        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {history.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-ui-surface p-6 rounded-2xl shadow-lg border border-ui-border hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-brand-sage/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🐦</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-text-primary group-hover:text-brand-sage transition-colors duration-200">
                          {item.results[0]?.birdName || 'Burung Tidak Dikenal'}
                        </h3>
                        {item.results[0]?.scientificName && (
                          <p className="text-text-secondary italic">
                            {item.results[0].scientificName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <span className="flex items-center space-x-2">
                        <FaClock className="text-brand-sage" />
                        <span>{formatDate(item.timestamp)}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <FaFileAudio className="text-brand-sage" />
                        <span>{item.audioFileName}</span>
                      </span>
                      {item.audioFileSize && (
                        <span className="bg-ui-bg px-3 py-1 rounded-full">
                          {formatFileSize(item.audioFileSize)}
                        </span>
                      )}
                      {item.processingTime && (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          {item.processingTime.toFixed(1)}s
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-brand-sage">
                        {Math.round((item.results[0]?.confidence || 0) * 100)}%
                      </div>
                      <p className="text-xs text-text-secondary font-medium">Kepercayaan</p>
                    </div>
                    <motion.button
                      onClick={() => removeHistoryItem(item.id)}
                      className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Hapus item riwayat"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>

                {item.results.length > 1 && (
                  <div className="border-t border-ui-border pt-6">
                    <h4 className="text-sm font-semibold text-text-secondary mb-4 flex items-center">
                      <i className="fas fa-list-ul mr-2 text-brand-sage" />
                      Kemungkinan Lain:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.results.slice(1).map((result, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between items-center p-3 bg-ui-bg rounded-xl hover:bg-brand-sage/5 transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div>
                            <span className="text-sm text-text-primary font-medium">
                              {result.birdName}
                            </span>
                            {result.scientificName && (
                              <p className="text-xs text-text-secondary italic">
                                {result.scientificName}
                              </p>
                            )}
                          </div>
                          <span className="text-sm text-brand-sage font-semibold">
                            {Math.round((result.confidence || 0) * 100)}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;