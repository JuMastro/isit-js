'use strict'

const IzitJS = require('../../IzitJS.js')

/**
 * Class IzitObject.
 * @extends IzitJS
 */
module.exports = class IzitObject extends IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor(test) {
    super(test)
    this.object()
  }

  /**
   * Check if tested value is object.
   */
  object () {
    if (typeof this.test !== 'object' || Array.isArray(this.test)) {
      this._error(120, `It should be an object!`)
    }
    return this
  }

  /**
   * Check if tested object has property.
   * @param {string} key - The property need to check.
   */
  has (key) {
    if (!this.test.hasOwnProperty(key)) {
      this._error(140, `The object need to contain ${key} property!`)
    }
    return this
  }
}
