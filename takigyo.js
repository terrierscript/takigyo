var pd = require('pretty-data').pd
var csstext = require('./lib/csstext')
var makeshift = require('./lib/makeshift')
var pseudoReplace = require('./lib/pseudo_replace')
var ruleReplace = require('./lib/rule_replace')

//var fixture = fs.readFileSync('./fixture/sample_gh.css', 'utf-8')
//var fixture = fs.readFileSync('./fixture/sample1_sg.css', 'utf-8')
var fs = require('fs')
var fixture = fs.readFileSync('./fixture/a.css', 'utf-8')


module.exports = takigyo = function(cssSource){
  var ms = makeshift(cssSource)
  var html = ms.html()
  ms.compute(html, ms.selectors, function(err, result){
    //console.log((result))
    console.log(toCss(result))
  })
}

function toCss(result){
  var output = Object.keys(result).map(function(selector){
    var text = csstext(result[selector])
    return selector + "{" + text + "}"
  }).join("")
  return pd.css(output)
}

takigyo(fixture)