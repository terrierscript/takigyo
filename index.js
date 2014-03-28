var async = require('async')
var analyse = require("./lib/analyse")
var extractSelector = require('./lib/extract_selector')
var styleRide = require('./lib/style_ride.js')
var pd = require('pretty-data').pd
var extractStyles = function(analyzed, selector){
  var extracted = extractSelector(analyzed.sortedSelectors, selector)
  return extracted.map(function(ex){
    var decl = analyzed.styleDeclarations[ex]
    var obj = {}
    decl.forEach(function(d){
      obj[d.property] = d.value
    })
    return obj
  })
}

var cssStringify = function(obj){
  var cssqs = require('querystring')
  // no escape
  cssqs.escape = function(str){
    return str
  }
  return cssqs.stringify(obj, ";", ":")
}
var toCss = function(selector, styles){
  return selector + "{"+ cssStringify(styles)+"}"
}

module.exports = function(css, cb){
  var analyzed = analyse(css)
  async.map(analyzed.selectors, function(selector, next){
    var styles = extractStyles(analyzed, selector)
    var css = toCss(selector, styleRide(styles) )
    next(null, css)
  }, function(err, result){
    var css = pd.css(result.join('\n') )
    cb(err,css)
  })
}
