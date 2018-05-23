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
}
