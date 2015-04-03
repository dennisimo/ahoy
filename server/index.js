var ahoy = require('../lib')
var nodeStatic = require('node-static')
var file = new nodeStatic.Server('.', { headers: {'Access-Control-Allow-Origin': '*'} })

require('fs').readFile('ahoy.json', function (err, data) {
  if (err) {
    console.log('Error: missing ahoy.json')
    return false
  } else {
    require('http').createServer(function (request, response) {
      request.addListener('end', function () {
        file.serve(request, response)
      }).resume()
    }).listen(1941)
    ahoy.broadcast()
  }
})
