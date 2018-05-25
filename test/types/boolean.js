'use strict'

const IzitBoolean = require('../../lib/types/boolean')
const assert = require('chai').assert

describe('IzitBoolean', () => {
  it('.boolean()', () => {
    // Valids
    assert.isFalse(IzitBoolean(true).hasErrors())
    assert.isFalse(IzitBoolean(false).hasErrors())

    // Errors
    assert.isTrue(IzitBoolean(['Is', 'Medium', 'Array', 'Guys', '!']).hasErrors())
    assert.isTrue(IzitBoolean('Is a random string write to do tests!').hasErrors())
    assert.isTrue(IzitBoolean({ id: 'is_id', value: 'is_value', list: ['test', 'test'] }).hasErrors())
    assert.isTrue(IzitBoolean(12550).hasErrors())
    assert.isTrue(IzitBoolean(1005.2458).hasErrors())
    assert.isTrue(IzitBoolean(1).hasErrors())
    assert.isTrue(IzitBoolean(0).hasErrors())
  })

  it('.rtrue()', () => {
    // Valids
    assert.isFalse(IzitBoolean(true).rtrue().hasErrors())

    // Errors
    assert.isTrue(IzitBoolean(false).rtrue().hasErrors())
  })

  it('.rfalse()', () => {
    // Valids
    assert.isFalse(IzitBoolean(false).rfalse().hasErrors())

    // Errors
    assert.isTrue(IzitBoolean(true).rfalse().hasErrors())
  })
})
