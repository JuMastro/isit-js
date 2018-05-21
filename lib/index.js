'use strict'

/**
 * Constructor.
 * Module used to provide needed type.
 * @param {any} test - Tested value.
 */
const IzitJS = function (test) {
  this.test = test
}

IzitJS.prototype.array = function () {
  return require('./types/array.js')(this.test)
}

IzitJS.prototype.boolean = function () {
  return require('./types/boolean.js')(this.test)
}

IzitJS.prototype.float = function () {
  return require('./types/float.js')(this.test)
}

IzitJS.prototype.integer = function () {
  return require('./types/integer.js')(this.test)
}

IzitJS.prototype.object = function () {
  return require('./types/object.js')(this.test)
}

IzitJS.prototype.string = function () {
  return require('./types/string.js')(this.test)
}

module.exports = (test) => { return new IzitJS(test) }
