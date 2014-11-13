module.exports = {
    docs: {
      options: {
        port: 9000,
        base: 'docs',
        keepalive:true,
        open:{
          target: 'http://localhost:9000/backend/_build/html/', // target url to open
          appName: 'Google Chrome', // name of the app that opens, ie: open, start, xdg-open
          callback: function() {} // called when the app has opened
        }
      }
    }
}