var jsdom = require('jsdom')
var computeStyles = require("../lib/compute_style.js")
var cheerio = require('cheerio')
var sortSpecificity = require('../lib/sort_specificity')
var parse = require('css').parse


module.exports = function(html, selectors, cb){
  var $ = cheerio.load(html)

  // expose style
  var rules = parse($("style").text()).stylesheet.rules // BAD
  var selectorStyles = {}
  rules.forEach(function(rule){
    if(rule.type !== "rule") return;
    rule.selectors.forEach(function(selector){
      selectorStyles[selector] = rule.declarations
    })
  })
  // applicate style
  selectors = sortSpecificity(selectors).reverse() // BAD
  
  selectors.forEach(function(selector){
    var styles = selectorStyles[selector]
    if(!styles) return
    $(selector).each(function(){
      var self = this
      styles.forEach(function(style){
        $(self).css(style.property, style.value)
      })
    })
  })
  // import
  selectors.forEach(function(selector){
    var styles = selectorStyles[selector]
    if(!styles) return
    $(selector).each(function(){
      var self = this
      styles.forEach(function(style){
        if(/\!important/.test(style.value)){
          $(self).css(style.property, style.value)
        }
      })
    })
  })


  // get styles
  var result = {}
  selectors.forEach(function(selector){
    result[selector] = $(selector).css()
  })

  cb(null, result)

}