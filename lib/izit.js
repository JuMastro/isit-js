'use strict'

const MapError = require('./errors')
const IzitArray = require('./types/array')

class IzitJS {
  constructor (test) {
    this.test = test
    this.errors = []
  }

  hasErrors () {
    if (this.errors.length > 0) { return true }
    return false
  }

  getErrors () {
    return this.errors
  }

  addError (errorCode) {
    this.errors.push([errorCode, MapError.get(errorCode)])
  }
}

module.exports = IzitJS
