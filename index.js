var async = require('async')
var analyse = require("./lib/analyse")
var rework = require("rework")
var selecollide = require("selecollide")
var styleRide = require('./lib/style_ride.js')
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
  var extractedMap = selecollide(analyzed.sortedSelectors, {speed: true})

  var overrided = analyzed.sortedSelectors.map(function(selector){
    override = extractedMap[selector]
    override.unshift(selector)
    // 順序ちょっと怪しい。
    var styles = extractStyles(analyzed, override)
    var s = styleRide(styles)

    css = toCss(selector,  s)
    return css
  }).join("\n")
  cb(null, overrided)
}

module.exports = takigyo
