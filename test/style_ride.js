var stylay = require("../lib/style_ride")
var assert = require("assert")


describe("", function(){
  it("default", function(){
    var result = stylay([
      {"color":"red"},
      {"color":"blue"}
    ])
    expect = {"color" : "blue"}
    assert.deepEqual(result, expect)
  })
  it("fucky important", function(){
    var result = stylay([
      {"color":"red !important"},
      {"color":"blue"}
    ])
    expect = {"color" : "red !important"}
    assert.deepEqual(result, expect)
  })

})
