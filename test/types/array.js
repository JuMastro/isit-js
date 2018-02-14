'use strict'

const IzitArray = require('../../lib/types/array')
const assert = require('chai').assert

const test = {
  empty: [],
  simple: ['Is', 'Medium', 'Array', 'Guys', '!'],
  medium: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  string: 'HelloWorld HelloWorld HelloWorld!',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'] },
  int: 12550,
  float: 1005.2458
}

describe('Array', () => {
  it('is array', () => {
    assert.equal(IzitArray(test.empty).hasErrors(), false)
    assert.equal(IzitArray(test.simple).hasErrors(), false)
    assert.equal(IzitArray(test.medium).hasErrors(), false)
    assert.equal(IzitArray(test.string).hasErrors(), true)
    assert.equal(IzitArray(test.object).hasErrors(), true)
    assert.equal(IzitArray(test.int).hasErrors(), true)
    assert.equal(IzitArray(test.float).hasErrors(), true)
  })

  it('is min length', () => {
    assert.equal(IzitArray(test.empty).min(0).hasErrors(), false)
    assert.equal(IzitArray(test.empty).min(1).hasErrors(), true)
    assert.equal(IzitArray(test.simple).min(3).hasErrors(), false)
    assert.equal(IzitArray(test.string).min(0).hasErrors(), true)
    assert.equal(IzitArray(test.object).min(1).hasErrors(), true)
    assert.equal(IzitArray(test.float).min(4).hasErrors(), true)
  })

  it('is max length', () => {
    assert.equal(IzitArray(test.empty).max(2).hasErrors(), false)
    assert.equal(IzitArray(test.empty).max(0).hasErrors(), false)
    assert.equal(IzitArray(test.simple).max(3).hasErrors(), true)
    assert.equal(IzitArray(test.string).max(10).hasErrors(), true)
    assert.equal(IzitArray(test.object).max(10).hasErrors(), true)
  })

  it('is length', () => {
    assert.equal(IzitArray(test.empty).length(0).hasErrors(), false)
    assert.equal(IzitArray(test.empty).length(1).hasErrors(), true)
    assert.equal(IzitArray(test.simple).length(3).hasErrors(), true)
    assert.equal(IzitArray(test.simple).length(5).hasErrors(), false)
    assert.equal(IzitArray(test.string).length(10).hasErrors(), true)
    assert.equal(IzitArray(test.object).length(10).hasErrors(), true)
  })

  it('is mixed', () => {
    assert.equal(IzitArray(test.empty).length(0).min(0).max(0).hasErrors(), false)
    assert.equal(IzitArray(test.empty).length(0).min(1).max(2).hasErrors(), true)
    assert.equal(IzitArray(test.simple).min(2).max(10).length(5).hasErrors(), false)
    assert.equal(IzitArray(test.simple).min(0).max(5).hasErrors(), false)
    assert.equal(IzitArray(test.simple).min(6).max(10).hasErrors(), true)
    assert.equal(IzitArray(test.string).min(0).max(100).hasErrors(), true)
    assert.equal(IzitArray(test.object).min(0).max(1000).hasErrors(), true)
  })
})
