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
    if (!String(this.test).match(this._getFloatRegex()) && !this.zero()) {
      this._error(122, `It should be a float number!`)
    }
    return this
  }

  /**
   * Check if tested value has valid number of decimal.
   * @param {number} max - Max of decimals. 
   */
  maxdecimal (max) {
    const parsed = String(this.test)
    if (parsed.match(this._getFloatRegex())) {
      if (parsed.split('.')[1].length > max) {
        this._error(122, `It should be have ${max} decimals max!`)
      }
    } else {
      this._error(122, `Can't check max decimals on non float number.`)
    }
    return this
  }

  /**
   * Check if tested value has valid number of decimal.
   * @param {number} min - Min of decimals.
   */
  mindecimal (min) {
    const parsed = String(this.test)
    if (parsed.match(this._getFloatRegex())) {
      if (parsed.split('.')[1].length < min) {
        this._error(122, `It should be have ${min} decimals min!`)
      }
    } else {
      this._error(122, `Can't check min decimals on non float number.`)
    }
    return this
  }

  /**
   * Internal method to provide float regex.
   */
  _getFloatRegex () {
    return /^[-+]?[0-9]+\.[0-9]+$/
  }
}
