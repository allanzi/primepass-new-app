/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      resolveRequest: (context, moduleName, platform) => {
        if (moduleName.startsWith('graphql-request')) {
          return {
            filePath: `${__dirname}/node_modules/graphql-request/build/esm/index.js`,
            type: 'sourceFile',
          };
        }

        return context.resolveRequest(context, moduleName, platform);
      },
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
};
