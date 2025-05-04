export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  testMatch: ['**/test/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
