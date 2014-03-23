module.exports = function(selectors, funcName){
  funcName = funcName || "gcs"
  var s = selectors.map(function(sl){
    return "'" + sl + "'"
  })
  var arr = "[" + s.join(",\n") + "]"
  var callback = function(err, result){
    console.log(result)
  }
  return [
    "var arr=" + arr,
    funcName + "( arr," + callback.toString() + " )"
  ].join(";\n")
}

