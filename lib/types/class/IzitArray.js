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
  constructor (test) {
    super(test)
    this.array()
  }

  /**
   * Check if test is array.
   */
  array () {
    if (!Array.isArray(this.test)) {
      this._error(120, `It should be an array.`)
    }
    return this
  }

  /**
   * Check if test is longer than length.
   * @param {number} length - Min length (integer).
   */
  minlength (length) {
    if (this.test.length < length) {
      this._error(121, `It should be longer or equal than ${length}.`)
    }
    return this
  }

  /**
   * Check if test is shorter than length.
   * @param {number} length - Max length (integer).
   */
  maxlength (length) {
    if (this.test.length > length) {
      this._error(121, `It should be shorter or equal than ${length}.`)
    }
    return this
  }

  /**
   * Check if test length is equal to length.
   * @param {number} length - Length (integer).
   */
  length (length) {
    if (this.test.length !== length) {
      this._error(121, `It should be equal than ${length}.`)
    }
    return this
  }

  /**
   * Check if test include "value".
   * @param {any} value - Needed value.
   */
  hasvalue (value) {
    const formatValue = (val) => {
      return typeof val === 'object' ? JSON.stringify(val) : val
    }
    value = formatValue(value)
    const needed = this.test.filter((cell) => {
      if (formatValue(cell) === value) {
        return cell
      }
    })
    if (needed.length === 0) {
      this._error(140, `It is not valid. It should include something.`)
    }
    return this
  }

  /**
   * Check if test is equal to another.
   * @param {Array} equality - Compared array.
   */
  equal (equality) {
    if (typeof equality !== 'object' || JSON.stringify(this.test) !== JSON.stringify(equality)) {
      this._error(123, `It is not valid equality.`)
    }
    return this
  }
}
