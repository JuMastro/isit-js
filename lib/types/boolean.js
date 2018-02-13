'use strict'

const IzitJS = require('../izit')

class IzitBoolean extends IzitJS {
  constructor (test) {
    super(test)
    this.boolean()
  }

  boolean () {
    if (this.test !== true && this.test !== false) {
      this.error(120, `It should be a boolean!`)
    }
    return this
  }

  rtrue () {
    if (this.test !== true) {
      this.error(120, `It should be a real true!`)
    }
    return this
  }

  rfalse () {
    if (this.test !== false) {
      this.error(120, `It should be a real false!`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitBoolean(test) }
