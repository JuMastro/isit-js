'use strict'

const assert = require('chai').assert
const IzitFloat = require('../../lib/types/float.js')

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

describe('Float', () => {
  it('is float', () => {
    assert.equal(IzitFloat(test.int).float().hasErrors(), true)
    assert.equal(IzitFloat(test.float).float().hasErrors(), false)
    assert.equal(IzitFloat(test.bigFloat).float().hasErrors(), false)
    assert.equal(IzitFloat(test.zero).float().hasErrors(), false)
    assert.equal(IzitFloat(test.neg).float().hasErrors(), true)
    assert.equal(IzitFloat(test.negFloat).float().hasErrors(), false)
    assert.equal(IzitFloat(test.negLongFloat).float().hasErrors(), false)
    assert.equal(IzitFloat(test.long).float().hasErrors(), true)
    assert.equal(IzitFloat(test.array).float().hasErrors(), true)
    assert.equal(IzitFloat(test.string).float().hasErrors(), true)
    assert.equal(IzitFloat(test.object).float().hasErrors(), true)
  })

  it('is min', () => {
    assert.equal(IzitFloat(test.float).min(test.float - 0.1).hasErrors(), false)
    assert.equal(IzitFloat(test.bigFloat).min(test.bigFloat - 100).hasErrors(), false)
    assert.equal(IzitFloat(test.negFloat).min(test.negFloat - 0.55558).hasErrors(), false)
    assert.equal(IzitFloat(test.negLongFloat).min(test.negLongFloat - 14141.745764576).hasErrors(), false)
    assert.equal(IzitFloat(test.array).min(0).hasErrors(), true)
    assert.equal(IzitFloat(test.string).min(0).hasErrors(), true)
    assert.equal(IzitFloat(test.object).min(0).hasErrors(), true)
  })

  it('is max', () => {
    assert.equal(IzitFloat(test.float).max(test.float - 0.1).hasErrors(), true)
    assert.equal(IzitFloat(test.bigFloat).max(test.bigFloat - 100).hasErrors(), true)
    assert.equal(IzitFloat(test.negFloat).max(test.negFloat - 0.55558).hasErrors(), true)
    assert.equal(IzitFloat(test.negLongFloat).max(test.negLongFloat - 14141.745764576).hasErrors(), true)
    assert.equal(IzitFloat(test.array).max(0).hasErrors(), true)
    assert.equal(IzitFloat(test.string).max(0).hasErrors(), true)
    assert.equal(IzitFloat(test.object).max(0).hasErrors(), true)
  })

  it('is precise', () => {
    assert.equal(IzitFloat(test.float).precision(test.float + 100, 100).hasErrors(), false)
    assert.equal(IzitFloat(test.negFloat).precision(test.negFloat + 100.4455, 100.554).hasErrors(), false)
    assert.equal(IzitFloat(test.negLongFloat).precision(test.negLongFloat + 17457600.754765, 17457600.754765).hasErrors(), false)
    assert.equal(IzitFloat(test.negLongFloat).precision(test.negLongFloat + 17457600.754778787, 17457600).hasErrors(), true)
  })

  it('is positive', () => {
    assert.equal(IzitFloat(test.float).positive().hasErrors(), false)
    assert.equal(IzitFloat(test.bigFloat).positive().hasErrors(), false)
    assert.equal(IzitFloat(test.zero).positive().hasErrors(), true)
    assert.equal(IzitFloat(test.negFloat).positive().hasErrors(), true)
    assert.equal(IzitFloat(test.negLongFloat).positive().hasErrors(), true)
    assert.equal(IzitFloat(test.array).positive().hasErrors(), true)
    assert.equal(IzitFloat(test.string).positive().hasErrors(), true)
    assert.equal(IzitFloat(test.object).positive().hasErrors(), true)
    assert.equal(IzitFloat(true).positive().hasErrors(), true)
    assert.equal(IzitFloat(false).positive().hasErrors(), true)
  })

  it('is negative', () => {
    assert.equal(IzitFloat(test.float).negative().hasErrors(), true)
    assert.equal(IzitFloat(test.bigFloat).negative().hasErrors(), true)
    assert.equal(IzitFloat(test.zero).negative().hasErrors(), true)
    assert.equal(IzitFloat(test.negFloat).negative().hasErrors(), false)
    assert.equal(IzitFloat(test.negLongFloat).negative().hasErrors(), false)
    assert.equal(IzitFloat(test.array).negative().hasErrors(), true)
    assert.equal(IzitFloat(test.string).negative().hasErrors(), true)
    assert.equal(IzitFloat(test.object).negative().hasErrors(), true)
    assert.equal(IzitFloat(true).positive().hasErrors(), true)
    assert.equal(IzitFloat(false).positive().hasErrors(), true)
  })

  it('is zero', () => {
    assert.equal(IzitFloat(test.int).zero().hasErrors(), true)
    assert.equal(IzitFloat(test.float).zero().hasErrors(), true)
    assert.equal(IzitFloat(test.zero).zero().hasErrors(), false)
    assert.equal(IzitFloat(test.negFloat).zero().hasErrors(), true)
    assert.equal(IzitFloat(test.array).zero().hasErrors(), true)
    assert.equal(IzitFloat(test.string).zero().hasErrors(), true)
    assert.equal(IzitFloat(test.object).zero().hasErrors(), true)
    assert.equal(IzitFloat(false).zero().hasErrors(), true)
    assert.equal(IzitFloat(0).zero().hasErrors(), false)
  })

  it('is maxdecimal', () => {
    assert.equal(IzitFloat(test.float).maxdecimal(4).hasErrors(), false)
    assert.equal(IzitFloat(test.float).maxdecimal(3).hasErrors(), true)
    assert.equal(IzitFloat(test.zero).maxdecimal(1).hasErrors(), true)
    assert.equal(IzitFloat(test.int).maxdecimal(1).hasErrors(), true)
  })

  it('is mindecimal', () => {
    assert.equal(IzitFloat(test.float).mindecimal(2).hasErrors(), false)
    assert.equal(IzitFloat(test.float).mindecimal(5).hasErrors(), true)
    assert.equal(IzitFloat(test.zero).mindecimal(1).hasErrors(), true)
    assert.equal(IzitFloat(test.int).mindecimal(1).hasErrors(), true)
  })

  it('is decimal', () => {
    assert.equal(IzitFloat(test.float).decimal(4).hasErrors(), false)
    assert.equal(IzitFloat(test.float).decimal(3).hasErrors(), true)
    assert.equal(IzitFloat(test.zero).decimal(1).hasErrors(), true)
    assert.equal(IzitFloat(test.int).decimal(1).hasErrors(), true)
  })

  it('is mixed', () => {
    assert.equal(IzitFloat(test.float).min(1).max(test.float).precision(test.float - 10.858, test.float - 10.858).positive().hasErrors(), false)
    assert.equal(IzitFloat(test.negFloat).min(test.negFloat).negative().hasErrors(), false)
    assert.equal(IzitFloat(test.negFloat).min(test.negFloat + 1).hasErrors(), true)
    assert.equal(IzitFloat(test.negFloat).negative().min(test.negFloat).precision(test.negFloat - 0.576457, 0.576457).hasErrors(), false)
    assert.equal(IzitFloat(test.bigFloat).positive().min(50.554212).max(2173244545675.777).hasErrors(), false)
    assert.equal(IzitFloat(test.float).decimal(4).mindecimal(4).maxdecimal(4).hasErrors(), false)
  })
})
