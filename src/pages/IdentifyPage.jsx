import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useDropzone } from 'react-dropzone';
import { FiMic, FiMicOff, FiUpload, FiPlay, FiTrash2 } from 'react-icons/fi';
import { useBirdIdentification } from '../hooks/useBirdIdentification';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

const IdentifyPage = () => {
  const navigate = useNavigate();
  const [audioUrl, setAudioUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  
  const {
    audioFile,
    isIdentifying,
    identifyBird,
    handleFileUpload,
    clearAudio,
  } = useBirdIdentification();

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  React.useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "recorded-audio.wav", { type: "audio/wav" });
          handleFileUpload(file);
        });
    }
  }, [mediaBlobUrl, handleFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
        setUrlError('');
      }
    },
  });

  const handleUrlSubmit = async () => {
    if (!audioUrl.trim()) {
      setUrlError('Please enter a valid audio URL');
      return;
    }

    const urlPattern = /^https?:\/\/.+\.(mp3|wav|ogg|m4a)(\?.*)?$/i;
    if (!urlPattern.test(audioUrl)) {
      setUrlError('URL must point to a valid audio file (mp3, wav, ogg, m4a)');
      return;
    }

    try {
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch audio file');
      }
      
      const blob = await response.blob();
      const file = new File([blob], 'audio-from-url.mp3', { type: blob.type });
      handleFileUpload(file);
      setUrlError('');
      setAudioUrl('');
    } catch (error) {
      setUrlError('Failed to load audio from URL. Please check the URL and try again.');
    }
  };

  const handleIdentify = async () => {
    if (!audioFile) {
      toast.error('Silakan pilih file audio terlebih dahulu');
      return;
    }

    try {
      const result = await identifyBird(audioFile);
      navigate('/results', { state: { results: result.predictions, audioFile } });
    } catch (error) {
      console.error('Identification failed:', error);
    }
  };

  const playAudio = () => {
    if (audioFile) {
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
    }
  };

  const handleClearAudio = () => {
    clearAudio();
    clearBlobUrl();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Identify Bird Calls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Record a bird sound, upload an audio file, or provide a URL to identify the bird species using our AI technology.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Recording Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Record Bird Sound
            </h2>
            
            <div className="mb-6">
              <div className="w-full max-w-md mx-auto h-20 rounded-lg shadow-lg bg-green-50 flex items-center justify-center border-2 border-green-200">
                {status === "recording" ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">Recording...</span>
                  </div>
                ) : mediaBlobUrl ? (
                  <audio src={mediaBlobUrl} controls className="w-full max-w-xs" />
                ) : (
                  <span className="text-green-600">Ready to record</span>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={startRecording}
                disabled={status === "recording" || isIdentifying}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  status === "recording" || isIdentifying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-105 shadow-lg'
                }`}
              >
                <FiMic className="w-5 h-5" />
                <span>Start Recording</span>
              </button>
              
              <button
                onClick={stopRecording}
                disabled={status !== "recording"}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  status !== "recording"
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600 transform hover:scale-105 shadow-lg'
                }`}
              >
                <FiMicOff className="w-5 h-5" />
                <span>Stop Recording</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* File Upload Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Upload Audio File
            </h2>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-green-500 bg-green-50 scale-105'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <input {...getInputProps()} />
              <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-green-600 text-lg font-medium">
                  Drop the audio file here...
                </p>
              ) : (
                <div>
                  <p className="text-gray-600 text-lg font-medium mb-2">
                    Drag & drop an audio file here, or click to select
                  </p>
                  <p className="text-gray-400 text-sm">
                    Supports MP3, WAV, OGG, M4A files
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* URL Input Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Load from URL
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={audioUrl}
                onChange={(e) => {
                  setAudioUrl(e.target.value);
                  setUrlError('');
                }}
                placeholder="https://example.com/bird-sound.mp3"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleUrlSubmit}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Load URL
              </button>
            </div>
            
            {urlError && (
              <p className="text-red-500 text-sm mt-2">{urlError}</p>
            )}
          </div>

          {/* Audio File Info */}
          {audioFile && (
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FiMic className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {audioFile.name || 'Recorded Audio'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={playAudio}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                  >
                    <FiPlay className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClearAudio}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Identify Button */}
          <div className="text-center">
            <button
              onClick={handleIdentify}
              disabled={!audioFile || isIdentifying}
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                !audioFile || isIdentifying
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isIdentifying ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Identifying...</span>
                </>
              ) : (
                <>
                  <FiMic className="w-5 h-5" />
                  <span>Identify Bird</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentifyPage;