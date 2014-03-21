var clone = require('clone')
module.exports = function(source, replaceFunc){
  var ast = clone(source)
  ast.stylesheet.rules.forEach(function(rule, i){
    if(rule && rule.selectors){
      var selectors = rule.selectors
      rule.rawSelectors = selectors
      rule.selectors = selectors.map(function(selector){
        return replaceFunc(selector)
      })
      ast.stylesheet.rules[i] = rule

    }
  })
  return ast
}