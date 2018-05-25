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
  constructor (test) {
    super(test)
    this.integer()
  }

  /**
   * Check if test is integer.
   */
  integer () {
    if (!Number.isInteger(this.test)) {
      this._error(120, `It should be an integer number.`)
    }
    return this
  }

  /**
   * Check if test is greater than "value".
   * @param {number} value - Min value (integer).
   */
  min (value) {
    if (this.test < value) {
      this._error(130, `It should be greater than ${value}.`)
    }
    return this
  }

  /**
   * Check if test is lower than "value".
   * @param {number} value - Max value (integer).
   */
  max (value) {
    if (this.test > value) {
      this._error(130, `It should be lesser than ${value}.`)
    }
    return this
  }

  /**
   * Check if test exist from a range.
   * @param {number} limit - Middle value.
   * @param {number} precision - Range value.
   */
  precision (limit, precision) {
    const max = this.test + precision
    const min = this.test - precision
    if (max < limit || min > limit) {
      this._error(130, `It should be lesser than ${max} and greater than ${min}.`)
    }
    return this
  }

  /**
   * Check if test is equal to "equality".
   * @param {number} equality - Needed value (integer).
   */
  equal (equality) {
    if (typeof equality !== 'number' || this.test !== equality) {
      this._error(123, `It should be equal to "${equality}".`)
    }
    return this
  }
}
