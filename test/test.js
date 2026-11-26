// Prüft die Alterserkennung. Aufruf: node test/test.js
// zeitangaben/<hl>.txt: echte Texte aus YouTube-Suchseiten mit ?hl=<hl> (2026-11-26).
const { erkenner } = require('../content.js');
const fs = require('fs');
const path = require('path');

// html lang, das YouTube für den hl-Parameter setzt (ga/mt gibt es bei YouTube nicht → Deutsch)
const HTML_LANG = { pt: 'pt-BR', no: 'nb-NO', ga: 'de-DE', mt: 'de-DE', gemischt: 'de-DE' };
let fehler = 0;

// 1) Jede echte YouTube-Angabe muss erkannt werden
const ordner = path.join(__dirname, 'zeitangaben');
let anzahl = 0;
for (const datei of fs.readdirSync(ordner)) {
  const hl = datei.replace(/\.txt$/, '');
  const alter = erkenner([HTML_LANG[hl] || hl, 'en']);
  for (const z of fs.readFileSync(path.join(ordner, datei), 'utf8').split('\n').filter(Boolean)) {
    anzahl++;
    if (alter(z) === null) { console.log(`NICHT ERKANNT (${hl}): ${z}`); fehler++; }
  }
}
console.log(`${anzahl - fehler}/${anzahl} echte Angaben erkannt`);

// 2) Erwartete Werte und Randfälle
const de = erkenner(['de-DE', 'en']);
const faelle = [
  ['vor 6 Std.', 0], ['vor 1 Tag', 1], ['vor 6 Tagen', 6], ['vor 4 Wochen', 28], ['vor 1 Monat', 30],
  ['vor 11 Monaten', 330], ['vor 1 Jahr', 365], ['vor 3 Jahren', 1095], ['vor 2 Std. gestreamt', 0],
  ['vor 5 Minuten', 0], ['vor 30 Sekunden', 0], ['vor 2 Wochen gestreamt', 14],
  ['3mo ago', 90], ['2w ago', 14], ['5y ago', 1825], ['12h ago', 0], ['4d ago', 4], ['30m ago', 0],
  ['Streamed 1mo ago', 30], ['2 months ago', 60], ['1 year ago', 365], ['3 weeks ago', 21],
  ['vor 3 Monaten', 90], // geschützte Leerzeichen
  // dürfen NICHT als Alter gelten:
  ['Was ich vor 3 Jahren gelernt habe heute', null], ['1.234 Aufrufe', null], ['LIVE', null], ['12:34', null],
  ['Ich habe vor 3 Jahren aufgehört und es bereut', null], ['Premiere am 12.03.2025', null], ['', null],
];
for (const [ein, soll] of faelle) {
  const ist = de(ein);
  if (ist !== soll) { console.log(`FALSCH: "${ein}" → ${ist}, erwartet ${soll}`); fehler++; }
}

console.log(fehler ? `${fehler} Fehler` : 'Alle Tests bestanden');
process.exit(fehler ? 1 : 0);
