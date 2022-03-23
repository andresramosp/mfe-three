const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'http://localhost:9997/',
  devServer: { port: 9997 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeThree',
        filename: 'remoteEntry.js',
        remotes: {
          ModuleAuth: 'ModuleAuth@http://localhost:9898/remoteEntry.js',
          MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js',
        },
        exposes: {
          './MfeThree': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          //'./MfeThree': './src/components/MfeThree-MainComponent.vue'
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue
          },
          ...require('./package.json').dependencies
        },
        // shared: require('./package.json').dependencies,
      })
    ]
  }
})