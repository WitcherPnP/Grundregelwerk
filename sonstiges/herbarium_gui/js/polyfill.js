// Polyfills
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

if (!String.prototype.toLatexLabel) {
  String.prototype.toLatexLabel = function() {
    var args = arguments;
    return this.toLowerCase().replace(/ä|ö|ü|ß| /g, function(match, number) { 
      if (match === "ä") return "ae";
      else if (match === "ö") return "oe";
      else if (match === "ü") return "ue";
      else if (match === "ß") return "ss";
      else if (match === " ") return "_";
    });
  };
}

if (!String.prototype.toLatexBreaks) {
  String.prototype.simpleReplace = function(str, value) {
    return this.replace(new RegExp("("+str+")", "g"), function(match, number) { 
      return value;
    });
  };
}

if (!String.prototype.toWitcherPnP) {
  String.prototype.toWitcherPnP = function() {
    return this.replace(/AsP|LeP|Schritt|parieren|&|%|PA|LE|Meister|Stein|AT/g, function(match, number) {
      if (match === "AsP") return "MP";
      else if (match === "LeP") return "LP";
      else if (match === "Schritt") return "Meter";
      else if (match === "parieren") return "blocken";
      else if (match === "&") return "\\&";
      else if (match === "%") return "\\%";
      else if (match === "PA") return "BL";
      else if (match === "LE") return "Lebensenergie";
      else if (match === "Meister") return "SL";
      else if (match === "Stein") return "Kilogramm";
      else if (match === "AT") return "TP";
    });
  };
}