/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    resolver: {
      nodeModulesPaths: ['./node_modules'], // update to resolver
    },
    watchFolders: ['./node_modules'], // update to resolver
  },
};
