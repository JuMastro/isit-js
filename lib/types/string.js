'use strict'

const IzitJS = require('../izit')

class IzitString extends IzitJS {
  constructor (test) {
    super(test)
    this.string()
  }

  string () {
    if (typeof this.test !== 'string') {
      this._error(120, `It should be a string!`)
    }
    return this
  }

  notempty () {
    if (!this.test || /^\s*$/.test(this.test) || this.test.trim() === '') {
      this._error(122, `It should not be an empty string!`)
    }
    return this
  }

  alphanum () {
    if (!this.test.match(/^[0-9a-zA-Z]+$/)) {
      this._error(122, `It should not be an alphanumeric string!`)
    }
    return this
  }

  email () {
    if (this.test.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this._error(122, `It should be an email!`)
    }
    return this
  }

  hostname () {
    if (this.test.match(/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/gm)) {
      this._error(122, `It should be an hostname!`)
    }
    return this
  }

  url () {
    if (!this.test.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)) {
      this._error(122, `It should be an url!`)
    }
    return this
  }

  ipv4 () {
    if (!this.test.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm)) {
      this._error(122, `It should be an ipv4 address!`)
    }
    return this
  }

  ipv6 () {
    if (!this.test.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/g)) {
      this._error(122, `It should be an ipv6 address!`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitString(test) }
