'use strict'

const IzitString = require('../../lib/types/string')
const assert = require('chai').assert

const test = {
  array: ['Is', 'Medium', 'Array', 'Guys', '!', 'id'],
  string: 'id Is a random string write to do tests!',
  empty: '',
  nbString: '124545.04215',
  object: { id: 'is_id', value: 'is_value', list: ['test', 'test'] },
  int: 12550,
  float: 1005.2458
}

describe('String', () => {
  it('is string', () => {
    assert.equal(IzitString(test.array).hasErrors(), true)
    assert.equal(IzitString(test.string).hasErrors(), false)
    assert.equal(IzitString(test.empty).hasErrors(), false)
    assert.equal(IzitString(test.nbString).hasErrors(), false)
    assert.equal(IzitString(test.object).hasErrors(), true)
    assert.equal(IzitString(JSON.stringify(test.object)).hasErrors(), false)
    assert.equal(IzitString(test.int).hasErrors(), true)
    assert.equal(IzitString(test.float).hasErrors(), true)
    assert.equal(IzitString(true).hasErrors(), true)
  })
})