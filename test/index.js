var fs = require('fs')
var takigyo = require('../index.js')
var pd = require('pretty-data').pd

var css = fs.readFileSync('./fixture/sample_gh.css', 'utf-8')
//var css = fs.readFileSync('./fixture/sample1_sg.css', 'utf-8')
//var css = fs.readFileSync('./fixture/a.css', 'utf-8')
//var css = fs.readFileSync('./fixture/cp.css', 'utf-8')


describe("", function(){
  takigyo(css, function(err, result){
    console.log(pd.css(result))
  })
})
