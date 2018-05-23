'use strict'

const IzitNumber = require('./abstract/IzitNumber.js')

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
    if (!String(this.test).match(this._getFloatRegex()) && this.test !== 0) {
      this._error(122, `It should be a float number!`)
    }
    return this
  }

  /**
   * Check if tested value has valid number of decimal.
   * @param {number} max - Max of decimals. 
   */
  maxdecimal (max) {
    const count = this._getDecimalCount()
    if (Number.isInteger(count) && count > max) {
      this._error(122, `It should be ${max} decimals max!`)
    }
    return this
  }

  /**
   * Check if tested value has valid number of decimal.
   * @param {number} min - Min of decimals.
   */
  mindecimal (min) {
    const count = this._getDecimalCount()
    if (Number.isInteger(count) && count < min) {
      this._error(122, `It should be ${min} decimals min!`)
    }
    return this
  }

  /**
   * Check if tested value has valid number of decimal.
   * @param {integer} length - Number of decimals.
   */
  decimal (length) {
    const count = this._getDecimalCount()
    if (Number.isInteger(count) && count !== length) {
      this._error(122, `It should be ${length} decimals!`)
    }
    return this
  }

  /**
   * Internal method to get count of decimal of tested value.
   */
  _getDecimalCount () {
    const parsed = String(this.test)
    if (!parsed.match(this._getFloatRegex())) {
      this._error(122, `Can't check decimal on non float type.`)
      return null
    }
    return parsed.split('.')[1].length
  }

  /**
   * Internal method to provide float regex.
   */
  _getFloatRegex () {
    return /^[-+]?[0-9]+\.[0-9]+$/
  }
}
