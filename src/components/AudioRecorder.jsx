import React, { useEffect, useState, useRef, useCallback } from "react"; // Impor useState dan useRef
import { motion, AnimatePresence } from "framer-motion";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import {
  FaMicrophone,
  FaStop,
  FaTrash,
  FaDownload,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const AudioRecorder = ({ onAudioReady, className = "" }) => {
  const {
    isRecording,
    recordings,
    recordingTime,
    error,
    startRecording,
    stopRecording,
    deleteRecording,
    clearAllRecordings,
    formatTime,
    formatFileSize,
  } = useAudioRecorder();

  // State untuk melacak ID rekaman yang sudah dikirim ke parent
  const [sentRecordingId, setSentRecordingId] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
      clearAllRecordings();
    };
  }, [isRecording, stopRecording, clearAllRecordings]); // isRecording ditambahkan sebagai dependency

  // Notify parent component when a NEW recording is available
  useEffect(() => {
    // Ambil rekaman terbaru
    const latestRecording = recordings.length > 0 ? recordings[0] : null;

    // Cek jika ada rekaman baru DAN rekaman itu belum pernah dikirim
    if (
      latestRecording &&
      latestRecording.id !== sentRecordingId &&
      onAudioReady
    ) {
      onAudioReady(latestRecording); // Kirim ke parent
      setSentRecordingId(latestRecording.id); // Tandai sebagai sudah terkirim
    }

    // Jika tidak ada rekaman sama sekali, reset state 'sentRecordingId'
    if (recordings.length === 0 && sentRecordingId !== null) {
      setSentRecordingId(null);
    }
  }, [recordings, onAudioReady, sentRecordingId]); // sentRecordingId ditambahkan

  const downloadRecording = (recording) => {
    const link = document.createElement("a");
    link.href = recording.url;
    link.download = `${recording.name}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gunakan useCallback untuk delete agar referensinya stabil
  const handleDelete = useCallback(
    (id) => {
      deleteRecording(id);
    },
    [deleteRecording]
  );

  return (
    // ... sisa JSX tidak perlu diubah, tapi gunakan handleDelete yang baru ...
    <div className={`audio-recorder-container ${className}`}>
      {/* ... bagian controls ... */}
      <div className="recording-controls text-center mb-8">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="flex items-center justify-center space-x-4 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2 text-brand-lime-accent">
                <div className="w-3 h-3 bg-brand-lime-accent rounded-full animate-pulse shadow-glow-lime" />
                <span className="font-semibold text-white">
                  Recording: {formatTime(recordingTime)}
                </span>
              </div>

              <div className="audio-wave">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="audio-wave-bar" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center space-x-6">
          <motion.button
            onClick={startRecording}
            disabled={isRecording}
            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
              isRecording
                ? "bg-gray-400/50 cursor-not-allowed text-gray-300"
                : "bg-red-500/80 hover:bg-red-500 hover:shadow-xl hover:scale-105 text-white backdrop-blur-sm border border-red-400/30"
            }`}
            whileHover={!isRecording ? { scale: 1.05 } : {}}
            whileTap={!isRecording ? { scale: 0.95 } : {}}
            aria-label="Start recording"
          >
            <FaMicrophone className="text-lg" />
            <span>Start Recording</span>
          </motion.button>

          <motion.button
            onClick={stopRecording}
            disabled={!isRecording}
            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
              !isRecording
                ? "bg-gray-400/50 cursor-not-allowed text-gray-300"
                : "bg-gray-600/80 hover:bg-gray-600 hover:shadow-xl hover:scale-105 text-white backdrop-blur-sm border border-gray-500/30"
            }`}
            whileHover={isRecording ? { scale: 1.05 } : {}}
            whileTap={isRecording ? { scale: 0.95 } : {}}
            aria-label="Stop recording"
          >
            <FaStop className="text-lg" />
            <span>Stop Recording</span>
          </motion.button>
        </div>

        {error && (
          <motion.div
            className="mt-6 p-4 bg-red-500/20 border border-red-400/30 text-red-200 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {recordings.length > 0 && (
          <motion.div
            className="recordings-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Your Audio Recordings
              </h3>
              <motion.button
                onClick={clearAllRecordings}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Clear all recordings"
              >
                Clear All
              </motion.button>
            </div>

            <div className="space-y-4">
              {recordings.map((recording, index) => (
                <motion.div
                  key={recording.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RecordingItem
                    recording={recording}
                    onDelete={handleDelete} // Gunakan fungsi yang sudah di-memoize
                    onDownload={downloadRecording}
                    formatTime={formatTime}
                    formatFileSize={formatFileSize}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ... komponen RecordingItem tidak perlu diubah ...
const RecordingItem = ({
  recording,
  onDelete,
  onDownload,
  formatTime,
  formatFileSize,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Update state ketika audio selesai, atau di-pause/play dari kontrol bawaan
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <motion.div
      className="recording-item glass-panel p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="recording-info">
          <h4 className="font-semibold text-white text-lg">{recording.name}</h4>
          <div className="text-sm text-white/70 space-x-4 mt-1">
            <span>Duration: {formatTime(recording.duration)}</span>
            <span>Size: {formatFileSize(recording.size)}</span>
            <span>
              Created: {new Date(recording.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="recording-actions flex items-center space-x-3">
          <motion.button
            onClick={togglePlayback}
            className="p-3 text-brand-lime-accent hover:text-white hover:bg-brand-lime-accent/20 rounded-full transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>

          <motion.button
            onClick={() => onDownload(recording)}
            className="p-3 text-blue-400 hover:text-white hover:bg-blue-400/20 rounded-full transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Download recording"
          >
            <FaDownload />
          </motion.button>

          <motion.button
            onClick={() => onDelete(recording.id)}
            className="p-3 text-red-400 hover:text-white hover:bg-red-400/20 rounded-full transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Delete recording"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>

      <div className="audio-player">
        <audio
          ref={audioRef}
          src={recording.url}
          controls
          className="w-full rounded-lg"
          preload="metadata"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </motion.div>
  );
};

export default AudioRecorder;
