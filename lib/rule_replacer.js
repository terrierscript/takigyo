// replace ast rule selectors with replaceFunc
module.exports = function(ast, replaceFunc){
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
