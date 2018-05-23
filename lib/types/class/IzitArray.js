'use strict'

const IzitJS = require('../../IzitJS.js')

/**
 * Class IzitArray.
 * @extends IzitJS
 */
module.exports = class IzitArray extends IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor(test) {
    super(test)
    this.array()
  }

  /**
   * Check if tested value is array.
   */
  array () {
    if (!Array.isArray(this.test)) {
      this._error(120, `It should be an array!`)
    }
    return this
  }

  /**
   * Check if tested array is longer than length.
   * @param {number} length - Min length (integer).
   */
  min (length) {
    if (this.test.length < length) {
      this._error(121, `It should be longer than ${length}`)
    }
    return this
  }

  /**
   * Check if tested array is shorter than length.
   * @param {number} length - Max length (integer).
   */
  max (length) {
    if (this.test.length > length) {
      this._error(121, `It should be shortest than ${length}`)
    }
    return this
  }

  /**
   * Check if tested array length is equal to length.
   * @param {number} length - Length (integer).
   */
  length (length) {
    if (this.test.length !== length) {
      this._error(121, `It should be equal than ${length}`)
    }
    return this
  }
}
