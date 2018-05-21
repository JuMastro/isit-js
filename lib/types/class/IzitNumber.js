'use strict'

const IzitJS = require('./IzitJS.js')

module.exports = class IzitNumber extends IzitJS {
  constructor (test) {
    super(test)
  }

  min (value) {
    if (this.test < value) {
      this._error(121, `It should be greater than ${value}`)
    }
    return this
  }

  max (value) {
    if (this.test > value) {
      this._error(121, `It should be lesser than ${value}`)
    }
    return this
  }

  precision (limit, precision) {
    const max = this.test + precision
    const min = this.test - precision
    if (max < limit || min > limit) {
      this._error(130, `It should be lesser than ${max} and greater than ${min}!`)
    }
    return this
  }

  positive () {
    if (this.test <= 0) {
      this._error(130, `It should be a positive number!`)
    }
    return this
  }

  negative () {
    if (this.test >= 0) {
      this._error(130, `It should be a negative number!`)
    }
    return this
  }

  zero () {
    if (this.test !== 0) {
      this._error(123, `It should be equal to zero!`)
    }
    return this
  }
}
