'use strict'

const IzitNumber = require('./class/IzitNumber.js')

class IzitInteger extends IzitNumber {
  constructor(test) {
    super(test)
    this.integer()
  }

  integer () {
    if (!Number.isInteger(this.test)) {
      this._error(122, `It should be an integer number!`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitInteger(test) }
