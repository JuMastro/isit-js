'use strict'

const IzitJS = require('../izit')

class IzitArray extends IzitJS {
  constructor (test) {
    super(test)
    this.array()
  }

  array () {
    if (!Array.isArray(this.test)) {
      this.error(120, `It should be an array!`)
    }
    return this
  }

  min (length) {
    if (this.test.length < length) {
      this.error(121, `It should be longer than ${length}`)
    }
    return this
  }

  max (length) {
    if (this.test.length > length) {
      this.error(121, `It should be shortest than ${length}`)
    }
    return this
  }

  length (length) {
    if (this.test.length !== length) {
      this.error(121, `It should be equal than ${length}`)
    }
    return this
  }
}

module.exports = (test) => { return new IzitArray(test) }
