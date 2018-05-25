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
  constructor (test) {
    super(test)
    this.float()
  }

  /**
   * Check if test is float.
   */
  float () {
    if (!String(this.test).match(this.constructor.getFloatRegex()) && this.test !== 0) {
      this._error(120, `It should be a float number.`)
    }
    return this
  }

  /**
   * Check if test is greater than "value".
   * @param {number} value - Min value (float).
   */
  min (value) {
    if (!this._testAsFloat(value)) {
      return this
    }
    const [test, val] = this._ajustFloats(this.test, value)
    if (this._compareFloats(test, val) === false) {
      this._error(130, `It should be greater than ${value}.`)
    }
    return this
  }

  /**
   * Check if test is lower than "value".
   * @param {number} value - Max value (float).
   */
  max (value) {
    if (!this._testAsFloat(value)) {
      return this
    }
    const [test, val] = this._ajustFloats(this.test, value)
    if (this._compareFloats(test, val) === true) {
      this._error(130, `It should be lower than ${value}.`)
    }
    return this
  }

  /**
   * Check if test is equal than "value".
   * @param {number} value - Value (float).
   */
  equal (value) {
    if (!this._testAsFloat(value)) {
      return this
    }
    const [test, val] = this._ajustFloats(this.test, value)
    if (this._compareFloats(test, val) !== null) {
      this._error(123, `It should be equal than ${value}.`)
    }
    return this
  }

  /**
   * Check if test has "length" min decimals.
   * @param {number} length - Min decimal length (integer).
   */
  mindecimal (length) {
    if (this._countDecimals(this.test) < length) {
      this._error(122, `It should be has ${length} min decimals.`)
    }
    return this
  }

  /**
   * Check if test has "length" max decimals.
   * @param {number} length - Max decimal length (integer).
   */
  maxdecimal (length) {
    if (this._countDecimals(this.test) > length) {
      this._error(122, `It should be has ${length} max decimals.`)
    }
    return this
  }

  /**
   * Check if test has "length" decimals.
   * @param {number} length - Decimal length (integer).
   */
  decimal (length) {
    if (this._countDecimals(this.test) !== length) {
      this._error(122, `It should be has ${length} decimals.`)
    }
    return this
  }

  /**
   * Count the number of decimals.
   * @param {number} value - Float value.
   * @returns {number}
   */
  _countDecimals (value) {
    return String(value).split('.')[1].length || 0
  }

  /**
   * Internal method to compare float.
   * Returns:
   *  - true  : a > b
   *  - false : b > a
   *  - null  : a = b
   * @param {string} a - Object numberA.
   * @param {string} b - Object numberB.
   * @returns {null|boolean}
   */
  _compareFloats (a, b) {
    const intA = parseInt(a.int)
    const intB = parseInt(b.int)
    if (intA > intB || intA < intB) {
      return intA > intB
    }
    const splittedDecA = a.dec.split('')
    const splittedDecB = b.dec.split('')
    for (let i = 0; i < splittedDecA.length; ++i) {
      let cellA = parseInt(splittedDecA[i] * a.type)
      let cellB = parseInt(splittedDecB[i] * b.type)
      if (cellA > cellB || cellA < cellB) {
        return cellA > cellB
      }
    }
    return null
  }

  /**
   * Internal to ajust two float to work with them.
   * @param {number} a - Float numberA.
   * @param {number} b - Float numberB.
   */
  _ajustFloats (a, b) {
    a = this._floatToObject(a)
    b = this._floatToObject(b)
    const longest = a.dec.length > b.dec.length ? a.dec.length : b.dec.length
    const group = [a, b]
    for (let i = 0; i < group.length; ++i) {
      while (group[i].dec.length < longest) {
        group[i].dec += '0'
      }
    }
    return group
  }

  /**
   * Internal to convert float number to object.
   * @param {number} value - Float value.
   */
  _floatToObject (value) {
    const splitted = String(value).split('.')
    return { int: splitted[0], dec: splitted[1] || '0', type: Math.sign(value) }
  }

  /**
   * Internal to check if "value" has float template.
   * @param {number} value - Tested value.
   */
  _testAsFloat (value) {
    if (!String(value).match(this.constructor.getFloatRegex())) {
      this._error(120, `Comparason value need to be float.`)
      return false
    }
    return true
  }

  /**
   * Static method to provide float regex.
   */
  static getFloatRegex () {
    return /^[-+]?[0-9]+\.[0-9]+$/
  }
}
