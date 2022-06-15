module.exports = {
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['./node_modules/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
};
