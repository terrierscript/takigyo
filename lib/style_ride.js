var defaults = require('defaults')
var merge = require('merge')
module.exports = function(styles){
  var style = {}
  var importants = styles.filter(function(s){
    return /\!important/.test(s)
  })
  styles.forEach(function(s){
    style = defaults(s, style)
  })
  importants.forEach(function(s){
    style = merge(s, style)
  })
  return style
}
