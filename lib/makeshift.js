var flatten = require('flatten')
var csslib = require('css')
var migawari = require('migawari')

var pseudoReplace = require('./pseudo_replace')
var ruleReplace = require('./rule_replace')

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

module.exports = function(cssSource){
  var ast = getAst(cssSource)
  var selectors = getSelectors(ast)
  var markups = createMarkup(selectors).join("\n")
  var style = csslib.stringify(ast)

  return {
    ast : ast,
    selectors : selectors,
    html : function(injectScript){
      return createHtml(markups, style, injectScript)
    }
  }
}