// Fresh Feed for YouTube: blendet auf der Startseite Videos aus, die älter als maxTage sind.
// Erkennung über den sichtbaren Alterstext ("vor 2 Monaten", "3mo ago", "il y a 3 mois"),
// nicht über YouTubes CSS-Klassen – die ändern sich häufig, der Text kaum.

// Grenze in Tagen, wird im Popup eingestellt. Standard 4 Wochen:
// "vor 4 Wochen" bleibt sichtbar, "vor 1 Monat" verschwindet.
let maxTage = 28;

// Bereich, in dem gefiltert wird: nur die Startseite.
const BEREICH = 'ytd-browse[page-subtype="home"]';

// Elemente, die ein ganzes Video im Feed darstellen.
const KACHEL = 'ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, yt-lockup-view-model';

// [Einheit, Tage pro Einheit, größte Zahl, die YouTube dafür anzeigt]. Große Einheiten zuerst:
// Ergeben zwei Einheiten denselben Text, gewinnt die kleinere – im Zweifel bleibt ein Video sichtbar.
const EINHEITEN = [
  ['year', 365, 30], ['month', 30, 12], ['week', 7, 5], ['day', 1, 31],
  ['hour', 0, 23], ['minute', 0, 59], ['second', 0, 59],
];

const normal = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase(); // auch geschützte Leerzeichen

// YouTube formatiert das Alter mit denselben Unicode-CLDR-Daten wie Intl.RelativeTimeFormat.
// Daher erzeugt der Browser alle möglichen Texte in YouTubes Sprache selbst ("vor 6 Std." → 0 Tage,
// "vor 3 Monaten" → 90 Tage) – keine handgeschriebenen Muster pro Sprache nötig.
function erkenner(sprachen) {
  const tabelle = new Map();
  for (const sprache of sprachen) {
    for (const style of ['long', 'short', 'narrow']) {
      let format;
      try { format = new Intl.RelativeTimeFormat(sprache, { numeric: 'always', style }); } catch { continue; }
      for (const [einheit, tage, max] of EINHEITEN) {
        for (let n = 1; n <= max; n++) tabelle.set(normal(format.format(-n, einheit)), n * tage);
      }
    }
  }
  // Liefert das Alter in Tagen oder null. Bis zu drei Wörter davor oder dahinter sind erlaubt
  // ("vor 2 Std. gestreamt", "Trasmesso in streaming 2 gg fa"), mehr nicht – sonst könnte ein Titel wie
  // "Was ich vor 3 Jahren gelernt habe" als Altersangabe gelten.
  return (text) => {
    const t = normal(text);
    if (t.length === 0 || t.length > 50) return null;
    const woerter = t.split(' ');
    for (let k = 0; k <= 3; k++) {
      for (const teil of [woerter.slice(k), woerter.slice(0, woerter.length - k)]) {
        const tage = tabelle.get(teil.join(' '));
        if (tage !== undefined) return tage;
      }
    }
    return null;
  };
}

function filtern(alterInTagen) {
  const alt = new Set();
  for (const bereich of document.querySelectorAll(BEREICH)) {
    const walker = document.createTreeWalker(bereich, NodeFilter.SHOW_TEXT);
    for (let knoten = walker.nextNode(); knoten; knoten = walker.nextNode()) {
      // Manche Metadaten stehen als "1.234 Aufrufe • vor 2 Monaten" in einem Knoten.
      for (const teil of knoten.nodeValue.split('•')) {
        const tage = alterInTagen(teil);
        if (tage === null) continue;
        const kachel = knoten.parentElement && knoten.parentElement.closest(KACHEL);
        // Äußerste Kachel nehmen, damit auf der Startseite die ganze Grid-Zelle verschwindet.
        const zelle = kachel && (kachel.closest('ytd-rich-item-renderer') || kachel);
        if (zelle && tage > maxTage) alt.add(zelle);
      }
    }
  }
  // YouTube verwendet Kacheln wieder: Markierungen entfernen, die nicht mehr zutreffen.
  for (const el of document.querySelectorAll('.fresh-feed-hidden')) {
    if (!alt.has(el)) el.classList.remove('fresh-feed-hidden');
  }
  for (const el of alt) el.classList.add('fresh-feed-hidden');
}

if (typeof module !== 'undefined') {
  module.exports = { erkenner }; // nur für den Test mit Node
} else {
  // YouTubes Sprache (html lang="de-DE"), dazu Englisch als Rückfall
  const alterInTagen = erkenner([document.documentElement.lang, navigator.language, 'en'].filter(Boolean));
  const lauf = () => filtern(alterInTagen);

  let geplant = false;
  new MutationObserver(() => {
    if (geplant) return;
    geplant = true;
    setTimeout(() => { geplant = false; lauf(); }, 250);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  chrome.storage.local.get({ maxTage }).then((wert) => { maxTage = wert.maxTage; lauf(); });
  // Änderung im Popup wirkt sofort, ohne die Seite neu zu laden.
  chrome.storage.onChanged.addListener((aenderung) => {
    if (aenderung.maxTage) { maxTage = aenderung.maxTage.newValue; lauf(); }
  });
}
