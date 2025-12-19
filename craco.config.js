module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Supprimer source-map-loader pour éviter les warnings
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !rule.loader || !rule.loader.includes('source-map-loader')
      );
      return webpackConfig;
    },
  },
};
