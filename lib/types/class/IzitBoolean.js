'use strict'

const IzitJS = require('./IzitJS.js')

/**
 * Class IzitBoolean.
 * @extends IzitJS
 */
module.exports = class IzitBoolean extends IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor(test) {
    super(test)
    this.boolean()
  }

  /**
   * Check if tested value is boolean.
   */
  boolean () {
    if (this.test !== true && this.test !== false) {
      this._error(120, `It should be a boolean!`)
    }
    return this
  }

  /**
   * Check if tested value is strict true.
   */
  rtrue () {
    if (this.test !== true) {
      this._error(120, `It should be a real true!`)
    }
    return this
  }

  /**
   * Check if tested value is strict false.
   */
  rfalse () {
    if (this.test !== false) {
      this._error(120, `It should be a real false!`)
    }
    return this
  }
}
