module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://10.20.30.113:3333',
          pathRewrite: {'^/api' : ''}
        }
      }
    }
  }