const path = require('path');
module.exports = {
  //outputDir:path.resolve(__dirname,'../vue_public'),
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        }
      }
    }
  }