// Alle Texte des Popups. Neue Sprache: einen Block kopieren, Schlüssel = ISO-639-1-Code.
// Fehlt ein Text in einer Sprache, wird der englische verwendet.
// Zeiteinheiten ("3 Monate", "vor 3 Monaten") stehen hier nicht: die liefert der Browser per Intl.
window.yffStrings = {
  de: { toggle: "Alte Videos ausblenden", question: "Höchstalter der Videos auf der Startseite", keep: "Bleibt", hide: "Weg" },
  en: { toggle: "Hide old videos", question: "Maximum age of videos on the home page", keep: "Shown", hide: "Hidden" },
  fr: { toggle: "Masquer les anciennes vidéos", question: "Âge maximal des vidéos sur la page d’accueil", keep: "Visible", hide: "Masqué" },
  es: { toggle: "Ocultar vídeos antiguos", question: "Antigüedad máxima de los vídeos en la página principal", keep: "Visible", hide: "Oculto" },
  it: { toggle: "Nascondi i video vecchi", question: "Età massima dei video nella home", keep: "Visibile", hide: "Nascosto" },
  pt: { toggle: "Ocultar vídeos antigos", question: "Idade máxima dos vídeos na página inicial", keep: "Visível", hide: "Oculto" },
  nl: { toggle: "Oude video’s verbergen", question: "Maximale leeftijd van video’s op de startpagina", keep: "Zichtbaar", hide: "Verborgen" },
  pl: { toggle: "Ukryj stare filmy", question: "Maksymalny wiek filmów na stronie głównej", keep: "Widoczne", hide: "Ukryte" },
  cs: { toggle: "Skrýt stará videa", question: "Maximální stáří videí na hlavní stránce", keep: "Zobrazeno", hide: "Skryto" },
  sk: { toggle: "Skryť staré videá", question: "Maximálny vek videí na hlavnej stránke", keep: "Zobrazené", hide: "Skryté" },
  sl: { toggle: "Skrij stare videoposnetke", question: "Največja starost videoposnetkov na začetni strani", keep: "Vidno", hide: "Skrito" },
  hr: { toggle: "Sakrij stare videozapise", question: "Najveća starost videozapisa na početnoj stranici", keep: "Vidljivo", hide: "Skriveno" },
  hu: { toggle: "Régi videók elrejtése", question: "Videók legnagyobb kora a kezdőlapon", keep: "Látható", hide: "Rejtett" },
  ro: { toggle: "Ascunde videoclipurile vechi", question: "Vechimea maximă a videoclipurilor pe pagina principală", keep: "Vizibil", hide: "Ascuns" },
  bg: { toggle: "Скриване на стари видеоклипове", question: "Максимална възраст на видеоклиповете на началната страница", keep: "Видимо", hide: "Скрито" },
  el: { toggle: "Απόκρυψη παλιών βίντεο", question: "Μέγιστη ηλικία βίντεο στην αρχική σελίδα", keep: "Ορατό", hide: "Κρυφό" },
  da: { toggle: "Skjul gamle videoer", question: "Maksimal alder for videoer på forsiden", keep: "Vises", hide: "Skjult" },
  sv: { toggle: "Dölj gamla videor", question: "Högsta ålder för videor på startsidan", keep: "Visas", hide: "Dolt" },
  nb: { toggle: "Skjul gamle videoer", question: "Maksimal alder for videoer på startsiden", keep: "Vises", hide: "Skjult" },
  fi: { toggle: "Piilota vanhat videot", question: "Videoiden enimmäisikä etusivulla", keep: "Näkyy", hide: "Piilotettu" },
  et: { toggle: "Peida vanad videod", question: "Videote maksimaalne vanus avalehel", keep: "Nähtav", hide: "Peidetud" },
  lv: { toggle: "Paslēpt vecos videoklipus", question: "Videoklipu maksimālais vecums sākumlapā", keep: "Redzams", hide: "Paslēpts" },
  lt: { toggle: "Slėpti senus vaizdo įrašus", question: "Didžiausias vaizdo įrašų amžius pradžios puslapyje", keep: "Matoma", hide: "Paslėpta" },
  ga: { toggle: "Folaigh seanfhíseáin", question: "Uasaois na bhfíseán ar an leathanach baile", keep: "Le feiceáil", hide: "I bhfolach" },
  mt: { toggle: "Aħbi l-vidjows qodma", question: "L-età massima tal-vidjows fil-paġna ewlenija", keep: "Jidher", hide: "Moħbi" },
  uk: { toggle: "Приховувати старі відео", question: "Максимальний вік відео на головній сторінці", keep: "Видно", hide: "Приховано" },
  ru: { toggle: "Скрывать старые видео", question: "Максимальный возраст видео на главной странице", keep: "Видно", hide: "Скрыто" },
  tr: { toggle: "Eski videoları gizle", question: "Ana sayfadaki videoların azami yaşı", keep: "Görünür", hide: "Gizli" },
  ca: { toggle: "Amaga els vídeos antics", question: "Antiguitat màxima dels vídeos a la pàgina d’inici", keep: "Visible", hide: "Amagat" },
};

// Sprachcode (z. B. "de-AT", "pt-BR", "no") auf einen vorhandenen Block abbilden, sonst Englisch
window.yffPick = (code) => {
  const c = String(code || '').toLowerCase().replace('_', '-');
  const base = c.split('-')[0];
  const alias = { no: 'nb', nn: 'nb' }[base];
  return [c, base, alias].find((k) => k && window.yffStrings[k]) || 'en';
};
