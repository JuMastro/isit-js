'use strict'

const IzitNumber = require('../../lib/types/number')
const assert = require('chai').assert

const test = {
  int: 12550,
  float: 1005.2458,
  bigFloat: 2173244545675.45764457456159,
  zero: 0,
  long: 1764576459489784754675197849,
  neg: -12550,
  negFloat: -1005.2458,
  negLongFloat: -2173244545675.45764457456159,
  array: ['Is', 'Medium', 'Array', 'Guys', '!'],
  string: 'Is a random string write to do tests!',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'] }
}

describe('Number', () => {
  it('is number', () => {
    assert.equal(IzitNumber(test.int).hasErrors(), false)
    assert.equal(IzitNumber(test.float).hasErrors(), false)
    assert.equal(IzitNumber(test.bigFloat).hasErrors(), false)
    assert.equal(IzitNumber(test.zero).hasErrors(), false)
    assert.equal(IzitNumber(test.neg).hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).hasErrors(), false)
    assert.equal(IzitNumber(test.long).hasErrors(), false)
    assert.equal(IzitNumber(test.array).hasErrors(), true)
    assert.equal(IzitNumber(test.string).hasErrors(), true)
    assert.equal(IzitNumber(test.object).hasErrors(), true)
  })

  it('is integer', () => {
    assert.equal(IzitNumber(test.int).integer().hasErrors(), false)
    assert.equal(IzitNumber(test.float).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.bigFloat).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.zero).integer().hasErrors(), false)
    assert.equal(IzitNumber(test.long).integer().hasErrors(), false)
    assert.equal(IzitNumber(test.neg).integer().hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.negLongFloat).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.array).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.string).integer().hasErrors(), true)
    assert.equal(IzitNumber(test.object).integer().hasErrors(), true)
    assert.equal(IzitNumber(true).integer().hasErrors(), true)
  })

  it('is float', () => {
    assert.equal(IzitNumber(test.int).float().hasErrors(), true)
    assert.equal(IzitNumber(test.float).float().hasErrors(), false)
    assert.equal(IzitNumber(test.bigFloat).float().hasErrors(), false)
    assert.equal(IzitNumber(test.zero).float().hasErrors(), true)
    assert.equal(IzitNumber(test.neg).float().hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).float().hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).float().hasErrors(), false)
    assert.equal(IzitNumber(test.long).float().hasErrors(), true)
    assert.equal(IzitNumber(test.array).float().hasErrors(), true)
    assert.equal(IzitNumber(test.string).float().hasErrors(), true)
    assert.equal(IzitNumber(test.object).float().hasErrors(), true)
  })

  it('is min', () => {
    assert.equal(IzitNumber(test.int).min(test.int + 1).hasErrors(), true)
    assert.equal(IzitNumber(test.float).min(test.float - 0.1).hasErrors(), false)
    assert.equal(IzitNumber(test.bigFloat).min(test.bigFloat - 100).hasErrors(), false)
    assert.equal(IzitNumber(test.zero).min(-1).hasErrors(), false)
    assert.equal(IzitNumber(test.neg).min(test.neg + 1).hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).min(test.negFloat - 0.55558).hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).min(test.negLongFloat - 14141.745764576).hasErrors(), false)
    assert.equal(IzitNumber(test.array).min(0).hasErrors(), true)
    assert.equal(IzitNumber(test.string).min(0).hasErrors(), true)
    assert.equal(IzitNumber(test.object).min(0).hasErrors(), true)
  })

  it('is max', () => {
    assert.equal(IzitNumber(test.int).max(test.int + 1).hasErrors(), false)
    assert.equal(IzitNumber(test.float).max(test.float - 0.1).hasErrors(), true)
    assert.equal(IzitNumber(test.bigFloat).max(test.bigFloat - 100).hasErrors(), true)
    assert.equal(IzitNumber(test.zero).max(-1).hasErrors(), true)
    assert.equal(IzitNumber(test.neg).max(test.neg + 1).hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).max(test.negFloat - 0.55558).hasErrors(), true)
    assert.equal(IzitNumber(test.negLongFloat).max(test.negLongFloat - 14141.745764576).hasErrors(), true)
    assert.equal(IzitNumber(test.array).max(0).hasErrors(), true)
    assert.equal(IzitNumber(test.string).max(0).hasErrors(), true)
    assert.equal(IzitNumber(test.object).max(0).hasErrors(), true)
  })

  it('is precise', () => {
    assert.equal(IzitNumber(test.int).precision(test.int + 10, 10).hasErrors(), false)
    assert.equal(IzitNumber(test.int).precision(test.int - 10, 10).hasErrors(), false)
    assert.equal(IzitNumber(test.zero).precision(test.zero + 100, 100).hasErrors(), false)
    assert.equal(IzitNumber(test.zero).precision(test.zero - 100, 100).hasErrors(), false)
    assert.equal(IzitNumber(test.long).precision(test.long + 10000, 10000).hasErrors(), false)
    assert.equal(IzitNumber(test.neg).precision(test.neg + 100, 100).hasErrors(), false)
    assert.equal(IzitNumber(test.neg).precision(test.neg - 100, 100).hasErrors(), false)
    assert.equal(IzitNumber(test.float).precision(test.float + 100, 100).hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).precision(test.negFloat + 100.4455, 100.554).hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).precision(test.negLongFloat + 17457600.754765, 17457600.754765).hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).precision(test.negLongFloat + 17457600.754778787, 17457600).hasErrors(), true)
  })

  it('is positive', () => {
    assert.equal(IzitNumber(test.int).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.float).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.bigFloat).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.zero).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.neg).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.negLongFloat).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.long).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.array).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.string).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.object).positive().hasErrors(), true)
    assert.equal(IzitNumber(true).positive().hasErrors(), true)
    assert.equal(IzitNumber(false).positive().hasErrors(), true)
  })

  it('is negative', () => {
    assert.equal(IzitNumber(test.int).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.float).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.bigFloat).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.zero).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.neg).negative().hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).negative().hasErrors(), false)
    assert.equal(IzitNumber(test.negLongFloat).negative().hasErrors(), false)
    assert.equal(IzitNumber(test.long).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.array).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.string).negative().hasErrors(), true)
    assert.equal(IzitNumber(test.object).negative().hasErrors(), true)
  })

  it('is zero', () => {
    assert.equal(IzitNumber(test.int).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.float).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.bigFloat).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.zero).zero().hasErrors(), false)
    assert.equal(IzitNumber(test.neg).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.array).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.string).zero().hasErrors(), true)
    assert.equal(IzitNumber(test.object).zero().hasErrors(), true)
    assert.equal(IzitNumber(false).zero().hasErrors(), true)
    assert.equal(IzitNumber(0).zero().hasErrors(), false)
  })

  it('is mixed', () => {
    assert.equal(IzitNumber(test.int).min(1).max(test.int).precision(test.int + 10, test.int + 10).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.float).min(1).max(test.float).precision(test.float - 10.858, test.float - 10.858).positive().hasErrors(), false)
    assert.equal(IzitNumber(test.neg).min(test.neg).max(0).negative().hasErrors(), false)
    assert.equal(IzitNumber(test.neg).min(test.neg).max(0).positive().hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).min(test.negFloat).negative().hasErrors(), false)
    assert.equal(IzitNumber(test.negFloat).min(test.negFloat + 1).hasErrors(), true)
    assert.equal(IzitNumber(test.negFloat).negative().min(test.negFloat).precision(test.negFloat - 0.576457, 0.576457).hasErrors(), false)
  })
})
