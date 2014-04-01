var migawari = require('migawari')
var CSSselect = require('CSSselect')
var makedom = require("htmlparser2").parseDOM;
var flatten = require('flatten')

// bottle neck...
module.exports = function(sortedSelectors, selector){
  var dom = migawari.domtree(selector)
  var extracted = sortedSelectors.filter(function(s){
    if(selector === s) return false;
    return (CSSselect.selectOne(s, dom) !== null)
  })
  return flatten(extracted)
}
