var qs = require('querystring')
// parse cssText and sorted property csstext
module.exports = function(cssText){
  var parsed =  qs.parse(cssText,";", ":")
  // trim
  var a = Object.keys(parsed).sort().filter(function(key){
    return (key !== '')
  }).map(function(key){
    var value = parsed[key]
    if(typeof value == "string"){
      value = value.trim()
    }
    key = key.trim()
    return key + ":" + value
  }).join(";")
  return a
}