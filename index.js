var async = require('async')
var analyse = require("./lib/analyse")
var selecollide = require("selecollide")
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
  var extracted = selecollide(analyzed.sortedSelectors)

  var overrided = Object.keys(extracted).map(function(selector){
    override = extracted[selector]
    override.push(selector)
    // 順序ちょっと怪しい。
    var styles = extractStyles(analyzed, override)
    var s = styleRide(styles)

    css = toCss(selector,  s)

    return css
  }).join("\n")

  cb(null, pd.css(overrided))
}

module.exports = takigyo
