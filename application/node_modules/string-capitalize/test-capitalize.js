
var assert = require('assert')
  , capitalize = require('./index.js')

describe('capitalize(string)', function(){
  it('capitalizes words', function(){
    assert.equal(capitalize('word'), 'Word')
  })

  it('capitalizes phrases', function(){
    assert.equal(capitalize('word up'), 'Word up')
  })

  it('capitalizes all caps', function(){
    assert.equal(capitalize('WORD UP'), 'Word up')
  })

  it('handles bad input gracefully', function(){
    assert.equal(capitalize(), '')
    assert.equal(capitalize(''), '')
    assert.equal(capitalize(null), '')
    assert.equal(capitalize(undefined), '')
  })
})
