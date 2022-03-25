const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'https://module-federation-mfe-three.herokuapp.com/',
  publicPath: process.env.VUE_APP_REMOTES === 'local' ?
  // DEVELOPMENT
   'http://localhost:9997/' :
   // PRODUCTION
   'https://module-federation-mfe-three.herokuapp.com/',
  devServer: { port: 9997 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeThree',
        filename: 'remoteEntry.js',
        remotes: process.env.VUE_APP_REMOTES === 'local' ?
          // DEVELOPMENT
          {
            ModuleAuth: 'ModuleAuth@http://localhost:9898/remoteEntry.js',
            MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js',
          } :
          // PRODUCTION
          {
            ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js',
            MfeOne: 'MfeOne@https://module-federation-mfe-one.herokuapp.com/remoteEntry.js',
          },
        exposes: {
          './MfeThree': './src/bootstrap.js' 
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: deps.vue
          },
          ...require('./package.json').dependencies
        },
      })
    ]
  }
})