'use strict'

const MapError = require('./errors.js')

/**
 * Class IzitJS.
 */
module.exports = class IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor (test) {
    if (this.constructor === IzitJS) {
      throw new Error('Error detected while app trying to instantiate abstract class: IzitJS.')
    }
    this.test = test
    this.errors = []
  }

  /**
   * Check if current has error.
   * @returns {boolean}
   */
  hasErrors () {
    if (this.errors.length > 0) { return true }
    return false
  }

  /**
   * Get current errors.
   * @returns {Array}
   */
  getErrors () {
    return this.errors
  }

  /**
   * Internal method to push error.
   * @param {number} errorCode - Error code (integer).
   * @param {string} message - Error message.
   */
  _error (errorCode, message) {
    this.errors.push([errorCode, MapError.get(errorCode), message])
  }
}
