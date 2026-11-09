module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    // npm installs expo-modules-core nested under expo, but jest-expo requires it from the root.
    '^expo-modules-core$': '<rootDir>/node_modules/expo/node_modules/expo-modules-core',
    '^expo-modules-core/(.*)$': '<rootDir>/node_modules/expo/node_modules/expo-modules-core/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
