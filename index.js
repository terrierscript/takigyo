var csslib = require('css')
var flatten = require('flatten')
var migawari = require('migawari')
var util = require('util')
var fs = require('fs')
var miyable = require('miyable')
var async = require('async')
var ruleReplace = require('./lib/rule_replace')
var injectJs = require('./lib/inject_js')
var pseudoReplace = require('./lib/pseudo_replace')
var csstext = require('./lib/csstext')
//var fixture = fs.readFileSync('./fixture/sample_gh.css', 'utf-8')
//var fixture = fs.readFileSync('./fixture/sample1_sg.css', 'utf-8')
var fixture = fs.readFileSync('./fixture/a.css', 'utf-8')


// On jsdom cannot compute pseudo.

// Do Takigyo!
function gyozui(cssSource){
  
  var ast = getAst(cssSource)
  var selectors = getSelectors(ast)
  var markups = createMarkup(selectors).join("\n")
  var style = csslib.stringify(ast)
  var js = [
    fs.readFileSync("./tmp/b.js"),
    injectJs(selectors)
  ].join(";\n")
  

  var html = createHtml(markups, style, js)
  console.log(html)
  
}

function takigyo(cssSource){
  var ast = getAst(cssSource)
  var selectors = getSelectors(ast)

  var markups = createMarkup(selectors).join("\n")
  var style = csslib.stringify(ast)
  
  var html = createHtml(markups, style)
  compute(html, selectors, function(err, result){
    //console.log((result))
    console.log(reparse(result))
  })
}


function createHtml(markup, style, script){
  return ["<html>"
            , "<head>"
              , "<style>" , style , "</style>"
            , "</head>"
            , "<body>"
                , markup
              , "<script>" , script , "</script>"
            , "</body>"
          , "</html>"].join("\n")
}

function compute(html, selectors, cb){
  var restored = {}
  miyable(html, selectors, function(err, result){
    Object.keys(result).forEach(function(key){
      var restore = pseudoReplace.restore(key)
      restored[restore] = result[key]
    })

    cb(err, restored)
  })
}

function reparse(result){
  var output = Object.keys(result).map(function(selector){
    var text = csstext(result[selector])
    return selector + "{" + text + "}"
  }).join("")
  return require('pretty-data').pd.css(output)
}


function getAst(cssSource){
  var ast = csslib.parse(cssSource)
  if(!ast.type == "stylesheet"){
    return
  }
  ast = ruleReplace(ast, pseudoReplace.replace)
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
//gyozui(fixture)
