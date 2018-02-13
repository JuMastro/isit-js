'use strict'

const MapError = new Map([
  [120, 'InvalidType'],
  [121, 'InvalidLength'],
  [122, 'InvalidFormat'],
  [123, 'InvalidEquality'],
  [130, 'OutOfRange'],
  [140, 'NotContain']
])

module.exports = MapError
