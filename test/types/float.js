'use strict'

const assert = require('chai').assert
const IzitFloat = require('../../lib/types/float.js')

const floatTypes = {
  float: 5.2458,
  neg: -5.2458,
  long: 0.004545457644574,
  negLong: -0.004545457644574,
  zero: 0
}

describe('IzitFloat', () => {
  it('.float()', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.negLong).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.zero).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(12550).hasErrors())
    assert.isTrue(IzitFloat(-12550).hasErrors())
    assert.isTrue(IzitFloat(['Is', 'Medium', 'Array', 'Guys', '!']).hasErrors())
    assert.isTrue(IzitFloat('Is a random string write to do tests!').hasErrors())
    assert.isTrue(IzitFloat({ id: 'is_id', value: 'is_value', list: ['test', 'test'] }).hasErrors())
  })

  it('.min(value)', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).min(5.2458).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).min(-5.2458).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).min(0.004545457644574).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.neg).min(-5.2400).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.long).min(0.004545457644575).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.negLong).min(-0.004545457644573).hasErrors())
  })

  it('.max(value)', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).max(5.2458).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).max(-5.2458).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).max(0.004545457644574).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.neg).max(-6).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.long).max(0.004).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.negLong).max(-1.001).hasErrors())
  })

  it('.positive()', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).positive().hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).positive().hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.neg).positive().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.negLong).positive().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.zero).positive().hasErrors())
  })

  it('.negative()', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.neg).negative().hasErrors())
    assert.isFalse(IzitFloat(floatTypes.negLong).negative().hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.float).negative().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.long).negative().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.zero).negative().hasErrors())
  })

  it('.zero()', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.zero).zero().hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.float).zero().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.long).zero().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.neg).zero().hasErrors())
    assert.isTrue(IzitFloat(floatTypes.negLong).zero().hasErrors())
  })

  it('.mindecimal(length)', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).mindecimal(3).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).mindecimal(10).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).mindecimal(4).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.float).mindecimal(6).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.neg).mindecimal(5).hasErrors())
  })

  it('.maxdecimal(length)', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).maxdecimal(5).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).maxdecimal(20).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).maxdecimal(4).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.float).maxdecimal(3).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.neg).maxdecimal(2).hasErrors())
  })

  it('.decimal(length)', () => {
    // Valids
    assert.isFalse(IzitFloat(floatTypes.float).decimal(4).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.long).decimal(15).hasErrors())
    assert.isFalse(IzitFloat(floatTypes.neg).decimal(4).hasErrors())

    // Errors
    assert.isTrue(IzitFloat(floatTypes.float).decimal(3).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.float).decimal(5).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.neg).decimal(2).hasErrors())
    assert.isTrue(IzitFloat(floatTypes.neg).decimal(6).hasErrors())
  })
})
