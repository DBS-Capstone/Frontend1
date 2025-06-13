import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/Layout/Layout';
import ApiStatus from './components/common/ApiStatus';

// Pages
import HomePage from './pages/HomePage';
import IdentifyPage from './pages/IdentifyPage';
import ResultsPage from './pages/ResultsPage';
import BirdpediaPage from './pages/BirdpediaPage';
import BirdDetailPage from './pages/BirdDetailPage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';

import './index.css';

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ApiStatus />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="identify" element={<IdentifyPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="birdpedia" element={<BirdpediaPage />} />
              <Route path="birdpedia/:birdId" element={<BirdDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;