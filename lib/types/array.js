'use strict'

const IzitJS = require('../izit')

class IzitArray extends IzitJS {
  constructor (test) {
    super(test)
    this.array()
  }

  array () {
    if (!Array.isArray(this.test)) {
      this.addError(120)
    }
    return this
  }
}

module.exports = (test) => { return new IzitArray(test) }
