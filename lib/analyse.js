var parse = require('css').parse
var flatten = require('flatten')
var sortSpecificity = require('sort-specificity')
var pseudopseudo = require("pseudopseudo")
var ruleReplacer = require('./rule_replacer')
var traverse = require('traverse')

var exposeRuleStyles = function(ast){
  var decls = {}
  traverse(ast).get(["stylesheet", "rules"]).forEach(function(item){
    var selectors = item.selectors
    var styles = {}
    traverse(item).get(["declarations"]).map(function(decl){
      styles[decl["property"]] = decl["value"]
    })
    selectors.forEach(function(sel){
      decls[sel] = styles
    })
  })
  return decls
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
