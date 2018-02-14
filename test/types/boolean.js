'use strict'

const IzitBoolean = require('../../lib/types/boolean')
const assert = require('chai').assert

const test = {
  array: ['Is', 'Medium', 'Array', 'Guys', '!'],
  string: 'Is a random string write to do tests!',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'] },
  int: 12550,
  float: 1005.2458
}

describe('Boolean', () => {
  it('is boolean', () => {
    assert.equal(IzitBoolean(false).hasErrors(), false)
    assert.equal(IzitBoolean(true).hasErrors(), false)
    assert.equal(IzitBoolean(test.array).hasErrors(), true)
    assert.equal(IzitBoolean(test.string).hasErrors(), true)
    assert.equal(IzitBoolean(test.object).hasErrors(), true)
    assert.equal(IzitBoolean(test.int).hasErrors(), true)
    assert.equal(IzitBoolean(test.float).hasErrors(), true)
    assert.equal(IzitBoolean(1 === 1).hasErrors(), false)
  })

  it('is true', () => {
    assert.equal(IzitBoolean(true).rtrue().hasErrors(), false)
    assert.equal(IzitBoolean(false).rtrue().hasErrors(), true)
    assert.equal(IzitBoolean(test.array).rtrue().hasErrors(), true)
    assert.equal(IzitBoolean(test.string).rtrue().hasErrors(), true)
    assert.equal(IzitBoolean(test.object).rtrue().hasErrors(), true)
    assert.equal(IzitBoolean(test.float).rtrue().hasErrors(), true)
  })

  it('is false', () => {
    assert.equal(IzitBoolean(false).rfalse().hasErrors(), false)
    assert.equal(IzitBoolean(true).rfalse().hasErrors(), true)
    assert.equal(IzitBoolean(test.array).rfalse().hasErrors(), true)
    assert.equal(IzitBoolean(test.string).rfalse().hasErrors(), true)
    assert.equal(IzitBoolean(test.object).rfalse().hasErrors(), true)
    assert.equal(IzitBoolean(test.float).rfalse().hasErrors(), true)
  })
})
