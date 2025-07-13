// Data file for mindset assessment results
// This file contains the raw submission data
// To update: Simply replace the submissions array with new data

const rawData = {
  // Raw submission scores - add new scores here
  submissions: [
    { score: 6 },
    { score: 9 },
    { score: 10 },
    { score: 10 },
    { score: 7 },
    { score: 12 },
    { score: 20 },
    { score: 8 },
    { score: 9 },
    { score: 20 },
  ],

  // Last updated timestamp (optional)
  lastUpdated: '2025-07-13',

  // Total number of questions in the assessment
  maxScore: 20,
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rawData;
}
