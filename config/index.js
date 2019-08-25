'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

function resolve() {
  return path.resolve.apply(path, [__dirname, '..'].concat(...arguments))
}

// `./package.json`
var tmpJson = require(resolve('./package.json'))

// var curReleasesPath = resolve('./releases', tmpJson.name + '-v' + tmpJson.version)
var curReleasesPath = resolve('./releases', tmpJson.version)

module.exports = {
  dev: {
    env: require('./dev.env'),
    upgrade: {
      publicPath: '/releases',
      directory: 'releases'
    },

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env: require('./prod.env'),
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,

    nw: {
      // manifest for nw
      // the fileds will merge with `./package.json` and build to `./dist/package.json` for NW.js
      // Manifest Format: http://docs.nwjs.io/en/latest/References/Manifest%20Format/
      manifest: ['name', 'appName', 'version', 'description', 'author', { main: './index.html' }, 'manifestUrl', 'window', 'nodejs', 'js-flags', 'node-remote'],
      // see document: https://github.com/nwjs/nw-builder
      builder: {
        files: [resolve('./dist/**')],
        // platforms: ['win32', 'win64', 'osx64'],
        platforms: ['win32', 'win64'],
        version: '0.40.1',
        flavor: 'normal',
        cacheDir: resolve('./node_modules/_nw-builder-cache/'),
        buildDir: resolve('./releases'),
        winIco: resolve('./build/setup_resources/logo.ico'),
        macIcns: resolve('./build/setup_resources/logo.icns'),
        buildType: function () {
          return this.appVersion
        }
      },
      setup: {
        issPath: resolve('./config/setup.iss'),
        // only one version path
        files: curReleasesPath,
        resourcesPath: resolve('./build/setup_resources'),
        appPublisher: 'vue-nw-seed, Inc.',
        appURL: 'https://github.com/anchengjian/vue-nw-seed',
        appId: '{{A448363D-3A2F-4800-B62D-8A1C4D8F1115}}',
        // data: { name, version, platform }
        outputFileName: function (data) {
          return data.name + '-' + data.version
        }
      },
      upgrade: {
        outputFile: resolve('./releases/upgrade.json'),
        publicPath: 'http://localhost:8080/releases/',
        files: [curReleasesPath]
      }
    }
  }
}
