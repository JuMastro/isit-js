'use strict'

const assert = require('chai').assert
const IzitInteger = require('../../lib/types/integer.js')

const test = {
  int: 12550,
  float: 1005.2458,
  zero: 0,
  long: 1764576459489784754675197849,
  neg: -12550,
  array: ['Is', 'Medium', 'Array', 'Guys', '!'],
  string: 'Is a random string write to do tests!',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'] }
}

describe('Integer', () => {
  it('is integer', () => {
    assert.equal(IzitInteger(test.int).integer().hasErrors(), false)
    assert.equal(IzitInteger(test.float).integer().hasErrors(), true)
    assert.equal(IzitInteger(test.zero).integer().hasErrors(), false)
    assert.equal(IzitInteger(test.long).integer().hasErrors(), false)
    assert.equal(IzitInteger(test.neg).integer().hasErrors(), false)
    assert.equal(IzitInteger(test.array).integer().hasErrors(), true)
    assert.equal(IzitInteger(test.string).integer().hasErrors(), true)
    assert.equal(IzitInteger(test.object).integer().hasErrors(), true)
    assert.equal(IzitInteger(true).integer().hasErrors(), true)
  })

  it('is min', () => {
    assert.equal(IzitInteger(test.int).min(test.int + 1).hasErrors(), true)
    assert.equal(IzitInteger(test.zero).min(-1).hasErrors(), false)
    assert.equal(IzitInteger(test.neg).min(test.neg + 1).hasErrors(), true)
    assert.equal(IzitInteger(test.array).min(0).hasErrors(), true)
    assert.equal(IzitInteger(test.string).min(0).hasErrors(), true)
    assert.equal(IzitInteger(test.object).min(0).hasErrors(), true)
  })

  it('is max', () => {
    assert.equal(IzitInteger(test.int).max(test.int + 1).hasErrors(), false)
    assert.equal(IzitInteger(test.float).max(test.float - 0.1).hasErrors(), true)
    assert.equal(IzitInteger(test.zero).max(-1).hasErrors(), true)
    assert.equal(IzitInteger(test.neg).max(test.neg + 1).hasErrors(), false)
    assert.equal(IzitInteger(test.array).max(0).hasErrors(), true)
    assert.equal(IzitInteger(test.string).max(0).hasErrors(), true)
    assert.equal(IzitInteger(test.object).max(0).hasErrors(), true)
  })

  it('is precise', () => {
    assert.equal(IzitInteger(test.int).precision(test.int + 10, 10).hasErrors(), false)
    assert.equal(IzitInteger(test.int).precision(test.int - 10, 10).hasErrors(), false)
    assert.equal(IzitInteger(test.zero).precision(test.zero + 100, 100).hasErrors(), false)
    assert.equal(IzitInteger(test.zero).precision(test.zero - 100, 100).hasErrors(), false)
    assert.equal(IzitInteger(test.long).precision(test.long + 10000, 10000).hasErrors(), false)
    assert.equal(IzitInteger(test.neg).precision(test.neg + 100, 100).hasErrors(), false)
    assert.equal(IzitInteger(test.neg).precision(test.neg - 100, 100).hasErrors(), false)
  })

  it('is positive', () => {
    assert.equal(IzitInteger(test.int).positive().hasErrors(), false)
    assert.equal(IzitInteger(test.zero).positive().hasErrors(), true)
    assert.equal(IzitInteger(test.neg).positive().hasErrors(), true)
    assert.equal(IzitInteger(test.long).positive().hasErrors(), false)
    assert.equal(IzitInteger(test.array).positive().hasErrors(), true)
    assert.equal(IzitInteger(test.string).positive().hasErrors(), true)
    assert.equal(IzitInteger(test.object).positive().hasErrors(), true)
    assert.equal(IzitInteger(true).positive().hasErrors(), true)
    assert.equal(IzitInteger(false).positive().hasErrors(), true)
  })

  it('is negative', () => {
    assert.equal(IzitInteger(test.int).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.float).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.zero).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.neg).negative().hasErrors(), false)
    assert.equal(IzitInteger(test.long).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.array).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.string).negative().hasErrors(), true)
    assert.equal(IzitInteger(test.object).negative().hasErrors(), true)
  })

  it('is zero', () => {
    assert.equal(IzitInteger(test.int).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.float).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.zero).zero().hasErrors(), false)
    assert.equal(IzitInteger(test.neg).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.negFloat).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.array).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.string).zero().hasErrors(), true)
    assert.equal(IzitInteger(test.object).zero().hasErrors(), true)
    assert.equal(IzitInteger(false).zero().hasErrors(), true)
    assert.equal(IzitInteger(0).zero().hasErrors(), false)
  })

  it('is mixed', () => {
    assert.equal(IzitInteger(test.int).min(1).max(test.int).precision(test.int + 10, test.int + 10).positive().hasErrors(), false)
    assert.equal(IzitInteger(test.neg).min(test.neg).max(0).negative().hasErrors(), false)
    assert.equal(IzitInteger(test.neg).min(test.neg).max(0).positive().hasErrors(), true)
  })
})
