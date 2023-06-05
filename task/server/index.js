const LocalWebServer = require('local-web-server')

function start() {
  return LocalWebServer.create({
    port: 9000,
    directory: '../',
  })
}

module.exports = { start }
