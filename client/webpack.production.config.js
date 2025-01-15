const webpack = require('webpack');

const packageInformation = require('./package.json');
const parseChangelogMd = require('./parseChangelogMd');
const defaultConfig = require('./webpack.config.js');

const definePlugin = new webpack.DefinePlugin({
  __POINZ_CONFIG__: JSON.stringify({
    env: 'production',
    version: packageInformation.version,
    buildTime: Date.now(),
    changeLog: parseChangelogMd()
  }),
  UMAMI_URL: JSON.stringify('https://umami.winterrific.net/script.js'),
  UMAMI_ID: JSON.stringify('48fd90bc-bb45-49cf-b40d-2ce65dd0b405')
});

// override our default webpack config
defaultConfig.plugins = [definePlugin];
defaultConfig.devtool = 'eval';
defaultConfig.mode = 'production';

module.exports = defaultConfig;
