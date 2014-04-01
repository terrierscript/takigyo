var fs = require('fs')
var assert = require('assert')
var analyse = require('../lib/analyse')
var css = fs.readFileSync('./fixture/analyser.css', 'utf-8')

describe("analyze", function(){
  var analyzed = analyse(css)
  it("css has raw css", function(){
    assert.equal(analyzed.css, css)
  })
  it("styles", function(){
    expect = {
      '.rank_item .rank_body': { margin: '0.2em 0', color: 'red' },
      '.rank_item > .rank_body': { margin: '0.2em 0', color: 'blue' },
      '.rank_item + .rank_body': { margin: '0.2em 0', color: 'yellow' }
    }
    assert.deepEqual(
      expect, analyzed.styles
    )
  })
})
