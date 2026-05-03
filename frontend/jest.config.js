/** @type {import('jest').Config} */
const config = {
  // jsdom simulates the browser DOM for React component tests
  testEnvironment: 'jsdom',

  // Transform TS/TSX via ts-jest
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },

  // Resolve these extensions automatically
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Module path aliases / asset stubs
  moduleNameMapper: {
    // Stub out all CSS imports (leaflet.css, globals.css, tailwind, etc.)
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    // Stub out binary assets
    '\\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle path aliases
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Where Jest looks for tests
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx)',
    '**/?(*.)+(spec|test).(ts|tsx)',
  ],

  // Runs @testing-library/jest-dom matchers after the test framework initialises.
  // `setupFilesAfterEnv` is the correct Jest v24+ / v29 key.
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  // ── Coverage ──────────────────────────────────────────────────────────────
  // Coverage is only collected when you pass --coverage; thresholds always apply.
  collectCoverage: false,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
};

module.exports = config;
