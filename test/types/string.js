'use strict'

const IzitString = require('../../lib/types/string')
const assert = require('chai').assert

const tests = {
  empty: '',
  string: 'id Is a random string write to do tests!',
  alphanum: 'fds654FDS65qs4dqSD98v7xcqSDQ6QSDFDqs6sd',
  all: 'é6&4"(6é&é"é"65qs6:;!?*Ù!azës%q£é&$&²=)&(',
  nbString: '125.045'
}

describe('IzitString', () => {
  it('.string()', () => {
    // Valids
    assert.isFalse(IzitString(tests.empty).hasErrors())
    assert.isFalse(IzitString(tests.string).hasErrors())
    assert.isFalse(IzitString(tests.alphanum).hasErrors())
    assert.isFalse(IzitString(tests.all).hasErrors())
    assert.isFalse(IzitString(tests.nbString).hasErrors())
    assert.isFalse(IzitString(JSON.stringify(['Is', 'Medium', 'Array', 'Guys', '!', 'id'])).hasErrors())

    // Errors
    assert.isTrue(IzitString(['Is', 'Medium', 'Array', 'Guys', '!', 'id']).hasErrors())
    assert.isTrue(IzitString({ id: 'is_id', value: 'is_value', list: ['test', 'test'] }).hasErrors())
    assert.isTrue(IzitString(12550).hasErrors())
    assert.isTrue(IzitString(1005.2458).hasErrors())
    assert.isTrue(IzitString(true).hasErrors())
  })

  it('.minlength(length)', () => {
    // Valids
    assert.isFalse(IzitString(tests.empty).minlength(0).hasErrors())
    assert.isFalse(IzitString(tests.string).minlength(40).hasErrors())
    assert.isFalse(IzitString(tests.nbString).minlength(7).hasErrors())
    assert.isFalse(IzitString(tests.nbString).minlength(2).hasErrors())

    // Errors
    assert.isTrue(IzitString(tests.empty).minlength(1).hasErrors())
    assert.isTrue(IzitString(tests.string).minlength(41).hasErrors())
    assert.isTrue(IzitString(tests.nbString).minlength(8).hasErrors())
  })

  it('.maxlength(length)', () => {
    // Valids
    assert.isFalse(IzitString(tests.empty).maxlength(0).hasErrors())
    assert.isFalse(IzitString(tests.string).maxlength(40).hasErrors())
    assert.isFalse(IzitString(tests.nbString).maxlength(7).hasErrors())
    assert.isFalse(IzitString(tests.nbString).maxlength(10).hasErrors())

    // Errors
    assert.isTrue(IzitString(tests.string).maxlength(32).hasErrors())
    assert.isTrue(IzitString(tests.nbString).maxlength(5).hasErrors())
  })

  it('.length(length)', () => {
    // Valids
    assert.isFalse(IzitString(tests.empty).length(0).hasErrors())
    assert.isFalse(IzitString(tests.string).length(40).hasErrors())
    assert.isFalse(IzitString(tests.nbString).length(7).hasErrors())

    // Errors
    assert.isTrue(IzitString(tests.empty).length(1).hasErrors())
    assert.isTrue(IzitString(tests.string).length(41).hasErrors())
    assert.isTrue(IzitString(tests.nbString).length(8).hasErrors())
  })

  it('.notempty()', () => {
    // Valids
    assert.isFalse(IzitString(tests.string).notempty().hasErrors())
    assert.isFalse(IzitString(tests.alphanum).notempty().hasErrors())
    assert.isFalse(IzitString(tests.all).notempty().hasErrors())
    assert.isFalse(IzitString(tests.nbString).notempty().hasErrors())

    // Errors
    assert.isTrue(IzitString(tests.empty).notempty().hasErrors())
  })

  it('.alphanum()', () => {
    // Valids
    assert.isFalse(IzitString(tests.alphanum).alphanum().hasErrors())

    // Errors
    assert.isTrue(IzitString(tests.empty).alphanum().hasErrors())
    assert.isTrue(IzitString(tests.string).alphanum().hasErrors())
    assert.isTrue(IzitString(tests.all).alphanum().hasErrors())
    assert.isTrue(IzitString(tests.nbString).alphanum().hasErrors())
  })

  it('.lowercase()', () => {
    // Valids
    assert.isFalse(IzitString('helloworld').lowercase().hasErrors())

    // Errors
    assert.isTrue(IzitString('HelloWorld').lowercase().hasErrors())
    assert.isTrue(IzitString('hello world').lowercase().hasErrors())
    assert.isTrue(IzitString('hello-world').lowercase().hasErrors())
    assert.isTrue(IzitString('0').lowercase().hasErrors())
    assert.isTrue(IzitString('').lowercase().hasErrors())
  })

  it('.uppercase()', () => {
    // Valids
    assert.isFalse(IzitString('HELLOWORLD').uppercase().hasErrors())

    // Errors
    assert.isTrue(IzitString('HelloWorld').uppercase().hasErrors())
    assert.isTrue(IzitString('HELLO WORLD').uppercase().hasErrors())
    assert.isTrue(IzitString('HELLO-WORLD').uppercase().hasErrors())
    assert.isTrue(IzitString('0').uppercase().hasErrors())
    assert.isTrue(IzitString('').uppercase().hasErrors())
  })

  it('.numeric()', () => {
    // Valids
    assert.isFalse(IzitString('122').numeric().hasErrors())
    assert.isFalse(IzitString('122.4545').numeric().hasErrors())
    assert.isFalse(IzitString('0').numeric().hasErrors())
    assert.isFalse(IzitString('0.1014').numeric().hasErrors())

    // Errors
    assert.isTrue(IzitString('HelloWorld').numeric().hasErrors())
    assert.isTrue(IzitString('00.41.78.61.47').numeric().hasErrors())
    assert.isTrue(IzitString('john56').numeric().hasErrors())
  })

  it('.numinteger()', () => {
    // Valids
    assert.isFalse(IzitString('122').numinteger().hasErrors())
    assert.isFalse(IzitString('1224545').numinteger().hasErrors())
    assert.isFalse(IzitString('0').numinteger().hasErrors())

    // Errors
    assert.isTrue(IzitString('HelloWorld').numinteger().hasErrors())
    assert.isTrue(IzitString('00.41.78.61.47').numinteger().hasErrors())
    assert.isTrue(IzitString('john56').numinteger().hasErrors())
    assert.isTrue(IzitString('45.7878').numinteger().hasErrors())
    assert.isTrue(IzitString('0.4545').numinteger().hasErrors())
  })

  it('.numfloat()', () => {
    // Valids
    assert.isFalse(IzitString('124452.4488').numfloat().hasErrors())
    assert.isFalse(IzitString('1.22454524').numfloat().hasErrors())
    assert.isFalse(IzitString('0.00045').numfloat().hasErrors())

    // Errors
    assert.isTrue(IzitString('HelloWorld').numfloat().hasErrors())
    assert.isTrue(IzitString('00.41.78.61.47').numfloat().hasErrors())
    assert.isTrue(IzitString('john56').numfloat().hasErrors())
    assert.isTrue(IzitString('457878').numfloat().hasErrors())
    assert.isTrue(IzitString('1').numfloat().hasErrors())
  })

  it('.email()', () => {
    // Valids
    assert.isFalse(IzitString('johndoe@test.com').email().hasErrors())
    assert.isFalse(IzitString('john-doe@test.com').email().hasErrors())
    assert.isFalse(IzitString('john-doe@te-st.com').email().hasErrors())
    assert.isFalse(IzitString('john-doe42@te-st.com').email().hasErrors())
    assert.isFalse(IzitString('john_doe-42@te-st.com').email().hasErrors())
    assert.isFalse(IzitString('jo.hn_doe-42@te-st.com').email().hasErrors())
    assert.isFalse(IzitString('johndoé@test.com').email().hasErrors())

    // Errors
    assert.isTrue(IzitString('jo.hn_doe-42@te-stcom').email().hasErrors())
    assert.isTrue(IzitString('jo.hn_doe-42te-st.com').email().hasErrors())
    assert.isTrue(IzitString('jo.hn_doe-42te-stcom').email().hasErrors())
  })

  it('.hostname()', () => {
    // Valids
    assert.isFalse(IzitString('www.test42.com').hostname().hasErrors())
    assert.isFalse(IzitString('test42.com').hostname().hasErrors())
    assert.isFalse(IzitString('test42').hostname().hasErrors())
    assert.isFalse(IzitString('test-42').hostname().hasErrors())

    // Errors
    assert.isTrue(IzitString('tèst42').hostname().hasErrors())
    assert.isTrue(IzitString('test_42').hostname().hasErrors())
    assert.isTrue(IzitString('test=42').hostname().hasErrors())
    assert.isTrue(IzitString('test.com/pages').hostname().hasErrors())
  })

  it('.url()', () => {
    // Valids
    assert.isFalse(IzitString('ws://www.test-42.com').url().hasErrors())
    assert.isFalse(IzitString('ws://www.test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('ws://www.test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('http://www.test-42.com').url().hasErrors())
    assert.isFalse(IzitString('http://www.test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('http://www.test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('https://www.test-42.com').url().hasErrors())
    assert.isFalse(IzitString('https://www.test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('https://www.test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('ftp://www.test-42.com').url().hasErrors())
    assert.isFalse(IzitString('ftp://www.test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('ftp://www.test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('www.test-42.com').url().hasErrors())
    assert.isFalse(IzitString('www.test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('www.test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('test-42.com/pages').url().hasErrors())
    assert.isFalse(IzitString('test-42.com/pages?articles=10').url().hasErrors())
    assert.isFalse(IzitString('test-42.com/pages?articles=10&page=2').url().hasErrors())
    assert.isFalse(IzitString('test-42.com/pages?articles=10.test').url().hasErrors())

    // Errors
    assert.isTrue(IzitString('test-42/pages?articles=10').url().hasErrors())
    assert.isTrue(IzitString('test@42').url().hasErrors())
    assert.isTrue(IzitString('test-42|com').url().hasErrors())
    assert.isTrue(IzitString('tèst-42.com').url().hasErrors())
  })

  it('.ip()', () => {
    // Valids
    assert.isFalse(IzitString('199.199.0.0').ip().hasErrors())
    assert.isFalse(IzitString('122.124.9.9').ip().hasErrors())
    assert.isFalse(IzitString('199.199.10.0').ip().hasErrors())
    assert.isFalse(IzitString('199.199.10.10').ip().hasErrors())
    assert.isFalse(IzitString('119.199.110.110').ip().hasErrors())
    assert.isFalse(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ip().hasErrors())
    assert.isFalse(IzitString('1001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors())
    assert.isFalse(IzitString('8001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors())

    // Errors
    assert.isTrue(IzitString('1919.199.0.0').ip().hasErrors())
    assert.isTrue(IzitString('199.1919.0.0').ip().hasErrors())
    assert.isTrue(IzitString('191.199.0.0/').ip().hasErrors())
    assert.isTrue(IzitString('/199.199.0.0').ip().hasErrors())
    assert.isTrue(IzitString('199.199.000.100').ip().hasErrors())
    assert.isTrue(IzitString('é001:0db8:85a3:0000:0000:4a6e:0710:1992').ip().hasErrors())
    assert.isTrue(IzitString('1001:0db8:85"3:0000:0000:4a6e:0710:1992').ip().hasErrors())
    assert.isTrue(IzitString('1001:0db8:85a3:0000_0000:4a6e:0710:1992').ip().hasErrors())
    assert.isTrue(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370-7334').ip().hasErrors())
    assert.isTrue(IzitString('2001:0db8:85a3:0000:0000:8a2e:03707334').ip().hasErrors())
  })

  it('.ipv4()', () => {
    // Valids
    assert.isFalse(IzitString('199.199.0.0').ipv4().hasErrors())
    assert.isFalse(IzitString('122.124.9.9').ipv4().hasErrors())
    assert.isFalse(IzitString('199.199.10.0').ipv4().hasErrors())
    assert.isFalse(IzitString('199.199.10.10').ipv4().hasErrors())
    assert.isFalse(IzitString('119.199.110.110').ipv4().hasErrors())

    // Errors
    assert.isTrue(IzitString('1919.199.0.0').ipv4().hasErrors())
    assert.isTrue(IzitString('199.1919.0.0').ipv4().hasErrors())
    assert.isTrue(IzitString('191.199.0.0/').ipv4().hasErrors())
    assert.isTrue(IzitString('/199.199.0.0').ipv4().hasErrors())
    assert.isTrue(IzitString('199.199.000.100').ipv4().hasErrors())
    assert.isTrue(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ipv4().hasErrors())
  })

  it('.ipv6()', () => {
    // Valids
    assert.isFalse(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370:7334').ipv6().hasErrors())
    assert.isFalse(IzitString('1001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors())
    assert.isFalse(IzitString('8001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors())

    // Errors
    assert.isTrue(IzitString('é001:0db8:85a3:0000:0000:4a6e:0710:1992').ipv6().hasErrors())
    assert.isTrue(IzitString('1001:0db8:85"3:0000:0000:4a6e:0710:1992').ipv6().hasErrors())
    assert.isTrue(IzitString('1001:0db8:85a3:0000_0000:4a6e:0710:1992').ipv6().hasErrors())
    assert.isTrue(IzitString('2001:0db8:85a3:0000:0000:8a2e:0370-7334').ipv6().hasErrors())
    assert.isTrue(IzitString('2001:0db8:85a3:0000:0000:8a2e:03707334').ipv6().hasErrors())
    assert.isTrue(IzitString('199.199.0.0').ipv6().hasErrors())
  })

  it('.equal()', () => {
    // Valids
    assert.isFalse(IzitString('aaa').equal('aaa').hasErrors())
    assert.isFalse(IzitString('123').equal('123').hasErrors())
    assert.isFalse(IzitString('1a2b3c').equal('1a2b3c').hasErrors())

    // Errors
    assert.isTrue(IzitString('zzzz').equal('zzz').hasErrors())
    assert.isTrue(IzitString('yyyy').equal('yyyz').hasErrors())
    assert.isTrue(IzitString('aaa').equal(['aaa']).hasErrors())
    assert.isTrue(IzitString('aaa').equal({ aaa: 'aaa' }).hasErrors())
  })
})
