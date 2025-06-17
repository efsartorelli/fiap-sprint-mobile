module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@navigation': './src/navigation',
            '@contexts': './src/contexts',
            '@components': './src/components',
            '@screens': './src/screens',
            '@types': './src/types'
          }
        }
      ]
    ]
  };
};
