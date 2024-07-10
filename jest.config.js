module.exports = {
  preset: 'jest-playwright-preset',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 30000,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
};
