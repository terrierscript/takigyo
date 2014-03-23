var PSEUDO_REPLACEMENT_PLEFIX = "pseudopseudopseudopseudo"
var PSEUDO_REPLACEMENTS = {
  ":" : "c",
  "(" : "lc",
  ")" : "r",
  "@" : "at", // not pseudo....
}
function replacedClass(glyph){
  return ".__" + PSEUDO_REPLACEMENT_PLEFIX + "__" + PSEUDO_REPLACEMENTS[glyph] + "___";
}

function replacePseudoFunc(str){
  for(var glyph in PSEUDO_REPLACEMENTS){
    var replaced = replacedClass(glyph)
    str = str.split(glyph).join(replaced)
  }
  return str
}

function restorePseudoFunc(str){
  for(var glyph in PSEUDO_REPLACEMENTS){
    var replaced = replacedClass(glyph)
    str = str.split(replaced).join(glyph)
  }
  return str
}


module.exports = {
  replace : replacePseudoFunc,
  restore : restorePseudoFunc
}