const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'https://module-federation-mfe-three.herokuapp.com/',
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
          ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js',
          // MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js',
          MfeOne: 'MfeOne@https://module-federation-mfe-one.herokuapp.com/remoteEntry.js',
        },
        exposes: {
          './MfeThree': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          //'./MfeThree': './src/components/MfeThree-MainComponent.vue'
        },
        shared: {
          vue: {
            // eager: true,
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