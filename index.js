var async = require('async')
var analyse = require("./lib/analyse")
var extractSelector = require('./lib/extract_selector')
var styleRide = require('./lib/style_ride.js')
var pd = require('pretty-data').pd
var pseudopseudo = require('pseudopseudo')
var csstext = require('csstext')

var extractStyles = function(analyzed, selector){
  var extracted = extractSelector(analyzed.sortedSelectors, selector)
  return extracted.map(function(ex){
    return analyzed.styles[ex]
  })
}

var toCss = function(selector, styles){
  var sel = pseudopseudo.restore(selector)
  var style = csstext(styles)
  return sel + "{"+ style +"}"
}

var takigyo = function(css, cb){
  var analyzed = analyse(css)
  async.map(analyzed.selectors, function(selector, next){
    var styles = extractStyles(analyzed, selector)
    var css = toCss(selector, styleRide(styles) )
    next(null, css)
  }, function(err, result){
    var css = pd.css( result.join('') )
    cb(err,css)
  })
}

module.exports = takigyo
