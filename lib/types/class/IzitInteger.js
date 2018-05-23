'use strict'

const IzitNumber = require('./abstract/IzitNumber.js')

/**
 * Class IzitInteger.
 * @extends IzitNumber
 */
module.exports = class IzitInteger extends IzitNumber {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor(test) {
    super(test)
    this.integer()
  }

  /**
   * Check if tested value is integer.
   */
  integer () {
    if (!Number.isInteger(this.test)) {
      this._error(122, `It should be an integer number!`)
    }
    return this
  }

  /**
   * Check if tested value is greater than "value".
   * @param {number} value - Min value.
   */
  min (value) {
    if (this.test < value) {
      this._error(121, `It should be greater than ${value}`)
    }
    return this
  }

  /**
   * Check if tested value is lower than "value".
   * @param {number} value - Max value.
   */
  max (value) {
    if (this.test > value) {
      this._error(121, `It should be lesser than ${value}`)
    }
    return this
  }

}
