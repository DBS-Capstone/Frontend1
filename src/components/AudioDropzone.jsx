import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const AudioDropzone = ({ onFileDrop, className = "" }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg', '.webm', '.m4a']
    },
    onDrop: onFileDrop,
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`w-full p-12 border-2 border-dashed rounded-2xl text-center transition-all duration-300 cursor-pointer ${
        isDragActive
          ? "border-brand-lime-accent bg-brand-lime-accent/10 shadow-glow-lime scale-105"
          : "border-white/30 bg-white/5 hover:border-brand-lime-accent/50 hover:bg-white/10 hover:shadow-xl"
      } ${className}`}
      whileHover={{ scale: isDragActive ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <motion.div
          animate={isDragActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isDragActive ? Infinity : 0 }}
        >
          <i className={`fas fa-cloud-upload-alt text-6xl ${
            isDragActive ? 'text-brand-lime-accent' : 'text-white/60'
          } transition-colors duration-300`} />
        </motion.div>
        
        {isDragActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-brand-lime-accent text-xl font-semibold animate-pulse">
              Drop the audio file here...
            </p>
            <p className="text-white/80 text-sm">
              Release to upload
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <p className="text-white text-lg font-semibold">
              Drag & drop audio here
            </p>
            <p className="text-white/70 text-sm">
              or click to select a file
            </p>
            <p className="text-white/50 text-xs">
              Supports MP3, WAV, OGG, WebM, M4A
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AudioDropzone;