var async = require('async')
var analyse = require("./lib/analyse")
var extractSelector = require('./lib/extract_selector')
var styleRide = require('./lib/style_ride.js')
var pd = require('pretty-data').pd
var pseudopseudo = require('pseudopseudo')
var csstext = require('csstext')

var extractStyles = function(analyzed, selectors){
  return selectors.map(function(ex){
    return analyzed.styles[ex]
  })
}

var toCss = function(selector, styles){
  var sel = pseudopseudo.restore(selector)
  var style = csstext.stringify(styles)
  return sel + "{"+ style +"}"
}

var takigyo = function(css, cb){
  var analyzed = analyse(css)
  async.map(analyzed.selectors, function(selector, next){
    //var styles = extractStyles(analyzed, selector)
    //var css = toCss(selector, styleRide(styles) )
    var extracted = extractSelector(analyzed.sortedSelectors, selector)
    var obj = {}
    next(null, {
      selector : selector,
      override : extracted
    })
  }, function(err, hits){
    var css = hits.map(function(item){
      var selector = item["selector"]
      var override = item["override"]
      var styles = extractStyles(analyzed, override)
      return toCss(selector, styleRide(styles) )
    }).join("\n")
    css = pd.css(css)
    cb(err, css)
  })
}

module.exports = takigyo
