// Trainingsplan-Daten (5 Tage/Woche)
// rir: "progressive"  -> alle Sätze RIR 1-2, letzter Satz RIR 0
//      "conservative"  -> alle Sätze RIR 2-3 (kein Satz bis RIR 0)
const TRAININGSPLAN = [
  {
    id: "montag",
    tag: "Montag",
    fokus: "Oberkörper (Brust/Rücken/Schulter)",
    uebungen: [
      { name: "Shoulder Press (Gerät)", aufwaermsaetze: "2 Aufwärmsätze", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive" },
      { name: "Bankdrücken Langhantel", aufwaermsaetze: "2 Aufwärmsätze", arbeitssaetze: 4, wiederholungen: "6-9", rir: "progressive" },
      { name: "Latzug breiter Griff", aufwaermsaetze: "1 Aufwärmsatz", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive" },
      { name: "Enges Rudern Kabelzug sitzend", aufwaermsaetze: "1 Aufwärmsatz", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive" },
      { name: "Seitheben sitzend (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" },
      { name: "Butterfly sitzend (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "6-10", rir: "progressive" }
    ]
  },
  {
    id: "dienstag",
    tag: "Dienstag",
    fokus: "Deadlift + Beinbeuger + Arme",
    uebungen: [
      { name: "Deadlift konventionell", aufwaermsaetze: "3 Aufwärmstufen", arbeitssaetze: 3, wiederholungen: "4-5", rir: "progressive" },
      { name: "Beinbeuger (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 2, wiederholungen: "8-10", rir: "progressive" },
      { name: "Bizepscurls sitzend (Ellbogen hinter Körper)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "6-10", rir: "progressive" },
      { name: "Hammer Curls", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" },
      { name: "Triceps Pushdown Kabelzug", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" }
    ]
  },
  {
    id: "mittwoch",
    tag: "Mittwoch",
    fokus: "Beine + Bauch",
    uebungen: [
      { name: "Squats", aufwaermsaetze: "2 Aufwärmsätze", arbeitssaetze: 4, wiederholungen: "6-10", rir: "conservative", hinweis: "RIR durchgehend 2-3 (konservativ)" },
      { name: "Beinstrecker (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" },
      { name: "Abduktoren Kabelzug (je Seite)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "10-15", rir: "progressive", hinweis: "je Seite" },
      { name: "Adduktoren Kabelzug (je Seite)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "10-15", rir: "progressive", hinweis: "je Seite" },
      { name: "Waden (Squatmaschine)", aufwaermsaetze: "1 Aufwärmsatz", arbeitssaetze: 4, arbeitssaetzeText: "3-4 Arbeitssätze", wiederholungen: "12-20", rir: "progressive" },
      { name: "Crunches an Maschine", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "10-15", rir: "progressive" },
      { name: "Beinheben liegend/schräg auf Bank", aufwaermsaetze: "0 Aufwärmsätze", arbeitssaetze: 3, wiederholungen: "8-15", rir: "progressive" },
      { name: "Cable Woodchoppers (je Seite)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "10-12", rir: "progressive", hinweis: "je Seite" }
    ]
  },
  {
    id: "donnerstag",
    tag: "Donnerstag",
    fokus: "Oberkörper (Variation zu Montag)",
    uebungen: [
      { name: "Shoulder Press Kurzhanteln sitzend", aufwaermsaetze: "2 Aufwärmsätze", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive" },
      { name: "Kurzhantel-Schrägbankdrücken", aufwaermsaetze: "2 Aufwärmsätze", arbeitssaetze: 4, wiederholungen: "6-9", rir: "progressive" },
      { name: "Latzug breiter Griff", aufwaermsaetze: "1 Aufwärmsatz", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive", hinweis: "wie Montag" },
      { name: "T-Bar-Rudern breiter Griff", aufwaermsaetze: "1 Aufwärmsatz", arbeitssaetze: 4, wiederholungen: "6-10", rir: "progressive" },
      { name: "Seitheben Kurzhanteln stehend", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" },
      { name: "Butterfly sitzend (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "6-10", rir: "progressive", hinweis: "wie Montag" }
    ]
  },
  {
    id: "freitag",
    tag: "Freitag",
    fokus: "Deadlift (reduziert) + Beinbeuger + Arme",
    uebungen: [
      { name: "Deadlift konventionell", aufwaermsaetze: "3 Aufwärmstufen", arbeitssaetze: 2, wiederholungen: "4-5", rir: "progressive", hinweis: "Standard: gleiches Gewicht wie Dienstag; Fallback bei starker Ermüdung: reduziertes Gewicht" },
      { name: "Beinbeuger (Gerät)", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 2, wiederholungen: "8-10", rir: "progressive", hinweis: "ca. 90 % des Dienstagsgewichts" },
      { name: "Preacher-Curls stehend", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-12", rir: "progressive" },
      { name: "Triceps Overhead Extension Kabelzug", aufwaermsaetze: "0-1 Aufwärmsatz", arbeitssaetze: 3, wiederholungen: "8-10", rir: "progressive" }
    ]
  }
];

// Generelle Prinzipien, die für den gesamten Plan gelten
const PRINZIPIEN = [
  {
    titel: "Satzschema",
    text: "Grundübungen mit freien Gewichten/hoher Last = 4 Arbeitssätze, Isolationsübungen = 3 Arbeitssätze (Ausnahmen: Deadlift Di 3S/Fr 2S, Beinbeuger 2S, Waden 3-4S)."
  },
  {
    titel: "RIR-Abstufung",
    text: "Erster Arbeitssatz RIR 1-2, letzter Arbeitssatz RIR 0 (Ausnahme Squats: durchgehend RIR 2-3)."
  },
  {
    titel: "Aufwärmsätze",
    text: "Basieren auf dem jeweiligen Arbeitsgewicht, nicht auf einem theoretischen Maximum."
  },
  {
    titel: "Morgentraining",
    text: "Kurzes allgemeines Aufwärmen (2-5 Minuten Stepper/Ergometer) vor der ersten Übung, plus Flüssigkeitszufuhr nach dem Aufstehen."
  },
  {
    titel: "Cardio",
    text: "Ist bewusst nicht Teil dieser Planung."
  }
];
