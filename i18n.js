// Alle Texte des Popups. Neue Sprache: einen Block kopieren, Schlüssel = ISO-639-1-Code.
// Fehlt ein Text in einer Sprache, wird der englische verwendet.
// Zeiteinheiten ("3 Monate", "vor 3 Monaten") stehen hier nicht: die liefert der Browser per Intl.
window.yffStrings = {
  de: { question: "Höchstalter der Videos auf der Startseite", keep: "Bleibt", hide: "Weg" },
  en: { question: "Maximum age of videos on the home page", keep: "Shown", hide: "Hidden" },
  fr: { question: "Âge maximal des vidéos sur la page d’accueil", keep: "Visible", hide: "Masqué" },
  es: { question: "Antigüedad máxima de los vídeos en la página principal", keep: "Visible", hide: "Oculto" },
  it: { question: "Età massima dei video nella home", keep: "Visibile", hide: "Nascosto" },
  pt: { question: "Idade máxima dos vídeos na página inicial", keep: "Visível", hide: "Oculto" },
  nl: { question: "Maximale leeftijd van video’s op de startpagina", keep: "Zichtbaar", hide: "Verborgen" },
  pl: { question: "Maksymalny wiek filmów na stronie głównej", keep: "Widoczne", hide: "Ukryte" },
  cs: { question: "Maximální stáří videí na hlavní stránce", keep: "Zobrazeno", hide: "Skryto" },
  sk: { question: "Maximálny vek videí na hlavnej stránke", keep: "Zobrazené", hide: "Skryté" },
  sl: { question: "Največja starost videoposnetkov na začetni strani", keep: "Vidno", hide: "Skrito" },
  hr: { question: "Najveća starost videozapisa na početnoj stranici", keep: "Vidljivo", hide: "Skriveno" },
  hu: { question: "Videók legnagyobb kora a kezdőlapon", keep: "Látható", hide: "Rejtett" },
  ro: { question: "Vechimea maximă a videoclipurilor pe pagina principală", keep: "Vizibil", hide: "Ascuns" },
  bg: { question: "Максимална възраст на видеоклиповете на началната страница", keep: "Видимо", hide: "Скрито" },
  el: { question: "Μέγιστη ηλικία βίντεο στην αρχική σελίδα", keep: "Ορατό", hide: "Κρυφό" },
  da: { question: "Maksimal alder for videoer på forsiden", keep: "Vises", hide: "Skjult" },
  sv: { question: "Högsta ålder för videor på startsidan", keep: "Visas", hide: "Dolt" },
  nb: { question: "Maksimal alder for videoer på startsiden", keep: "Vises", hide: "Skjult" },
  fi: { question: "Videoiden enimmäisikä etusivulla", keep: "Näkyy", hide: "Piilotettu" },
  et: { question: "Videote maksimaalne vanus avalehel", keep: "Nähtav", hide: "Peidetud" },
  lv: { question: "Videoklipu maksimālais vecums sākumlapā", keep: "Redzams", hide: "Paslēpts" },
  lt: { question: "Didžiausias vaizdo įrašų amžius pradžios puslapyje", keep: "Matoma", hide: "Paslėpta" },
  ga: { question: "Uasaois na bhfíseán ar an leathanach baile", keep: "Le feiceáil", hide: "I bhfolach" },
  mt: { question: "L-età massima tal-vidjows fil-paġna ewlenija", keep: "Jidher", hide: "Moħbi" },
  uk: { question: "Максимальний вік відео на головній сторінці", keep: "Видно", hide: "Приховано" },
  ru: { question: "Максимальный возраст видео на главной странице", keep: "Видно", hide: "Скрыто" },
  tr: { question: "Ana sayfadaki videoların azami yaşı", keep: "Görünür", hide: "Gizli" },
  ca: { question: "Antiguitat màxima dels vídeos a la pàgina d’inici", keep: "Visible", hide: "Amagat" },
};

// Sprachcode (z. B. "de-AT", "pt-BR", "no") auf einen vorhandenen Block abbilden, sonst Englisch
window.yffPick = (code) => {
  const c = String(code || '').toLowerCase().replace('_', '-');
  const base = c.split('-')[0];
  const alias = { no: 'nb', nn: 'nb' }[base];
  return [c, base, alias].find((k) => k && window.yffStrings[k]) || 'en';
};
