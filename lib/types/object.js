'use strict'

const IzitJS = require('../izit')

class IzitObject extends IzitJS {
  constructor (test) {
    super(test)
    this.object()
  }

  object () {
    if (typeof this.test !== 'object') {
      this._error(120, `It should be an object!`)
    }
    return this
  }

  has (key) {
    if (!this.test.hasOwnProperty(key)) {
      this._error(140, `The object need to contain ${key} property!`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitObject(test) }
