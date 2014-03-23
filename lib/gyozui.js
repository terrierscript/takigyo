// generate browser computing html
var makeshift = require('./lib/makeshift')

module.exports = function(cssSource){
  var ms = makeshift(cssSource)
  var js = [
    fs.readFileSync("./tmp/b.js"), // todo browserify
    injectJs(selectors)
  ].join(";\n")
  
  var html = ms.html(js)
  
  return html
}