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
  constructor (test) {
    super(test)
    this.object()
  }

  /**
   * Check if test is object.
   */
  object () {
    if (typeof this.test !== 'object' || Array.isArray(this.test)) {
      this._error(120, `It should be an object.`)
    }
    return this
  }

  /**
   * Check if test has property "key".
   * @param {string} key - Property need to check.
   */
  hasprop (key) {
    if (!this.test.hasOwnProperty(key)) {
      this._error(140, `The object need include "${key}" property.`)
    }
    return this
  }

  /**
   * Check if test include property "key" with value "value".
   * @param {string} key - Needed property.
   * @param {any} value - Needed value
   */
  haskeyvalue (key, value) {
    const formatValue = (val) => {
      return typeof val === 'object' ? JSON.stringify(val) : val
    }
    if (!this.test.hasOwnProperty(key) || formatValue(this.test[key]) !== formatValue(value)) {
      this._error(140, `The object need include "${key}:'value'" property.`)
    }
    return this
  }

  /**
   * Check if test is equal to another.
   * @param {Array} equality - Compared object.
   */
  equal (equality) {
    if (typeof equality !== 'object' || JSON.stringify(this.test) !== JSON.stringify(equality)) {
      this._error(123, `It is not valid equality.`)
    }
    return this
  }
}
