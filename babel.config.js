module.exports = function(api) {
  api.cache(true);
  const presets = [
    ['@babel/env', {
      modules: false
    }], '@babel/react'
  ];
  const plugins = ["transform-es2015-modules-commonjs"];
  return {
    presets, plugins
  };
}
