'use strict'

const IzitJS = function (test) {
  this.test = test
}

IzitJS.prototype.array = function () {
  return require('./types/array')(this.test)
}

IzitJS.prototype.boolean = function () {
  return require('./types/boolean')(this.test)
}

IzitJS.prototype.number = function () {
  return require('./types/number')(this.test)
}

IzitJS.prototype.object = function () {
  return require('./types/object')(this.test)
}

IzitJS.prototype.string = function () {
  return require('./types/string')(this.test)
}

module.exports = (test) => { return new IzitJS(test) }
