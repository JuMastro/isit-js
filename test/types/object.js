'use strict'

const IzitObject = require('../../lib/types/object')
const assert = require('chai').assert

const test = {
  array: ['Is', 'Medium', 'Array', 'Guys', '!', 'id'],
  string: 'id Is a random string write to do tests!',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'], sub: { subsub: 'HelloWorld!'} },
  int: 12550,
  float: 1005.2458
}

describe('Object', () => {
  it('is object', () => {
    assert.equal(IzitObject(test.array).hasErrors(), true)
    assert.equal(IzitObject(test.string).hasErrors(), true)
    assert.equal(IzitObject(test.object).hasErrors(), false)
    assert.equal(IzitObject(test.int).hasErrors(), true)
    assert.equal(IzitObject(test.float).hasErrors(), true)
    assert.equal(IzitObject(true).hasErrors(), true)
  })

  it('is contain prop', () => {
    assert.equal(IzitObject(test.array).has('id').hasErrors(), true)
    assert.equal(IzitObject(test.string).has('id').hasErrors(), true)
    assert.equal(IzitObject(test.int).has('id').hasErrors(), true)
    assert.equal(IzitObject(test.float).has('id').hasErrors(), true)
    assert.equal(IzitObject(true).has('id').hasErrors(), true)
    assert.equal(IzitObject(test.object).has('id').hasErrors(), false)
    assert.equal(IzitObject(test.object).has('subsub').hasErrors(), true)
  })
})
