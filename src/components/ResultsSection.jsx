import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiArrowLeft, FiShare2, FiMic, FiInfo, FiMapPin, FiVolumeX } from "react-icons/fi";
import { useBirdStore } from "../store/birdStore";
import { getConservationStatusColor, formatSize } from "../data/realBirdData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultsSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetState } = useBirdStore();

  // Get results from navigation state or store
  const identificationResult = location.state?.identificationResult;
  const audioFile = location.state?.audioFile;

  // If no results, redirect to identify page
  React.useEffect(() => {
    if (!identificationResult) {
      navigate('/');
    }
  }, [identificationResult, navigate]);

  if (!identificationResult) {
    return null;
  }

  const { primary, alternatives, processingTime } = identificationResult;
  const allResults = [primary, ...alternatives];

  // Prepare chart data
  const chartData = {
    labels: allResults.map((bird) => bird.common_name || 'Unknown'),
    datasets: [
      {
        label: 'Tingkat Kepercayaan (%)',
        data: allResults.map((bird) => Math.round((bird.confidence || 0) * 100)),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // green-500 for primary
          'rgba(59, 130, 246, 0.8)',  // blue-500 for second
          'rgba(168, 85, 247, 0.8)',  // purple-500 for third
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tingkat Kepercayaan Identifikasi',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Kepercayaan: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Kepercayaan (%)',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Spesies Burung',
          font: {
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleShare = async () => {
    const shareText = allResults
      .map((bird, index) =>
        `${index + 1}. ${bird.common_name || 'Unknown'} (${Math.round((bird.confidence || 0) * 100)}%)`
      )
      .join('\n');

    const fullText = `🐦 Hasil Identifikasi Burung dari Kicau Finder:\n\n${shareText}\n\nCoba sendiri di Kicau Finder!`;

    // Try to use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hasil Identifikasi Burung',
          text: fullText,
        });
        return;
      } catch (error) {
        console.log('Web Share API failed, falling back to clipboard');
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(fullText);
      alert('Hasil berhasil disalin ke clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Gagal menyalin hasil. Silakan coba lagi.');
    }
  };

  const handleBackToRecorder = () => {
    resetState();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ui-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-sage to-brand-forest text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToRecorder}
              className="inline-flex items-center text-green-100 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Identifikasi Lagi
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <FiShare2 className="w-4 h-4 mr-2" />
              Bagikan
            </button>
          </div>

          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hasil Identifikasi
            </motion.h1>
            <p className="text-xl text-green-100">
              Berikut adalah {allResults.length} prediksi teratas untuk suara burung Anda
            </p>
            <p className="text-green-200 mt-2">
              Diproses dalam {processingTime?.toFixed(1)} detik
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Audio File Info */}
        {audioFile && (
          <motion.div
            className="bg-ui-surface rounded-xl shadow-lg p-6 mb-8 border border-ui-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-sage rounded-full flex items-center justify-center">
                <FiMic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  File Audio yang Dianalisis
                </h3>
                <p className="text-text-secondary">
                  {audioFile.name} • {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results Cards */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Prediksi Burung
              </h2>

              <div className="space-y-6">
                {allResults.map((bird, index) => (
                  <motion.div
                    key={bird.id || index}
                    className="bg-ui-surface rounded-xl shadow-lg overflow-hidden border border-ui-border hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative md:w-48 h-48 flex-shrink-0">
                        <img
                          src={bird.image_url}
                          alt={bird.common_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400';
                          }}
                        />

                        {/* Ranking Badge */}
                        <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>

                        {/* Confidence Badge */}
                        <div className="absolute top-3 right-3 bg-brand-sage text-white px-2 py-1 rounded-full text-sm font-semibold">
                          {Math.round((bird.confidence || 0) * 100)}%
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-text-primary mb-1">
                              {bird.common_name || 'Burung Tidak Dikenal'}
                            </h3>
                            <p className="text-text-secondary italic">
                              {bird.scientific_name || 'Nama ilmiah tidak tersedia'}
                            </p>
                            <div className="mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConservationStatusColor(bird.conservation_status)}`}>
                                {bird.conservation_status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-text-secondary">
                            <FiMapPin className="w-4 h-4 mr-2 text-brand-sage" />
                            <span className="truncate">{bird.habitat?.split(',')[0].trim()}</span>
                          </div>
                          <div className="flex items-center text-sm text-text-secondary">
                            <FiVolumeX className="w-4 h-4 mr-2 text-brand-sage" />
                            <span className="truncate">
                              {bird.vocalization ? bird.vocalization.substring(0, 30) + '...' : 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center bg-ui-bg rounded-lg p-2">
                            <p className="text-xs text-text-secondary">Panjang</p>
                            <p className="font-semibold text-text-primary">{formatSize(bird.size_length_cm, 'cm')}</p>
                          </div>
                          <div className="text-center bg-ui-bg rounded-lg p-2">
                            <p className="text-xs text-text-secondary">Berat</p>
                            <p className="font-semibold text-text-primary">{formatSize(bird.size_weight_g, 'g')}</p>
                          </div>
                          <div className="text-center bg-ui-bg rounded-lg p-2">
                            <p className="text-xs text-text-secondary">Famili</p>
                            <p className="font-semibold text-text-primary text-xs">{bird.family}</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link
                          to={`/birdpedia/${bird.id}`}
                          className="inline-flex items-center px-4 py-2 bg-brand-sage text-white rounded-lg hover:bg-brand-forest transition-colors"
                        >
                          <FiInfo className="w-4 h-4 mr-2" />
                          Lihat Detail Lengkap
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-ui-surface rounded-xl shadow-lg p-6 sticky top-8 border border-ui-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Grafik Kepercayaan
              </h3>

              <div className="h-80 mb-6">
                <Bar data={chartData} options={chartOptions} />
              </div>

              {/* Summary Stats */}
              <div className="pt-6 border-t border-ui-border">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Prediksi Terbaik:</span>
                    <span className="font-semibold text-brand-sage">
                      {Math.round((primary?.confidence || 0) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Rata-rata Kepercayaan:</span>
                    <span className="font-semibold text-text-primary">
                      {Math.round(
                        allResults.reduce((acc, bird) => acc + (bird.confidence || 0), 0) / allResults.length * 100
                      )}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Total Prediksi:</span>
                    <span className="font-semibold text-text-primary">
                      {allResults.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Waktu Proses:</span>
                    <span className="font-semibold text-text-primary">
                      {processingTime?.toFixed(1)}s
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="mt-12 text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={handleBackToRecorder}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-brand-sage to-brand-forest text-white font-semibold rounded-lg hover:from-brand-forest hover:to-brand-sage transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FiMic className="w-5 h-5 mr-2" />
            Identifikasi Lagi
          </button>

          <Link
            to="/birdpedia"
            className="inline-flex items-center px-8 py-3 bg-ui-surface text-brand-sage font-semibold rounded-lg border-2 border-brand-sage hover:bg-brand-sage hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            Jelajahi Birdpedia
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsSection;
