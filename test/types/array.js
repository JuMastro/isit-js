'use strict'

const IzitArray = require('../../lib/types/array.js')
const assert = require('chai').assert

const tests = {
  empty: [],
  simple: ['Is', 'Medium', 'Array', 'Guys', '!'],
  copy: ['Is', 'Medium', 'Array', 'Guys', '!'],
  medium: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  class: new Array('testA', 'testB', 42),
  classCopy: ['testA', 'testB', 42],
  objArray: [{ a: 'a', b: 'b'}, { c: 'c', d: 'd' }]
}

describe('IzitArray', () => {
  it('.array()', () => {
    // Valids
    assert.isFalse(IzitArray(tests.empty).hasErrors())
    assert.isFalse(IzitArray(tests.simple).hasErrors())
    assert.isFalse(IzitArray(tests.medium).hasErrors())
    assert.isFalse(IzitArray(tests.class).hasErrors())

    // Errors
    assert.isTrue(IzitArray('HelloWorld!').hasErrors())
    assert.isTrue(IzitArray({ id: 'is_id', value: 'is_value', list: ['test', 'test'] }).hasErrors())
    assert.isTrue(IzitArray(12550).hasErrors())
    assert.isTrue(IzitArray(1005.2458).hasErrors())
  })

  it('.minlength(length)', () => {
    // Valids
    assert.isFalse(IzitArray(tests.empty).minlength(0).hasErrors())
    assert.isFalse(IzitArray(tests.medium).minlength(11).hasErrors())
    assert.isFalse(IzitArray(tests.class).minlength(2).hasErrors())

    // Errors
    assert.isTrue(IzitArray(tests.empty).minlength(1).hasErrors())
    assert.isTrue(IzitArray(tests.medium).minlength(13).hasErrors())
    assert.isTrue(IzitArray(tests.class).minlength(4).hasErrors())
  })

  it('.maxlength(length)', () => {
    // Valids
    assert.isFalse(IzitArray(tests.empty).maxlength(0).hasErrors())
    assert.isFalse(IzitArray(tests.medium).maxlength(12).hasErrors())
    assert.isFalse(IzitArray(tests.class).maxlength(3).hasErrors())

    // Errors
    assert.isTrue(IzitArray(tests.medium).maxlength(11).hasErrors())
    assert.isTrue(IzitArray(tests.class).maxlength(2).hasErrors())
  })

  it('.length(length)', () => {
    // Valids
    assert.isFalse(IzitArray(tests.empty).length(0).hasErrors())
    assert.isFalse(IzitArray(tests.medium).length(12).hasErrors())
    assert.isFalse(IzitArray(tests.class).length(3).hasErrors())

    // Errors
    assert.isTrue(IzitArray(tests.empty).length(1).hasErrors())
    assert.isTrue(IzitArray(tests.medium).length(13).hasErrors())
    assert.isTrue(IzitArray(tests.class).length(1).hasErrors())
  })

  it('.hasvalue(value)', () => {
    // Valids
    assert.isFalse(IzitArray(tests.simple).hasvalue('!').hasErrors())
    assert.isFalse(IzitArray(tests.class).hasvalue(42).hasErrors())
    assert.isFalse(IzitArray(tests.objArray).hasvalue({ a: 'a', b: 'b' }).hasErrors())

    // Errors
    assert.isTrue(IzitArray(tests.simple).hasvalue('!!').hasErrors())
    assert.isTrue(IzitArray(tests.simple).hasvalue('').hasErrors())
    assert.isTrue(IzitArray(tests.class).hasvalue('42').hasErrors())
    assert.isTrue(IzitArray(tests.objArray).hasvalue({ a: 'c', b: 'b' }).hasErrors())
  })

  it('.equal(egality)', () => {
    // Valids
    assert.isFalse(IzitArray(tests.empty).equal([]).hasErrors())
    assert.isFalse(IzitArray(tests.simple).equal(tests.copy).hasErrors())
    assert.isFalse(IzitArray(tests.class).equal(tests.classCopy).hasErrors())
    assert.isFalse(IzitArray(tests.objArray).equal([{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }]).hasErrors())

    // Errors
    assert.isTrue(IzitArray(tests.empty).equal(['']).hasErrors())
    assert.isTrue(IzitArray(tests.simple).equal(['!'].concat(tests.simple)).hasErrors())
    assert.isTrue(IzitArray(tests.class).equal(['testA', 'testB', '42']).hasErrors())
  })
})
