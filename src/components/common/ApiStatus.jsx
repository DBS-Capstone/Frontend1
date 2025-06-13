import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { FiWifi, FiWifiOff, FiAlertCircle } from 'react-icons/fi';

const ApiStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkApiStatus = async () => {
      if (!isOnline) {
        setApiStatus('offline');
        return;
      }

      try {
        await apiService.healthCheck();
        setApiStatus('online');
      } catch (error) {
        setApiStatus('error');
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  if (apiStatus === 'online') {
    return null; // Don't show anything when everything is working
  }

  const getStatusConfig = () => {
    switch (apiStatus) {
      case 'offline':
        return {
          icon: <FiWifiOff className="w-4 h-4" />,
          text: 'No internet connection',
          bgColor: 'bg-gray-500',
        };
      case 'error':
        return {
          icon: <FiAlertCircle className="w-4 h-4" />,
          text: 'API connection error',
          bgColor: 'bg-red-500',
        };
      default:
        return {
          icon: <FiWifi className="w-4 h-4" />,
          text: 'Checking connection...',
          bgColor: 'bg-yellow-500',
        };
    }
  };

  const { icon, text, bgColor } = getStatusConfig();

  return (
    <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}>
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default ApiStatus;