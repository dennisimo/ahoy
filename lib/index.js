'use strict'

var os = require('os')
var interfaces = os.networkInterfaces()

module.exports = (function () {
  return {
    broadcast: broadcast,
    encode: encode
  }

  function broadcast () {
    var passcode = 'Passcode = ' + encode(findAddress())
    var url = '     URL = http://' + findAddress() + ':1941/'
    var message = passcode + '\n' + url
    console.log(message)
  }

  function encode (address) {
    var encoder = ['E', 'R', 'T', 'Y', 'U', 'I', 'D', 'F', 'G', 'H', 'J', 'X', 'C', 'V', 'B', 'N']
    var passcode = ''
    var blocks = address.split('.')
    var firstBlock = blocks[0]
    var characters = []
    if (firstBlock === '10') {
      blocks = blocks.slice(1)
    } else if (firstBlock === '172') {
      characters.push(encoder[blocks[1] - 16])
      blocks = blocks.slice(2)
    } else if (firstBlock === '192') {
      blocks = blocks.slice(2)
    }
    blocks.forEach(function (block) {
      block = parseInt(block, 10).toString(16)
      if (block.length < 2) {
        block = '0' + block
      }
      characters.push(block.charAt(0))
      characters.push(block.charAt(1))
    })
    characters.forEach(function (character) {
      passcode += encoder[parseInt(character, 16)]
    })
    return passcode
  }

  function findAddress () {
    var address
    for (var i in interfaces) {
      interfaces[i].forEach(function (details) {
        if (details.family === 'IPv4' && details.internal === false) {
          address = details.address
        }
      })
    }
    return address
  }
}())
