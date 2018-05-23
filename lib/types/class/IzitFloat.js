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

  min (value) {
    const adjusted = this._adjustFloats(this.test, value)
    if (adjusted) {
      const decA = adjusted.a.dec * adjusted.a.type
      const decB = adjusted.b.dec * adjusted.b.type
      if (adjusted.b.int > adjusted.a.int || (adjusted.a.int === adjusted.b.int && decB > decA)) {
        this._error(122, `It should be greater than ${value}!`)
      }
    }
    return this
  }

  max (value) {
    const adjusted = this._adjustFloats(this.test, value)
    if (adjusted) {
      const decA = adjusted.a.dec * adjusted.a.type
      const decB = adjusted.b.dec * adjusted.b.type
      if (adjusted.b.int < adjusted.a.int || (adjusted.a.int === adjusted.b.int && decB < decA)) {
        this._error(122, `It should be greater than ${value}!`)
      }
    }
    return this
  }

  /**
   * Ajust two float to compare friendly.
   * @param {number} floatA - Float value. 
   * @param {number} floatB - Float value.
   * @returns {object}
   */
  _adjustFloats (floatA, floatB) {
    if (typeof floatA !== 'number' || typeof floatB !== 'number') {
      return
    }

    const splittedFloatA = this._getSplittedFloat(String(floatA).match(this._getFloatRegex()) ? floatA : floatA.toFixed(2))
    const splittedFloatB = this._getSplittedFloat(String(floatB).match(this._getFloatRegex()) ? floatB : floatB.toFixed(2))

    if (!splittedFloatA || !splittedFloatB) {
      return null
    }

    const [integerA, decimalA] = splittedFloatA
    const [integerB, decimalB] = splittedFloatB
    const decimals = [decimalA, decimalB]
    const longest = decimalA.length > decimalB.length ? decimalA.length : decimalB.length

    for (let i = 0; i < decimals.length; ++i) {
      while (decimals[i].length < longest) {
        decimals[i] += '0'
      }
    }

    return {
      a: { int: parseInt(integerA), dec: parseInt(decimals[0]), type: Math.sign(floatA) },
      b: { int: parseInt(integerB), dec: parseInt(decimals[1]), type: Math.sign(floatB) }
    }
  }

  /**
   * Internal method to get count of decimal of tested value.
   * @returns {null|number}
   */
  _getDecimalCount () {
    const test = this._getSplittedFloat(this.test)
    return test ? test[1].length : null
  }

  /**
   * Internal method to get splitted float.
   * @param {number} value - Float number.
   * @returns {null|Array}
   */
  _getSplittedFloat (value) {
    const parsed = String(value)
    if (!parsed.match(this._getFloatRegex())) {
      this._error(122, `Can't work with decimal on non float type.`)
      return null
    }
    return parsed.split('.')
  }

  /**
   * Internal method to provide float regex.
   */
  _getFloatRegex () {
    return /^[-+]?[0-9]+\.[0-9]+$/
  }
}
