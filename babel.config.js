module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          components: './src/components',
          utils: './src/utils',
          layouts: './src/layouts',
          scenes: './src/scenes',
          assets: './src/assets',
          store: './src/store',
          config: './src/config',
          db: './src/db',
        },
      },
    ],
  ],
};
