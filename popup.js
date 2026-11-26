// Popup-Texte in der Browsersprache
const lang = window.yffPick(navigator.language);
document.documentElement.lang = lang;
const text = (key) => window.yffStrings[lang][key] ?? window.yffStrings.en[key];
for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = text(el.dataset.i18n);

// Name and version of the extension, as the browser shows them in its own menus
document.getElementById('name').textContent = chrome.i18n.getMessage('extName');
document.getElementById('version').textContent = 'v' + chrome.runtime.getManifest().version;

// Stufen folgen YouTubes eigener Anzeige: Wochen, dann Monate, dann Jahre.
// Feiner geht nicht sinnvoll – YouTube zeigt z. B. nur "vor 5 Monaten", nicht 160 Tage.
const STUFEN = [
  ...[1, 2, 3, 4].map((n) => ({ n, einheit: 'week', tage: 7 * n })),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({ n, einheit: 'month', tage: 30 * n })),
  ...[1, 2, 3, 4, 5].map((n) => ({ n, einheit: 'year', tage: 365 * n })),
];

// "3 Monate" und "vor 3 Monaten" in jeder Sprache mit richtigen Pluralformen, ohne Übersetzungstabelle
const name = (s) => new Intl.NumberFormat(lang, { style: 'unit', unit: s.einheit, unitDisplay: 'long' }).format(s.n);
const vor = (s) => new Intl.RelativeTimeFormat(lang, { numeric: 'always' }).format(-s.n, s.einheit);

const regler = document.getElementById('regler');
const wert = document.getElementById('wert');
const beispiel = document.getElementById('beispiel');
const skala = document.getElementById('skala');

regler.max = STUFEN.length - 1;

// Skala (Indizes in STUFEN): 1 Woche, 6 Monate, 5 Jahre. Mehr passt in langen Sprachen (fi, el) nicht.
for (const i of [0, 9, 19]) {
  const span = document.createElement('span');
  span.textContent = name(STUFEN[i]);
  span.style.left = `${(i / (STUFEN.length - 1)) * 100}%`;
  skala.append(span);
}

function anzeigen() {
  const s = STUFEN[regler.value];
  const naechste = STUFEN[Number(regler.value) + 1] || { n: 6, einheit: 'year' };
  wert.textContent = name(s);
  const b = (t) => Object.assign(document.createElement('b'), { textContent: t });
  beispiel.replaceChildren(`${text('keep')}: `, b(vor(s)), ` · ${text('hide')}: `, b(vor(naechste)));
}

// Gespeicherten Wert auf die nächstliegende Stufe abbilden (Standard 28 Tage = 4 Wochen).
chrome.storage.local.get({ maxTage: 28 }).then(({ maxTage }) => {
  let beste = 0;
  STUFEN.forEach((s, i) => {
    if (Math.abs(s.tage - maxTage) < Math.abs(STUFEN[beste].tage - maxTage)) beste = i;
  });
  regler.value = beste;
  anzeigen();
});

regler.addEventListener('input', anzeigen); // Anzeige beim Ziehen
regler.addEventListener('change', () => {   // Speichern beim Loslassen
  chrome.storage.local.set({ maxTage: STUFEN[regler.value].tage });
});
