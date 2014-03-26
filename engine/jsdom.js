var jsdom = require('jsdom')
var computeStyles = require("../lib/compute_style.js")

module.exports = function(html, selectors, cb){
  jsdom.env(html, function(err, window){
    computeStyles(window, selectors, function(err, result){
      cb(err, result)
    })
  })
}