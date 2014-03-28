var parse = require('css').parse
var flatten = require('flatten')
var sortSpecificity = require('miyable/lib/sort_specificity')
var ruleReplace = require('./rule_replace')


module.exports = function(css){
  var ast = parse(css)
  var rules = ast.stylesheet.rules
  var selectorStyles = {}
  var selectors = getSelectors(ast)
  selectors = sortSpecificity(selectors).reverse()

  // get styles
  rules.forEach(function(rule){
    if(rule.type !== "rule") return;
    rule.selectors.forEach(function(selector){
      selectorStyles[selector] = rule.declarations
    })
  })
  return {
    get css(){
      return css
    },
    get ast(){
      return ast
    },
    get sortedSelectors(){
      return selectors
    },
    get selectors(){
      return selectors
    },
    get rules(){
      return rules
    },
    get styleDeclarations(){
      return selectorStyles
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
