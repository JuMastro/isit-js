'use strict'

const IzitJS = require('../../../IzitJS.js')

/**
 * Class IzitNumber.
 * @extends IzitJS
 */
module.exports = class IzitNumber extends IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor (test) {
    super(test)
    if (this.constructor === IzitNumber) {
      throw new Error('Error detected while app trying to instantiate abstract class: IzitNumber.')
    }
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

  /**
   * Check if tested value exist from a range.
   * @param {number} limit - The middle value.
   * @param {number} precision - The range value.
   */
  precision (limit, precision) {
    const max = this.test + precision
    const min = this.test - precision
    if (max < limit || min > limit) {
      this._error(130, `It should be lesser than ${max} and greater than ${min}!`)
    }
    return this
  }

  /**
   * Check if tested value is positive.
   */
  positive () {
    if (this.test <= 0) {
      this._error(130, `It should be a positive number!`)
    }
    return this
  }

  /**
   * Check if tested value is negative.
   */
  negative () {
    if (this.test >= 0) {
      this._error(130, `It should be a negative number!`)
    }
    return this
  }

  /**
   * Check if tested value is zero.
   */
  zero () {
    if (this.test !== 0) {
      this._error(123, `It should be equal to zero!`)
    }
    return this
  }
}
