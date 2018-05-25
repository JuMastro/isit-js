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
   * Check if test is positive.
   */
  positive () {
    if (Math.sign(this.test) <= 0) {
      this._error(130, `It should be a positive number.`)
    }
    return this
  }

  /**
   * Check if test is negative.
   */
  negative () {
    if (Math.sign(this.test) >= 0) {
      this._error(130, `It should be a negative number.`)
    }
    return this
  }

  /**
   * Check if test is zero.
   */
  zero () {
    if (Math.sign(this.test) !== 0) {
      this._error(123, `It should be zero.`)
    }
    return this
  }
}
