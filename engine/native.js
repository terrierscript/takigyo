var computeStyles = require("../lib/compute_style.js")

module.exports = function(html, selectors, cb){
  computeStyles(window, selectors, function(err, result){
    cb(err, result)
  })
}