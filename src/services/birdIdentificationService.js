import { realBirdData } from '../data/realBirdData';

// Simulate realistic bird identification with proper confidence scores
export const simulateIdentification = (audioFile) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Randomly select a primary bird
      const randomIndex = Math.floor(Math.random() * realBirdData.length);
      const primaryBird = realBirdData[randomIndex];
      
      // Generate realistic confidence score (85-95% for primary)
      const primaryConfidence = 0.85 + Math.random() * 0.1;
      
      // Generate 2 alternative matches with lower confidence
      const alternatives = realBirdData
        .filter(bird => bird.id !== primaryBird.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map((bird, index) => ({
          ...bird,
          confidence: primaryConfidence - 0.15 - (index * 0.08) // Decreasing confidence
        }));

      const result = {
        primary: { ...primaryBird, confidence: primaryConfidence },
        alternatives,
        processingTime: 2.3 + Math.random() * 1.2, // 2.3-3.5 seconds
        audioFileName: audioFile.name || 'Recorded Audio',
        audioFileSize: audioFile.size,
        timestamp: new Date().toISOString()
      };

      resolve(result);
    }, 2000 + Math.random() * 1500); // 2-3.5 seconds processing time
  });
};

// Format identification results for display
export const formatIdentificationResults = (identificationResult) => {
  const { primary, alternatives } = identificationResult;
  
  return [
    primary,
    ...alternatives
  ].map((bird, index) => ({
    ...bird,
    rank: index + 1,
    confidencePercentage: Math.round(bird.confidence * 100)
  }));
};

// Get bird by species code (for backend compatibility)
export const getBirdBySpeciesCode = (speciesCode) => {
  return realBirdData.find(bird => bird.species_code === speciesCode);
};

// Get bird by ID
export const getBirdById = (id) => {
  return realBirdData.find(bird => bird.id === parseInt(id));
};

// Search birds by query
export const searchBirds = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return realBirdData.filter(bird => 
    bird.common_name?.toLowerCase().includes(lowercaseQuery) ||
    bird.scientific_name?.toLowerCase().includes(lowercaseQuery) ||
    bird.family?.toLowerCase().includes(lowercaseQuery) ||
    bird.habitat?.toLowerCase().includes(lowercaseQuery)
  );
};

// Get birds by habitat
export const getBirdsByHabitat = (habitat) => {
  return realBirdData.filter(bird => 
    bird.habitat?.toLowerCase().includes(habitat.toLowerCase())
  );
};

// Get random birds for recommendations
export const getRandomBirds = (count = 4, excludeId = null) => {
  const availableBirds = excludeId 
    ? realBirdData.filter(bird => bird.id !== excludeId)
    : realBirdData;
    
  return availableBirds
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};