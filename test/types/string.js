'use strict'

const IzitString = require('../../lib/types/string')
const assert = require('chai').assert

const test = {
  array: ['Is', 'Medium', 'Array', 'Guys', '!', 'id'],
  string: 'id Is a random string write to do tests!',
  empty: '',
  alphanum: 'fds654FDS65qs4dqSD98v7xcqSDQ6QSDFDqs6sd',
  all: 'é6&4"(6é&é"é"65qs6:;!?*Ù!azës%q£é&$&²=)&(',
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

  it('is min length', () => {
    assert.equal(IzitString(test.string).min(20).hasErrors(), false)
    assert.equal(IzitString(test.empty).min(0).hasErrors(), false)
    assert.equal(IzitString(test.empty).min(1).hasErrors(), true)
    assert.equal(IzitString(test.nbString).min(5).hasErrors(), false)
    assert.equal(IzitString(test.nbString).min(100).hasErrors(), true)
    assert.equal(IzitString(JSON.stringify(test.object)).min(10).hasErrors(), false)
    assert.equal(IzitString(test.array).min(0).hasErrors(), true)
    assert.equal(IzitString(test.object).min(0).hasErrors(), true)
    assert.equal(IzitString(test.int).min(0).hasErrors(), true)
    assert.equal(IzitString(test.float).min(0).hasErrors(), true)
    assert.equal(IzitString(true).min(0).hasErrors(), true)
  })

  it('is max length', () => {
    assert.equal(IzitString(test.string).max(100).hasErrors(), false)
    assert.equal(IzitString(test.empty).max(0).hasErrors(), false)
    assert.equal(IzitString(test.empty).max(1).hasErrors(), false)
    assert.equal(IzitString(test.nbString).max(999999).hasErrors(), false)
    assert.equal(IzitString(test.nbString).max(8).hasErrors(), true)
    assert.equal(IzitString(JSON.stringify(test.object)).max(10).hasErrors(), true)
    assert.equal(IzitString(test.array).max(99999).hasErrors(), true)
    assert.equal(IzitString(test.object).max(99999).hasErrors(), true)
    assert.equal(IzitString(test.int).max(99999).hasErrors(), true)
    assert.equal(IzitString(test.float).max(99999).hasErrors(), true)
    assert.equal(IzitString(true).max(99999).hasErrors(), true)
  })

  it('is not empty', () => {
    assert.equal(IzitString(test.string).notempty().hasErrors(), false)
    assert.equal(IzitString(test.empty).notempty().hasErrors(), true)
    assert.equal(IzitString(test.alphanum).notempty().hasErrors(), false)
    assert.equal(IzitString(test.all).notempty().hasErrors(), false)
    assert.equal(IzitString(test.nbString).notempty().hasErrors(), false)
    assert.equal(IzitString(JSON.stringify(test.object)).notempty().hasErrors(), false)
  })

  it('is alpha-numeric', () => {
    assert.equal(IzitString(test.string).alphanum().hasErrors(), true)
    assert.equal(IzitString(test.empty).alphanum().hasErrors(), true)
    assert.equal(IzitString(test.alphanum).alphanum().hasErrors(), false)
    assert.equal(IzitString(test.all).alphanum().hasErrors(), true)
    assert.equal(IzitString(test.nbString).alphanum().hasErrors(), true)
    assert.equal(IzitString(JSON.stringify(test.object)).alphanum().hasErrors(), true)
  })

  it('is email', () => {
    assert.equal(IzitString('johndoe@test.com').email().hasErrors(), false)
    assert.equal(IzitString('john-doe@test.com').email().hasErrors(), false)
    assert.equal(IzitString('john-doe@te-st.com').email().hasErrors(), false)
    assert.equal(IzitString('john-doe42@te-st.com').email().hasErrors(), false)
    assert.equal(IzitString('john_doe-42@te-st.com').email().hasErrors(), false)
    assert.equal(IzitString('jo.hn_doe-42@te-st.com').email().hasErrors(), false)
    assert.equal(IzitString('jo.hn_doe-42@te-stcom').email().hasErrors(), true)
    assert.equal(IzitString('jo.hn_doe-42te-st.com').email().hasErrors(), true)
    assert.equal(IzitString('jo.hn_doe-42te-stcom').email().hasErrors(), true)
    assert.equal(IzitString('johndoé@test.com').email().hasErrors(), false)
  })

  it('is hostname', () => {
    assert.equal(IzitString('www.test42.com').hostname().hasErrors(), false)
    assert.equal(IzitString('test42.com').hostname().hasErrors(), false)
    assert.equal(IzitString('test42').hostname().hasErrors(), false)
    assert.equal(IzitString('test-42').hostname().hasErrors(), false)
    assert.equal(IzitString('tèst42').hostname().hasErrors(), true)
    assert.equal(IzitString('test_42').hostname().hasErrors(), true)
    assert.equal(IzitString('test=42').hostname().hasErrors(), true)
    assert.equal(IzitString('test.com/pages').hostname().hasErrors(), true)
  })

  it('is url', () => {
    assert.equal(IzitString('ws://www.test-42.com').url().hasErrors(), false)
    assert.equal(IzitString('ws://www.test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('ws://www.test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('http://www.test-42.com').url().hasErrors(), false)
    assert.equal(IzitString('http://www.test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('http://www.test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('https://www.test-42.com').url().hasErrors(), false)
    assert.equal(IzitString('https://www.test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('https://www.test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('ftp://www.test-42.com').url().hasErrors(), false)
    assert.equal(IzitString('ftp://www.test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('ftp://www.test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('www.test-42.com').url().hasErrors(), false)
    assert.equal(IzitString('www.test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('www.test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('test-42.com/pages').url().hasErrors(), false)
    assert.equal(IzitString('test-42.com/pages?articles=10').url().hasErrors(), false)
    assert.equal(IzitString('test-42.com/pages?articles=10&page=2').url().hasErrors(), false)
    assert.equal(IzitString('test-42.com/pages?articles=10.test').url().hasErrors(), false)
    assert.equal(IzitString('test-42/pages?articles=10').url().hasErrors(), true)
    assert.equal(IzitString('tèst-42.com').url().hasErrors(), true)
  })

  it('is ip', () => {
    assert.equal(IzitString('199.199.0.0').ip().hasErrors(), false)
    assert.equal(IzitString('122.124.9.9').ip().hasErrors(), false)
    assert.equal(IzitString('199.199.10.0').ip().hasErrors(), false)
    assert.equal(IzitString('199.199.10.10').ip().hasErrors(), false)
    assert.equal(IzitString('119.199.110.110').ip().hasErrors(), false)
    assert.equal(IzitString('1919.199.0.0').ip().hasErrors(), true)
    assert.equal(IzitString('199.1919.0.0').ip().hasErrors(), true)
    assert.equal(IzitString('191.199.0.0/').ip().hasErrors(), true)
    assert.equal(IzitString('/199.199.0.0').ip().hasErrors(), true)
    assert.equal(IzitString('199.199.000.100').ip().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ip().hasErrors(), false)
    assert.equal(IzitString('1001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors(), false)
    assert.equal(IzitString('8001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors(), false)
    assert.equal(IzitString('é001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors(), true)
    assert.equal(IzitString('1001:0db8:85"3:0000:0000:4a6e:0710:1992').ip().hasErrors(), true)
    assert.equal(IzitString('1001:0db8:85a3:0000_0000:4a6e:0710:1992').ip().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370-7334').ip().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:03707334').ip().hasErrors(), true)
  })

  it('is ipv4', () => {
    assert.equal(IzitString('199.199.0.0').ipv4().hasErrors(), false)
    assert.equal(IzitString('122.124.9.9').ipv4().hasErrors(), false)
    assert.equal(IzitString('199.199.10.0').ipv4().hasErrors(), false)
    assert.equal(IzitString('199.199.10.10').ipv4().hasErrors(), false)
    assert.equal(IzitString('119.199.110.110').ipv4().hasErrors(), false)
    assert.equal(IzitString('1919.199.0.0').ipv4().hasErrors(), true)
    assert.equal(IzitString('199.1919.0.0').ipv4().hasErrors(), true)
    assert.equal(IzitString('191.199.0.0/').ipv4().hasErrors(), true)
    assert.equal(IzitString('/199.199.0.0').ipv4().hasErrors(), true)
    assert.equal(IzitString('199.199.000.100').ipv4().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ipv4().hasErrors(), true)
  })

  it('is ipv6', () => {
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ipv6().hasErrors(), false)
    assert.equal(IzitString('1001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors(), false)
    assert.equal(IzitString('8001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors(), false)
    assert.equal(IzitString('é001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors(), true)
    assert.equal(IzitString('1001:0db8:85"3:0000:0000:4a6e:0710:1992').ipv6().hasErrors(), true)
    assert.equal(IzitString('1001:0db8:85a3:0000_0000:4a6e:0710:1992').ipv6().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370-7334').ipv6().hasErrors(), true)
    assert.equal(IzitString('2001:0db8:85a3:0000:0000:8a2e:03707334').ipv6().hasErrors(), true)
    assert.equal(IzitString('199.199.0.0').ipv6().hasErrors(), true)
  })
})
