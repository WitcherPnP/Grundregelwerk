docReady(function() {
  var Spell = document.getElementById("spell");
  var Latex = document.getElementById("latex");

  window.reset = function() {
    Spell.value = "";
    Latex.value = "";
  };

  window.convert = function() {
    var spell = parse(Spell.value);
    var latex = toLatex(spell);
    print(latex);
  };

  var parse = function(str) {
    var regex = new RegExp(/Probe: (.*)\nWirkung: (.*)\nZauberdauer: (.*)\nAsP-Kosten: (.*)\nReichweite: (.*)\nWirkungsdauer: (.*)\nZielkategorie: (.*)\nMerkmal: (.*)\nVerbreitung: (.*)\nSteigerungsfaktor: (.*)/g);
    var match = regex.exec(str);

    return {
      probe: match[1].toWitcherPnP(),
      wirkung: match[2].toWitcherPnP(),
      zauberdauer: match[3].toWitcherPnP(),
      kosten: match[4].toWitcherPnP(),
      reichweite: match[5].toWitcherPnP(),
      wirkungsdauer: match[6].toWitcherPnP(),
      zielkategorie: match[7].toWitcherPnP(),
      spezialisierung: match[8].toWitcherPnP()
    };
  };

  var toLatex = function(spell) {
    var tableStr = "";

    return tableStr.format();
  };

  var print = function(str) {
    Latex.value = str || "nichts angegeben";
  };
});
