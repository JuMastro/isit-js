'use strict'

const IzitJS = function (test) {
  this.test = test
}

IzitJS.prototype.array = function () {
  return require('./types/array')(this.test)
}

module.exports = (test) => { return new IzitJS(test) }
