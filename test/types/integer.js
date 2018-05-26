'use strict'

const assert = require('chai').assert
const IzitInteger = require('../../lib/types/integer.js')

const tests = {
  zero: 0,
  int: 12550,
  neg: -12550,
  long: 1764576459489784754675197849
}

describe('IzitInteger', () => {
  it('.integer()', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).hasErrors())
    assert.isFalse(IzitInteger(tests.int).hasErrors())
    assert.isFalse(IzitInteger(tests.neg).hasErrors())
    assert.isFalse(IzitInteger(tests.long).hasErrors())

    // Errors
    assert.isTrue(IzitInteger(1005.2458).hasErrors())
    assert.isTrue(IzitInteger(['Is', 'Medium', 'Array', 'Guys', '!']).hasErrors())
    assert.isTrue(IzitInteger('Is a random string write to do tests!').hasErrors())
    assert.isTrue(IzitInteger({ id: 'is_id', value: 'is_value', list: ['test', 'test'] }).hasErrors())
  })

  it('.min(value)', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).min(0).hasErrors())
    assert.isFalse(IzitInteger(tests.long).min(50000).hasErrors())
    assert.isFalse(IzitInteger(tests.neg).min(-20000).hasErrors())
    assert.isFalse(IzitInteger(tests.long).min(1000000).hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.zero).min(1).hasErrors())
    assert.isTrue(IzitInteger(tests.int).min(13000).hasErrors())
    assert.isTrue(IzitInteger(tests.neg).min(-1500).hasErrors())
  })

  it('.max(value)', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).max(0).hasErrors())
    assert.isFalse(IzitInteger(tests.int).max(50000).hasErrors())
    assert.isFalse(IzitInteger(tests.neg).max(0).hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.zero).max(-10).hasErrors())
    assert.isTrue(IzitInteger(tests.long).max(1000000).hasErrors())
    assert.isTrue(IzitInteger(tests.neg).max(-150000).hasErrors())
  })

  it('.equal(equality)', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).equal(0).hasErrors())
    assert.isFalse(IzitInteger(tests.zero).equal(-0).hasErrors())
    assert.isFalse(IzitInteger(tests.int).equal(12550).hasErrors())
    assert.isFalse(IzitInteger(tests.neg).equal(-12550).hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.int).equal(125501).hasErrors())
    assert.isTrue(IzitInteger(tests.neg).equal(12550).hasErrors())
    assert.isTrue(IzitInteger(tests.long).equal(0).hasErrors())
  })

  it('.positive()', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.int).positive().hasErrors())
    assert.isFalse(IzitInteger(tests.long).positive().hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.zero).positive().hasErrors())
    assert.isTrue(IzitInteger(-0).positive().hasErrors())
    assert.isTrue(IzitInteger(tests.neg).positive().hasErrors())
  })

  it('.negative()', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.neg).negative().hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.int).negative().hasErrors())
    assert.isTrue(IzitInteger(tests.long).negative().hasErrors())
    assert.isTrue(IzitInteger(tests.zero).negative().hasErrors())
    assert.isTrue(IzitInteger(-0).negative().hasErrors())
  })

  it('.zero()', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).zero().hasErrors())
    assert.isFalse(IzitInteger(-0).zero().hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.int).zero().hasErrors())
    assert.isTrue(IzitInteger(tests.long).zero().hasErrors())
  })

  it('.precision(limit, range)', () => {
    // Valids
    assert.isFalse(IzitInteger(tests.zero).precision(0, 1).hasErrors())
    assert.isFalse(IzitInteger(tests.int).precision(10000, 10000).hasErrors())
    assert.isFalse(IzitInteger(tests.neg).precision(-10000, 10000).hasErrors())

    // Errors
    assert.isTrue(IzitInteger(tests.zero).precision(-10, 1).hasErrors())
    assert.isTrue(IzitInteger(tests.int).precision(15000, 500).hasErrors())
    assert.isTrue(IzitInteger(tests.neg).precision(-10000, -5000).hasErrors())
  })
})
