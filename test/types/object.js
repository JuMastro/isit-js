'use strict'

const IzitObject = require('../../lib/types/object')
const assert = require('chai').assert

const tests = {
  empty: {},
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'], sub: { subsub: 'HelloWorld!'} },
  cloned: { id: 'is_id', value: 'is_value', list: ['test', 'test'], sub: { subsub: 'HelloWorld!'} },
  sameKeys: { id: 'tes', value: 12225.5554, list: 'HelloWorldJohn', sub: ['complete'] },
  diff: { min: 1115, max: 1220, x: 0, y: 0 }
}

describe('IzitObject', () => {
  it('.object()', () => {
    // Valids
    assert.isFalse(IzitObject(tests.empty).hasErrors())
    assert.isFalse(IzitObject(tests.object).hasErrors())
    assert.isFalse(IzitObject(tests.sameKeys).hasErrors())
    assert.isFalse(IzitObject(tests.diff).hasErrors())

    // Errors
    assert.isTrue(IzitObject(['Is', 'Medium', 'Array', 'Guys', '!', 'id']).hasErrors())
    assert.isTrue(IzitObject('id Is a random string write to do tests!').hasErrors())
    assert.isTrue(IzitObject(12550).hasErrors())
    assert.isTrue(IzitObject(1005.2458).hasErrors())
    assert.isTrue(IzitObject(true).hasErrors())
  })

  it('.hasprop(key)', () => {
    // Valids
    assert.isFalse(IzitObject(tests.object).hasprop('value').hasErrors())
    assert.isFalse(IzitObject(tests.sameKeys).hasprop('sub').hasErrors())
    assert.isFalse(IzitObject(tests.diff).hasprop('x').hasErrors())

    // Errors
    assert.isTrue(IzitObject(tests.object).hasprop('subsub').hasErrors())
    assert.isTrue(IzitObject(tests.sameKeys).hasprop('tes').hasErrors())
    assert.isTrue(IzitObject(tests.diff).hasprop('').hasErrors())
  })

  it('.haskeyvalue(key, value)', () => {
    // Valids
    assert.isFalse(IzitObject(tests.object).haskeyvalue('id', 'is_id').hasErrors())
    assert.isFalse(IzitObject(tests.object).haskeyvalue('list', ['test', 'test']).hasErrors())
    assert.isFalse(IzitObject(tests.object).haskeyvalue('sub', { subsub: 'HelloWorld!' }).hasErrors())
    assert.isFalse(IzitObject(tests.diff).haskeyvalue('min', 1115).hasErrors())

    // Errors
    assert.isTrue(IzitObject(tests.object).haskeyvalue('sub', {}).hasErrors())
    assert.isTrue(IzitObject(tests.object).haskeyvalue('list', ['', '']).hasErrors())
    assert.isTrue(IzitObject(tests.sameKeys).haskeyvalue('value', '12225.5554').hasErrors())
    assert.isTrue(IzitObject(tests.diff).haskeyvalue('x', '0').hasErrors())
  })

  it('.equal(equality)', () => {
    // Valids
    assert.isFalse(IzitObject(tests.object).equal(tests.cloned).hasErrors())
    assert.isFalse(IzitObject(tests.diff).equal({ min: 1115, max: 1220, x: 0, y: 0 }).hasErrors())

    // Errors
    assert.isTrue(IzitObject(tests.sameKeys).equal(tests.object).hasErrors())
    assert.isTrue(IzitObject(tests.diff).equal({ min: 1115, max: 1220, x: 0, y: '0' }).hasErrors())
  })
})
