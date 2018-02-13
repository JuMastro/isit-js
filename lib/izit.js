'use strict'

const MapError = require('./errors')
const IzitArray = require('./types/array')

class IzitJS {
  constructor (test) {
    this.test = test
    this.errors = []
  }

  promise () {
    return new Promise( (resolve, reject) => {
      if (this.hasErrors()) {
        reject(this.errors)
        return
      }
      resolve(this.test)
    })
  }

  error (errorCode, message) {
    this.errors.push([errorCode, MapError.get(errorCode), message])
  }

  hasErrors () {
    if (this.errors.length > 0) { return true }
    return false
  }

  getErrors () {
    return this.errors
  }
}

module.exports = IzitJS
