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

docReady(function() {
  var Name = document.getElementById("name");
  var Beschreibung = document.getElementById("beschreibung");
  var Hauptwirkstoff = document.getElementById("hwirkstoff");
  var Sekundärwirkstoff = document.getElementById("swirkstoff");
  var Farbe = document.getElementById("farbe");
  var Geruch = document.getElementById("geruch");
  var Geschmack = document.getElementById("geschmack");
  var Spezialeigenschaften = document.getElementById("spezialeigenschaften");
  var SpezialeigenschaftenIsMultiline = document.getElementById("spezialeigenschaftenIsMultiline");
  var Probe = document.getElementById("probe");
  var Menge = document.getElementById("menge");
  var Vorkommen = document.getElementById("vorkommen");
  var VorkommenIsMultiline = document.getElementById("vorkommenIsMultiline");
  var Region = document.getElementById("region");
  var RegionIsMultiline = document.getElementById("regionIsMultiline");
  var Wert = document.getElementById("wert");
  var Utensilien = document.getElementById("utensilien");
  var UtensilienIsMultiline = document.getElementById("utensilienIsMultiline");
  var Latex = document.getElementById("latex");

  window.resetAll = function() {
    Name.value = "";
    Beschreibung.value = "";
    Hauptwirkstoff.value = "";
    Sekundärwirkstoff.value = "";
    Farbe.value = "";
    Geruch.value = "";
    Geschmack.value = "";
    Spezialeigenschaften.value = "";
    SpezialeigenschaftenIsMultiline.checked = false;
    Probe.value = "";
    Menge.value = "1 pro Pflanze";
    Vorkommen.value = "";
    VorkommenIsMultiline.checked = false;
    Region.value = "überall";
    RegionIsMultiline.checked = false;
    Wert.value = "";
    Utensilien.value = "";
    UtensilienIsMultiline.checked = false;
    Latex.value = "";
  }

  window.convertTable = function() {
    if (Name.value) {
      Latex.value = getTable();
    } else {
      alert("Bitte gebe den Namen der Ingredienz an.");
    }
  }

  window.convertAll = function() {
    if (Name.value) {
      Latex.value = getAll();
    } else {
      alert("Bitte gebe den Namen der Ingredienz an.");
    }
  }

  function getAll() {
    var latexStr = "\\subsection{{0}}\n{1}\n\n".format(
      Name.value, 
      Beschreibung.value || "\\textit{Keine Beschreibung vorhanden.}"
    );

    return latexStr + getTable();
  }

  function getTable() {
    var tableStr = "\\begin{table}[h] \n\
\\begin{center} \n\
\\begin{tabular}{|l|l|p{1cm}|l|l|} \n\
  \t\\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Hauptwirkstoff} & {0} && \\textbf{Pflückprobe} & {6} \\\\ \\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Sekundärwirkstoff} & {1} && \\textbf{Menge} & {7} \\\\ \\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Farbe} & {2} && \\textbf{Vorkommen} & {8} \\\\ \\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Geruch} & {3} && \\textbf{Region} & {9} \\\\ \\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Geschmack} & {4} && \\textbf{Wert} & {10} \\\\ \\cline{1-2} \\cline{4-5} \n\
  \t\\textbf{Spezialeigenschaften} & {5} && \\textbf{Utensilien} & {11} \\\\ \\cline{1-2} \\cline{4-5} \n\
\\end{tabular} \n\
\\end{center} \n\
\\caption{{12}} \n\
\\label{tab:{13}} \n\
\\end{table}";

      return tableStr.format(
        Hauptwirkstoff.value || "-",
        Sekundärwirkstoff.value || "-",
        Farbe.value || "-",
        Geruch.value || "-",
        Geschmack.value || "-",
        Spezialeigenschaften.value ? (SpezialeigenschaftenIsMultiline.checked ? "\\brcell{{0}}".format(Spezialeigenschaften.value.simpleReplace(",", " \\\\")) : Spezialeigenschaften.value) : "-",
        Probe.value || "-",
        Menge.value || "1 pro Pflanze",
        Vorkommen.value ? (VorkommenIsMultiline.checked ? "\\brcell{{0}}".format(Vorkommen.value.simpleReplace(",", " \\\\")) : Vorkommen.value) : "-",
        Region.value ? (RegionIsMultiline.checked ? "\\brcell{{0}}".format(Region.value.simpleReplace(",", " \\\\")) : Region.value) : "überall",
        Wert.value ? Wert.value + "Kr" : "n.a.",
        Utensilien.value ? (UtensilienIsMultiline.checked ? "\\brcell{{0}}".format(Utensilien.value.simpleReplace(",", " \\\\")) : Utensilien.value) : "-",
        Name.value || "Name unbekannt",
        Name.value.toLatexLabel() || "-"
      );
  }
});
