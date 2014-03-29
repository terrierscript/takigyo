var fs = require('fs')
var assert = require('assert')
var analyse = require('../lib/analyse')
var css = fs.readFileSync('./fixture/analyser.css', 'utf-8')

describe("", function(){
  var analyzed = analyse(css)
  it("css", function(){
    assert.equal(analyzed.css, css)
  })
  it("styles", function(){
    console.log(analyzed.styles)
  })
})
