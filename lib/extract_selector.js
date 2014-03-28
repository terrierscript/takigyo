var migawari = require('migawari')
var CSSselect = require('CSSselect')
var makedom = require("htmlparser2").parseDOM;
var flatten = require('flatten')

module.exports = function(sortedSelectors, selector){
  var html = migawari(selector)
  var dom = makedom(html)
  var extracted = sortedSelectors.filter(function(s){
    return (CSSselect.selectOne(s, dom) !== null)
  })
  return flatten(extracted)
}
