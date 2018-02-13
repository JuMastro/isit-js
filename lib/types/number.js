'use strict'

const IzitJS = require('../izit')

class IzitNumber extends IzitJS {
  constructor (test) {
    super(test)
    this.number()
  }

  number () {
    if (typeof this.test !== 'number') {
      this._error(120, `It should be a number!`)
    }
    return this
  }

  integer () {
    if (!Number.isInteger(this.test)) {
      this._error(122, `It should be an integer number!`)
    }
    return this
  }

  float () {
    if (!this.test.match(/^[-+]?[0-9]+\.[0-9]+$/)) {
      this._error(122, `It should be a float number!`)
    }
  }

  precision (limit, precision) {
    const max = this.test + precision
    const min = this.test - precision
    if (max > limit || min < limit) {
      this._error(130, `It should be lesser than ${max} and greater than ${min}!`)
    }
    return this
  }

  positive () {
    if (this.test <= 0) {
      this._error(130, `It should be a positive number!`)
    }
  }

  negative () {
    if (this.test >= 0) {
      this._error(130, `It should be a negative number!`)
    }
  }

  zero () {
    if (this.test !== 0) {
      this_error(123, `It should be equal to zero!`)
    }
  }
}

module.exports = (test) => { return new IzitNumber(test) }
