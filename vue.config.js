module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:57258',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
}