import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UrlInput = ({ onUrlSubmit, isLoading = false, className = "" }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleSubmit = async () => {
    if (!audioUrl) {
      setUrlError("Please enter a valid audio URL!");
      return;
    }

    const urlPattern = /^(https?:\/\/).*\.(mp3|wav|ogg|webm|m4a)$/i;
    if (!urlPattern.test(audioUrl)) {
      setUrlError("URL must be a valid audio file (mp3, wav, ogg, webm, or m4a)!");
      return;
    }

    try {
      await onUrlSubmit(audioUrl);
      setAudioUrl("");
      setUrlError("");
    } catch (error) {
      setUrlError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setAudioUrl(e.target.value);
    setUrlError("");
  };

  return (
    <motion.div 
      className={`flex flex-col items-center space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-full flex items-center space-x-4">
        <div className="flex-1 relative">
          <i className="fas fa-link absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
          <input
            type="text"
            value={audioUrl}
            onChange={handleInputChange}
            placeholder="Insert audio URL here..."
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-lime-accent focus:border-transparent transition-all duration-300"
          />
        </div>
        <motion.button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-brand-sage/80 hover:bg-brand-sage text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400/50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm border border-brand-sage/30"
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
        >
          <i className="fas fa-download mr-2" />
          Load URL
        </motion.button>
      </div>
      
      {urlError && (
        <motion.p 
          className="text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-red-400/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-exclamation-triangle mr-2" />
          {urlError}
        </motion.p>
      )}
    </motion.div>
  );
};

export default UrlInput;