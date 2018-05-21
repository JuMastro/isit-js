'use strict'

const IzitNumber = require('./class/IzitNumber.js')

class IzitFloat extends IzitNumber {
  constructor(test) {
    super(test)
    this.float()
  }

  float () {
    if (!String(this.test).match(/^[-+]?[0-9]+\.[0-9]+$/) && !this.zero()) {
      this._error(122, `It should be a float number!`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitFloat(test) }
