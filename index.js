var analyse = require("./lib/analyse")
var pseudopseudo = require("pseudopseudo")
var CSSselect = require('CSSselect')
var makedom = require("htmlparser2").parseDOM;
var async = require('async')
var migawari = require('migawari')
var util = require('util')
var merge = require('defaults')
var flatten = require('flatten')

var extractStyles = function(analyzed, selector){
  var html = migawari(selector)
  var dom = makedom(html)
  var styles = []
  analyzed.sortedSelectors.forEach(function(s){
    if(CSSselect.selectOne(s, dom) == null){
      return
    }
    // override style
    var styl = analyzed.styleDeclarations[selector]
    styles.push(styl)

  })
  return flatten(styles)
}

module.exports = function(css){
  var analyzed = analyse(css)
  async.map(analyzed.selectors, function(selector, next){
    var s = extractStyles(analyzed, selector)
    next(null,{"selector" : selector, styles : s})
  }, function(err, result){
    console.log(result)
  })
}
