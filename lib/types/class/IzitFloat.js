'use strict'

const IzitNumber = require('./IzitNumber.js')

/**
 * Class IzitFloat.
 * @extends IzitNumber
 */
module.exports = class IzitFloat extends IzitNumber {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor(test) {
    super(test)
    this.float()
  }

  /**
   * Check if tested value is float.
   */
  float () {
    if (!String(this.test).match(/^[-+]?[0-9]+\.[0-9]+$/) && !this.zero()) {
      this._error(122, `It should be a float number!`)
    }
    return this
  }
}
