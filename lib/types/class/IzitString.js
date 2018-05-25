'use strict'

const IzitJS = require('../../IzitJS.js')
const FLOAT_REGEX = require('./IzitFloat.js').getFloatRegex()

/**
 * Class IzitString.
 * @extends IzitJS
 */
module.exports = class IzitString extends IzitJS {
  /**
   * Class constructor.
   * @param {any} test - Tested value.
   */
  constructor (test) {
    super(test)
    this.string()
  }

  /**
   * Check if test is string.
   */
  string () {
    if (typeof this.test !== 'string') {
      this._error(120, `It should be a string.`)
    }
    return this
  }

  /**
   * Check if test is longer than length.
   * @param {number} length - Min length (integer).
   */
  minlength (length) {
    if (this.test.length < length || length < 0) {
      this._error(121, `It should be longer than ${length}.`)
    }
    return this
  }

  /**
   * Check if test is shorter than length.
   * @param {number} length - Max length (integer).
   */
  maxlength (length) {
    if (this.test.length > length || length < 0) {
      this._error(121, `It should be shortest than ${length}.`)
    }
    return this
  }

  /**
   * Check if test length is equal to "length".
   * @param {number} length - String length (integer).
   */
  length (length) {
    if (this.test.length !== length) {
      this._error(121, `It should be has ${length} chars.`)
    }
    return this
  }

  /**
   * Check if test is not an empty string.
   */
  notempty () {
    if (!this.test || /^\s*$/.test(this.test) || this.test.trim() === '') {
      this._error(122, `It should not be an empty string.`)
    }
    return this
  }

  /**
   * Check if test is aphanumeric string.
   */
  alphanum () {
    if (!this.test.match(/^[0-9a-zA-Z]+$/)) {
      this._error(122, `It should not be an alphanumeric string.`)
    }
    return this
  }

  /**
   * Check if test is lowercase.
   */
  lowercase () {
    if (!this.test.match(/^[a-z]+$/)) {
      this._error(122, `It should not be an lowercase string.`)
    }
    return this
  }

  /**
   * Check if test is uppercase.
   */
  uppercase () {
    if (!this.test.match(/^[A-Z]+$/)) {
      this._error(122, `It should not be an uppercase string.`)
    }
    return this
  }

  /**
   * Check if test is numeric string.
   */
  numeric () {
    if (!this.test.match(/^[0-9]+$/) && !this.test.match(FLOAT_REGEX)) {
      this._error(122, `It should not be an numeric string.`)
    }
    return this
  }

  /**
   * Check if test is integer string.
   */
  numinteger () {
    if (!this.test.match(/^[0-9]+$/)) {
      this._error(122, `It should not be an integer string.`)
    }
    return this
  }

  /**
   * Check if test is float string.
   */
  numfloat () {
    if (!this.test.match(FLOAT_REGEX)) {
      this._error(122, `It should not be an float string.`)
    }
    return this
  }

  /**
   * Check if test is an email.
   */
  email () {
    if (!this.test.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this._error(122, `It should be an email.`)
    }
    return this
  }

  /**
   * Check if test is an hostname.
   */
  hostname () {
    if (!this.test.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/gm)) {
      this._error(122, `It should be an hostname.`)
    }
    return this
  }

  /**
   * Check if test is an url.
   */
  url () {
    if (!this.test.match(/^(http|https|ws|ftp)?(:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g)) {
      this._error(122, `It should be an url.`)
    }
    return this
  }

  /**
   * Check if test is an ip.
   */
  ip () {
    if (!this.test.match(this._getIpv4Regex()) && !this.test.match(this._getIpv6Regex())) {
      this._error(122, `It should be an ip address.`)
    }
    return this
  }

  /**
   * Check if test is an ipv4.
   */
  ipv4 () {
    if (!this.test.match(this._getIpv4Regex())) {
      this._error(122, `It should be an ipv4 address.`)
    }
    return this
  }

  /**
   * Check if test is an ipv6.
   */
  ipv6 () {
    if (!this.test.match(this._getIpv6Regex())) {
      this._error(122, `It should be an ipv6 address.`)
    }
    return this
  }

  /**
   * Check if test is equal than equality.
   * @param {string} equality - The string needed to be compare.
   */
  equal (equality) {
    if (this.test !== equality) {
      this._error(123, `This field should be equal to : "${equality}".`)
    }
    return this
  }

  /**
   * Internal method to provide ipv4 regex.
   */
  _getIpv4Regex () {
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g
  }

  /**
   * Internal method to provide ipv6 regex.
   */
  _getIpv6Regex () {
    return /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/g
  }
}
