docReady(function() {
  var Spell = document.getElementById("spell");
  var Latex = document.getElementById("latex");
  var TOCItem = document.getElementById("tocItem");

  window.reset = function() {
    Spell.value = "";
    Latex.value = "";
    TOCItem.value = "";
  };

  window.convert = function() {
    var spell = parse(Spell.value);
    var latex = toLatex(spell);
    print(latex);
    printTOCItem(spell);
  };

  var parse = function(str) {
    var regex = new RegExp(/(?:(.*)\n*)?Probe: (.*)\n*\nWirkung: ((?:.|\n)*)\n*\nZauberdauer: (.*)\n*\nAsP-Kosten: (.*)\n*\nReichweite: (.*)\n*\nWirkungsdauer: (.*)\n*\nZielkategorie: (.*)\n*\nMerkmal: (.*)\n*\nVerbreitung: (.*)\n*\nSteigerungsfaktor: (.*)/g);
    var match = regex.exec(str);

    return {
      name: match[1],
      probe: match[2],
      wirkung: match[3].toWitcherPnP().simpleReplace("\n", "\\\\\n"),
      zauberdauer: match[4].toWitcherPnP(),
      kosten: match[5].toWitcherPnP(),
      reichweite: match[6].toWitcherPnP(),
      wirkungsdauer: match[7].toWitcherPnP(),
      zielkategorie: match[8].toWitcherPnP(),
      spezialisierung: match[9].toWitcherPnP(),
      verbreitung: match[10].toWitcherPnP(),
      steigungsfaktor: match[11]
    };
  };

  var toLatex = function(spell) {
    var tableStr = "\\subsection{{0}}\n" + 
    "\\label{chap:{9}}\n" +
    "\\textbf{Probe (MTW):} {1} \\\\\n" + 
    "\\textbf{Wirkung:} {2} \\\\\n" + 
    "\\textbf{Zauberdauer (ZD/ZZ):} {3} \\\\\n" + 
    "\\textbf{Mana-Kosten (MK):} {4} \\\\\n" + 
    "\\textbf{Wirkungsdauer (WD):} {5} \\\\\n" + 
    "\\textbf{Zielkategorie:} {6} \\\\\n" + 
    "\\textbf{Spezialisierung:} {7} \\\\\n" + 
    "\\textbf{Steigungsfaktor (SF):} {8}\n";

    return tableStr.format(
      spell.name,
      spell.probe,
      spell.wirkung,
      spell.zauberdauer,
      spell.kosten,
      spell.wirkungsdauer,
      spell.zielkategorie,
      spell.spezialisierung,
      spell.steigungsfaktor,
      spell.name.toLatexLabel()
    );
  };

  var printTOCItem = function(spell) {
    TOCItem.value = getTOCItem(spell);
  };

  var getTOCItem = function(spell) {
    var tocItem = "\\textbf{{0}} & ???. Kapitel \\ref{chap:{1}} \\\\ \\hline\n";
    return tocItem.format(
      spell.name,
      spell.name.toLatexLabel()
    );
  }

  var print = function(str) {
    Latex.value = str || "nichts angegeben";
  };
});
