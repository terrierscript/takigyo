var css = require('css')
var flatten = require('flatten')
var migawari = require('migawari')
var util = require('util')
var fs = require('fs')
var gcs = require('gcs')
var ruleReplace = require('./lib/rule_replace')
//var fixture = fs.readFileSync('./fixture/sample_gh.css', 'utf-8')
var fixture = fs.readFileSync('./fixture/sample1_sg.css', 'utf-8')

var PSEUDO_REPLACEMENT = ".__pseudopseudopseudopseudo__"

function replaceFunc(selector){
  return selector.replace(/:/g, PSEUDO_REPLACEMENT)
}

function takigyo(cssSource){
  var ast = getAst(cssSource)
  var selectors = getSelectors(ast)
  var markups = createMarkup(selectors)
  var html = createHtml(markups, css.stringify(ast))
  
  gcs(html, selectors, function(err, result){
    var reg = new RegExp(PSEUDO_REPLACEMENT, "g")
    Object.keys(result).forEach(function(key){
      var restore = key.replace(reg, ":")
      result[restore] = result[key]
      delete result[key]
    })
    console.log(result)
  })

}
function createHtml(markups, style){
 
  return ["<html>"
            , "<head>"
              , "<style>"
                , style
              , "</style>"
            , "</head>"
            , "<body>"
              , markups.join("\n")
            , "</body>"
          , "</html>"].join("\n")
}


function getAst(cssSource){
  var ast = css.parse(cssSource)
  if(!ast.type == "stylesheet"){
    return
  }
  ast = ruleReplace(ast, replaceFunc)
  return ast
}

function getSelectors(ast){
  
  var rules = ast.stylesheet.rules.filter(function(rule){
    return (rule.type === "rule")
  })

  var selectors = flatten(rules.map(function(rule){
    return rule.selectors
  }))

  return selectors
}

function createMarkup(selectors){
  var markups = selectors.map(function(selector){
    return migawari(selector)
  })
  return markups
}

takigyo(fixture)
