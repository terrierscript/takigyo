var parse = require('css').parse
var flatten = require('flatten')
var sortSpecificity = require('sort-specificity')
var pseudopseudo = require("pseudopseudo")
var ruleReplacer = require('./rule_replacer')

var exposeRuleStyles = function(ast){
  var rules = ast.stylesheet.rules
  var selectorStyles = {}

  // get styles
  rules.forEach(function(rule){
    if(rule.type !== "rule") return;
    rule.selectors.forEach(function(selector){
      if(!rule.declarations) return
      var styl = {}
      rule.declarations.forEach(function(decl){
        styl[decl.property] = decl.value
      })
      selectorStyles[selector] = styl
    })
  })
  return selectorStyles
}

module.exports = function(css){
  var ast = parse(css)

  ast = ruleReplacer(ast, pseudopseudo.replace)

  var selectors = getSelectors(ast)
  selectors = sortSpecificity(selectors).reverse()

  var styles = exposeRuleStyles(ast)

  return {
    get css(){
      return css
    },
    get sortedSelectors(){
      return selectors
    },
    get selectors(){
      return selectors
    },
    get styles(){
      return styles
    }
  }
}

// filter selector from ast (to flatten)
function getSelectors(ast){
  var rules = ast.stylesheet.rules.filter(function(rule){
    return (rule.type === "rule")
  })

  var selectors = flatten(rules.map(function(rule){
    return rule.selectors
  }))

  return selectors
}
