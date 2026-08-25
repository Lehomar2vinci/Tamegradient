"use strict";

const palettes = {
  mist: {
    background: [[37, 64, 70], [71, 104, 107], [139, 174, 169], [206, 221, 211], [111, 143, 143]],
    waves: ["rgba(239,250,246,0.30)", "rgba(186,225,216,0.26)", "rgba(255,255,255,0.18)", "rgba(117,163,160,0.24)", "rgba(224,240,234,0.21)"],
    accent: "186, 225, 216",
    accentSoft: "226, 241, 235",
    theme: "#35575b",
  },
  ocean: {
    background: [[17, 46, 66], [28, 76, 99], [70, 121, 141], [139, 181, 190], [61, 96, 120]],
    waves: ["rgba(215,242,247,0.30)", "rgba(142,205,222,0.25)", "rgba(255,255,255,0.18)", "rgba(90,157,184,0.23)", "rgba(192,226,233,0.22)"],
    accent: "141, 199, 214",
    accentSoft: "211, 237, 242",
    theme: "#244f61",
  },
  dawn: {
    background: [[91, 65, 72], [142, 91, 93], [201, 137, 130], [229, 188, 162], [169, 117, 123]],
    waves: ["rgba(255,238,224,0.30)", "rgba(255,200,190,0.24)", "rgba(255,255,255,0.17)", "rgba(226,163,150,0.22)", "rgba(244,218,200,0.22)"],
    accent: "232, 177, 164",
    accentSoft: "249, 222, 207",
    theme: "#76565d",
  },
  forest: {
    background: [[28, 58, 48], [52, 86, 65], [101, 133, 103], [173, 181, 144], [72, 102, 82]],
    waves: ["rgba(235,242,214,0.28)", "rgba(176,211,171,0.24)", "rgba(255,255,255,0.16)", "rgba(118,164,127,0.23)", "rgba(216,226,191,0.20)"],
    accent: "170, 207, 167",
    accentSoft: "225, 236, 207",
    theme: "#3d604d",
  },
  sand: {
    background: [[83, 68, 56], [125, 99, 75], [178, 142, 105], [219, 197, 159], [144, 114, 88]],
    waves: ["rgba(255,241,214,0.29)", "rgba(239,206,162,0.23)", "rgba(255,255,255,0.16)", "rgba(203,167,121,0.21)", "rgba(247,225,190,0.21)"],
    accent: "226, 195, 153",
    accentSoft: "246, 226, 194",
    theme: "#735e4a",
  },
};

const SOUND_MODES = {
  deep: {
    label: "Profondeurs",
    tonality: "C dorien",
    bedNotes: ["C2", "G2"],
    bedDb: [-20, -23],
    subNote: "C1",
    subGain: 0.046,
    bassNotes: ["C1", "G1", "Bb1", "D2"],
    padChords: [
      ["C2", "G2", "D3"],
      ["Bb1", "F2", "C3"],
      ["Eb2", "Bb2", "F3"],
      ["D2", "A2", "E3"],
    ],
    airNotes: ["G4", "A4", "D5", "Eb5"],
    filterRange: [210, 520],
    airFilterRange: [1500, 2900],
    reverbWet: 0.72,
    delayWet: 0.16,
    brownDb: -56,
    pinkDb: -74,
    padDb: -32,
    airDb: -43,
    chimeDb: -46,
    pulseDb: -31,
    interval: [13000, 25000],
    eventWeights: { pad: 0.42, bass: 0.40, air: 0.13, chime: 0.05 },
    duration: [8, 15],
  },
  tide: {
    label: "Marée harmonique",
    tonality: "D majeur pentatonique",
    bedNotes: ["D2", "A2"],
    bedDb: [-24, -27],
    subNote: "D1",
    subGain: 0.028,
    bassNotes: ["D2", "A1", "E2", "B1"],
    padChords: [
      ["D2", "A2", "E3"],
      ["B1", "F#2", "A2"],
      ["E2", "B2", "F#3"],
      ["A2", "E3", "B3"],
    ],
    airNotes: ["A4", "B4", "E5", "F#5", "A5"],
    filterRange: [320, 880],
    airFilterRange: [1800, 3900],
    reverbWet: 0.76,
    delayWet: 0.24,
    brownDb: -63,
    pinkDb: -68,
    padDb: -29,
    airDb: -39,
    chimeDb: -44,
    pulseDb: -36,
    interval: [10500, 21000],
    eventWeights: { pad: 0.46, bass: 0.19, air: 0.26, chime: 0.09 },
    duration: [7, 13],
  },
  night: {
    label: "Nuit organique",
    tonality: "A mineur pentatonique",
    bedNotes: ["A1", "E2"],
    bedDb: [-23, -27],
    subNote: "A0",
    subGain: 0.034,
    bassNotes: ["A1", "E1", "G1", "C2"],
    padChords: [
      ["A1", "E2", "C3"],
      ["C2", "G2", "D3"],
      ["G1", "D2", "A2"],
      ["E2", "B2", "D3"],
    ],
    airNotes: ["A4", "C5", "D5", "E5", "G5"],
    filterRange: [190, 610],
    airFilterRange: [1200, 2600],
    reverbWet: 0.79,
    delayWet: 0.12,
    brownDb: -53,
    pinkDb: -72,
    padDb: -34,
    airDb: -45,
    chimeDb: -48,
    pulseDb: -34,
    interval: [14500, 28000],
    eventWeights: { pad: 0.35, bass: 0.45, air: 0.16, chime: 0.04 },
    duration: [9, 16],
  },
  warm: {
    label: "Nappe solaire",
    tonality: "F lydien",
    bedNotes: ["F2", "C3"],
    bedDb: [-30, -32],
    subNote: "F1",
    subGain: 0.010,
    bassNotes: ["F2", "C2", "G2"],
    padChords: [
      ["F2", "C3", "G3", "A3"],
      ["G2", "D3", "A3"],
      ["C3", "G3", "B3", "D4"],
      ["A2", "E3", "G3", "C4"],
    ],
    airNotes: ["A4", "B4", "C5", "E5", "G5"],
    filterRange: [520, 1450],
    airFilterRange: [2100, 4600],
    reverbWet: 0.71,
    delayWet: 0.21,
    brownDb: -76,
    pinkDb: -64,
    padDb: -27,
    airDb: -36,
    chimeDb: -43,
    pulseDb: -43,
    interval: [9000, 18000],
    eventWeights: { pad: 0.54, bass: 0.07, air: 0.30, chime: 0.09 },
    duration: [6, 12],
  },
  celestial: {
    label: "Halo céleste",
    tonality: "C lydien",
    bedNotes: ["C3", "G3"],
    bedDb: [-39, -42],
    subNote: "C2",
    subGain: 0.003,
    bassNotes: ["C3", "G2"],
    padChords: [
      ["C3", "G3", "D4", "E4"],
      ["D3", "A3", "E4"],
      ["G3", "D4", "A4", "B4"],
      ["B3", "F#4", "C5"],
    ],
    airNotes: ["D5", "F#5", "G5", "A5", "B5", "C6"],
    filterRange: [820, 2100],
    airFilterRange: [2700, 6200],
    reverbWet: 0.84,
    delayWet: 0.38,
    brownDb: -84,
    pinkDb: -67,
    padDb: -32,
    airDb: -31,
    chimeDb: -38,
    pulseDb: -52,
    interval: [7500, 15000],
    eventWeights: { pad: 0.24, bass: 0.02, air: 0.50, chime: 0.24 },
    duration: [5, 10],
  },
  crystal: {
    label: "Cristal lent",
    tonality: "E majeur pentatonique",
    bedNotes: ["E3", "B3"],
    bedDb: [-45, -47],
    subNote: "E2",
    subGain: 0.001,
    bassNotes: ["E3", "B2"],
    padChords: [
      ["E3", "B3", "F#4"],
      ["B3", "F#4", "C#5"],
      ["C#4", "G#4", "B4"],
      ["F#3", "C#4", "G#4"],
    ],
    airNotes: ["E5", "F#5", "G#5", "B5", "C#6", "E6"],
    filterRange: [1000, 2500],
    airFilterRange: [3200, 7600],
    reverbWet: 0.88,
    delayWet: 0.46,
    brownDb: -90,
    pinkDb: -74,
    padDb: -36,
    airDb: -34,
    chimeDb: -31,
    pulseDb: -56,
    interval: [6200, 13500],
    eventWeights: { pad: 0.16, bass: 0.01, air: 0.36, chime: 0.47 },
    duration: [4, 9],
  },
  prism: {
    label: "Prisme suspendu",
    tonality: "E lydien",
    bedNotes: ["E2", "B2"],
    bedDb: [-25, -28],
    subNote: "E1",
    subGain: 0.052,
    bassNotes: ["E1", "B1", "C#2", "F#1", "G#1"],
    padChords: [
      ["E2", "B2", "F#3", "G#3"],
      ["C#2", "G#2", "D#3", "F#3"],
      ["B1", "F#2", "C#3", "D#3"],
      ["F#2", "C#3", "G#3", "A#3"],
      ["G#2", "D#3", "F#3", "B3"],
    ],
    airNotes: ["E4", "F#4", "G#4", "A#4", "B4", "C#5", "D#5", "E5", "F#5", "G#5"],
    motifNotes: ["E4", "F#4", "G#4", "B4", "C#5", "D#5", "E5", "F#5"],
    filterRange: [360, 1050],
    airFilterRange: [1900, 5200],
    reverbWet: 0.82,
    delayWet: 0.34,
    brownDb: -66,
    pinkDb: -67,
    padDb: -28,
    airDb: -36,
    chimeDb: -37,
    motifDb: -29,
    pulseDb: -28,
    interval: [6200, 12800],
    eventWeights: { pad: 0.30, bass: 0.13, air: 0.18, chime: 0.10, motif: 0.29 },
    duration: [6, 12],
  },
};

const background = document.getElementById("background");
const colorLayers = [document.getElementById("color-layer-a"), document.getElementById("color-layer-b")];
const breathButton = document.getElementById("breath-button");
const breathPhase = document.getElementById("breath-phase");
const breathDetail = document.getElementById("breath-detail");
const breathTimer = document.getElementById("breath-timer");
const soundButton = document.getElementById("sound-button");
const soundLabel = document.getElementById("sound-label");
const audioStatus = document.getElementById("audio-status");
const immersionButton = document.getElementById("immersion-button");
const exitImmersive = document.getElementById("exit-immersive");
const settingsButton = document.getElementById("settings-button");
const settingsDialog = document.getElementById("settings-dialog");
const closeSettings = document.getElementById("close-settings");
const aboutButton = document.getElementById("about-button");
const whyLink = document.getElementById("why-link");
const aboutDialog = document.getElementById("about-dialog");
const closeAbout = document.getElementById("close-about");
const volumeRange = document.getElementById("volume-range");
const volumeOutput = document.getElementById("volume-output");
const intensityRange = document.getElementById("intensity-range");
const intensityOutput = document.getElementById("intensity-output");
const motionToggle = document.getElementById("motion-toggle");
const autodimToggle = document.getElementById("autodim-toggle");
const paletteButtons = [...document.querySelectorAll("[data-palette]")];
const soundModeButtons = [...document.querySelectorAll("[data-sound-mode]")];
const animationModeButtons = [...document.querySelectorAll("[data-animation-mode]")];
const breathPatternButtons = [...document.querySelectorAll("[data-breath-pattern]")];
const sessionDurationButtons = [...document.querySelectorAll("[data-session-minutes]")];
const sessionButton = document.getElementById("session-button");
const sessionLabel = document.getElementById("session-label");
const sessionProgress = document.getElementById("session-progress");
const sessionState = document.getElementById("session-state");
const sessionRemaining = document.getElementById("session-remaining");
const sessionProgressBar = document.getElementById("session-progress-bar");
const journeyToggle = document.getElementById("journey-toggle");

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentPalette = "mist";
let currentSoundMode = "deep";
let animationMode = "waves";
let motionEnabled = !reducedMotionQuery.matches;
let visualIntensity = 55;
let autodimEnabled = true;
let autoJourneyEnabled = false;
let breathPattern = "relax";
let selectedSessionMinutes = 0;
let sessionActive = false;
let sessionStartedAt = 0;
let sessionTickerId = null;
let journeyTimerId = null;
let journeyStepCount = 0;
let idleTimerId = null;
let visibleColorLayer = 0;

const BREATH_PATTERNS = {
  relax: { inhale: 4, exhale: 6, label: "4–6 · détente" },
  balanced: { inhale: 5, exhale: 5, label: "5–5 · régulier" },
};


// ---------- Internationalisation FR / EN ----------
const languageButton = document.getElementById("language-button");
const languageCurrent = document.getElementById("language-current");
const languageNext = document.getElementById("language-next");
const breathGuideInhale = document.getElementById("breath-guide-inhale");
const breathGuideExhale = document.getElementById("breath-guide-exhale");
const breathGuideInhaleTime = document.getElementById("breath-guide-inhale-time");
const breathGuideExhaleTime = document.getElementById("breath-guide-exhale-time");

let currentLanguage = localStorage.getItem("gradient-zen-language") === "en" ? "en" : "fr";

const EN_TEXT = {
  "Respirer": "Breathe", "démarrer un cycle": "start a cycle", "Inspirer": "Inhale", "Expirer": "Exhale",
  "Laissez le cercle grandir, puis accompagnez-le lorsqu’il revient.": "Let the circle expand, then follow it gently as it returns.",
  "Un instant pour ralentir": "A moment to slow down", "Suivez le mouvement.": "Follow the movement.", "Respirez.": "Breathe.", "Le paysage vous suit.": "The landscape follows you.", "Ici, rien à réussir. Seulement ralentir.": "Nothing to achieve here. Only to slow down.",
  "Touchez le cercle pour une respiration guidée. Le paysage, la couleur et les harmonies ambient évoluent lentement avec vous.": "Touch the circle for guided breathing. The landscape, colors and ambient harmonies slowly evolve with you.", "Touchez le cercle. Le souffle devient lumière, mouvement et harmonie — sans objectif, simplement un rythme à habiter.": "Touch the circle. Breath becomes light, movement and harmony — with no goal, simply a rhythm to inhabit.",
  "Paysage sonore": "Soundscape", "Immersion": "Immersion", "Session libre": "Open session", "Session": "Session",
  "Silence · paysage actif": "Silence · visual landscape active", "Pourquoi cette respiration ?": "Why this breathing pattern?", "Quitter l’immersion": "Exit immersion",
  "Votre espace": "Your space", "Réglages zen": "Zen settings", "Ambiance couleur": "Color atmosphere", "Transition douce entre les atmosphères": "Smooth transition between atmospheres",
  "Brume": "Mist", "Océan": "Ocean", "Aube": "Dawn", "Forêt": "Forest", "Sable": "Sand",
  "Des graves profonds aux harmoniques aériennes": "From deep bass to airy harmonics", "Profondeurs": "Depths", "Grave · C dorien": "Low · C Dorian",
  "Marée harmonique": "Harmonic tide", "Ample · D pentatonique": "Wide · D pentatonic", "Nuit organique": "Organic night", "Feutré · A mineur": "Soft · A minor",
  "Nappe solaire": "Solar pad", "Chaleureux · F lydien": "Warm · F Lydian", "Halo céleste": "Celestial halo", "Aérien · C lydien": "Airy · C Lydian",
  "Cristal lent": "Slow crystal", "Clair · E pentatonique": "Clear · E pentatonic", "Prisme suspendu": "Suspended prism", "Minimaliste · E lydien": "Minimal · E Lydian",
  "Animation": "Animation", "Les formes réagissent principalement au paysage sonore": "Shapes react primarily to the soundscape", "Vagues": "Waves", "Fluides": "Fluid",
  "Voiles": "Veils", "Aériens": "Airy", "Orbites": "Orbits", "Lentes": "Slow", "Floraison": "Bloom", "Respirante": "Breathing", "Topographie": "Topography", "Contours": "Contours", "Constellation": "Constellation", "Étoilée": "Starlit",
  "Rythme respiratoire": "Breathing rhythm", "Choisir un guide confortable": "Choose a comfortable guide", "Détente": "Relax", "Régulier": "Balanced",
  "Durée de session": "Session duration", "La séance peut s'arrêter automatiquement": "The session can stop automatically", "Libre": "Open",
  "Volume": "Volume", "Niveau global du paysage sonore": "Overall soundscape level", "Mouvement": "Motion", "Amplitude du paysage": "Landscape amplitude",
  "Anime les formes et les lumières.": "Animates shapes and lights.", "Interface discrète": "Quiet interface", "Les contrôles s’effacent après quelques secondes.": "Controls fade after a few seconds.",
  "Voyage automatique": "Automatic journey", "Fait évoluer doucement couleurs, formes et son pendant une session.": "Gently evolves colors, shapes and sound during a session.",
  "Raccourcis": "Shortcuts", "respiration ·": "breathing ·", "son ·": "sound ·", "session ·": "session ·", "immersion ·": "immersion ·", "quitter": "exit",
  "Gradient · intention": "Gradient · intention", "Respirer pour ralentir": "Breathe to slow down",
  "Une respiration lente et confortable fait partie des techniques de relaxation. Elle peut aider à diminuer l’activation liée au stress et à retrouver une sensation de calme, notamment lorsqu’elle est pratiquée régulièrement et sans forcer.": "Slow, comfortable breathing is one of the techniques used for relaxation. It may help reduce stress-related arousal and support a sense of calm, especially when practiced regularly and without forcing the breath.",
  "Ralentir la réponse au stress": "Slow the stress response", "Les techniques de relaxation, dont la respiration lente ou diaphragmatique, sont associées à une respiration plus lente et peuvent s’accompagner d’une diminution de certains marqueurs de stress.": "Relaxation techniques, including slow or diaphragmatic breathing, are associated with slower breathing and may be accompanied by reductions in some stress markers.",
  "Soutenir la régulation autonome": "Support autonomic regulation", "Une revue systématique a observé, dans plusieurs études, des changements de variabilité cardiaque et d’autres indicateurs compatibles avec une modulation du système nerveux autonome.": "A systematic review found changes in heart-rate variability and other indicators across several studies, consistent with modulation of the autonomic nervous system.",
  "Créer une pratique simple": "Build a simple practice", "Le NHS recommande une respiration douce, confortable et régulière, pratiquée quelques minutes. Gradient traduit cette idée en repères visuels et sonores plutôt qu’en performance.": "The NHS recommends gentle, comfortable and regular breathing practiced for a few minutes. Gradient translates that idea into visual and sound cues rather than performance goals.",
  "Gradient est une expérience de bien-être, pas un dispositif médical. Les effets varient selon les personnes. La respiration ne doit jamais être forcée ; en cas d’inconfort, arrêtez et respirez normalement. L’application ne remplace pas un avis ou un traitement médical.": "Gradient is a wellbeing experience, not a medical device. Effects vary from person to person. Breathing should never be forced; if you feel discomfort, stop and breathe normally. The app does not replace medical advice or treatment.",
  "Démarche de développement": "Development approach", "Une interface sensible développée par Nathan Chambrette": "A sensitive interface developed by Nathan Chambrette",
  "Gradient est développé par Nathan Chambrette comme une recherche autour d’une interface volontairement lente, non compétitive et contemplative. Le projet met en relation quatre matières numériques — la respiration, la couleur, le mouvement génératif et le son — pour transformer le navigateur en petit espace de pause.": "Gradient is developed by Nathan Chambrette as an exploration of an intentionally slow, non-competitive and contemplative interface. The project connects four digital materials — breathing, color, generative movement and sound — to turn the browser into a small space for pause.",
  "Les choix techniques suivent cette intention : p5.js produit des formes organiques qui ne se répètent jamais exactement, Tone.js génère plusieurs paysages sonores harmoniques en temps réel, et les transitions sont conçues pour éviter les ruptures brusques. Le but n’est pas de « réussir » une séance, mais de proposer un rythme, laisser de l’espace et rendre l’interaction presque invisible.": "The technical choices follow that intention: p5.js creates organic forms that never repeat exactly, Tone.js generates several harmonic soundscapes in real time, and transitions are designed to avoid abrupt breaks. The goal is not to ‘succeed’ at a session, but to offer a rhythm, leave space and make interaction almost invisible.",
  "Sources": "Sources", "Pour aller plus loin": "Further reading", "NCCIH / NIH — Stress et techniques de relaxation": "NCCIH / NIH — Stress and relaxation techniques",
  "NHS — Exercices respiratoires pour le stress": "NHS — Breathing exercises for stress", "Zaccaro et al., 2018 — Revue systématique sur la respiration lente": "Zaccaro et al., 2018 — Systematic review of slow breathing"
};

const ATTR_EN = {
  "Gradient, revenir à l'expérience principale": "Gradient, return to the main experience", "Pourquoi la respiration lente ?": "Why slow breathing?", "À propos de Gradient": "About Gradient",
  "Ouvrir les réglages": "Open settings", "Réglages": "Settings", "Contrôles de l'expérience": "Experience controls", "Choisir une ambiance visuelle": "Choose a visual atmosphere",
  "Fermer les réglages": "Close settings", "Fermer": "Close", "Ce que suggèrent les données disponibles": "What current evidence suggests",
  "Passer l’interface en anglais": "Switch the interface to English"
};

const SOUND_MODE_EN = {
  deep: ["Depths", "C Dorian"], tide: ["Harmonic tide", "D major pentatonic"], night: ["Organic night", "A minor pentatonic"],
  warm: ["Solar pad", "F Lydian"], celestial: ["Celestial halo", "C Lydian"], crystal: ["Slow crystal", "E major pentatonic"], prism: ["Suspended prism", "E Lydian"]
};

function tr(fr) { return currentLanguage === "en" ? (EN_TEXT[fr] ?? fr) : fr; }
function soundModeLabel(mode) { return currentLanguage === "en" ? (SOUND_MODE_EN[mode]?.[0] ?? SOUND_MODES[mode].label) : SOUND_MODES[mode].label; }
function soundModeTonality(mode) { return currentLanguage === "en" ? (SOUND_MODE_EN[mode]?.[1] ?? SOUND_MODES[mode].tonality) : SOUND_MODES[mode].tonality; }

function translateStaticText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (node.parentElement?.closest("script,style")) return;
    if (node.__gradientFr === undefined) node.__gradientFr = node.nodeValue;
    const original = node.__gradientFr;
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = currentLanguage === "en" ? (EN_TEXT[trimmed] ?? trimmed) : trimmed;
    node.nodeValue = original.replace(trimmed, translated);
  });

  document.querySelectorAll("[aria-label], [title]").forEach((el) => {
    ["aria-label", "title"].forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      const key = `gradientOriginal${attr === "title" ? "Title" : "Aria"}`;
      if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
      const original = el.dataset[key];
      el.setAttribute(attr, currentLanguage === "en" ? (ATTR_EN[original] ?? EN_TEXT[original] ?? original) : original);
    });
  });
}

function refreshDynamicLanguage() {
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === "en" ? "Gradient — generative zen space V14" : "Gradient — espace zen génératif V14";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = currentLanguage === "en"
    ? "Gradient is a generative audiovisual experience combining breathing, color, movement and ambient soundscapes."
    : "Gradient est une expérience audiovisuelle générative de respiration, couleur, mouvement et paysages sonores ambient.";
  languageCurrent.textContent = currentLanguage.toUpperCase();
  languageNext.textContent = currentLanguage === "fr" ? "EN" : "FR";
  languageButton.setAttribute("aria-label", currentLanguage === "fr" ? "Passer l’interface en anglais" : "Switch the interface to French");
  languageButton.title = currentLanguage === "fr" ? "English" : "Français";
  const pattern = BREATH_PATTERNS[breathPattern] ?? BREATH_PATTERNS.relax;
  breathGuideInhale.textContent = tr("Inspirer");
  breathGuideExhale.textContent = tr("Expirer");
  breathGuideInhaleTime.textContent = `${pattern.inhale} s`;
  breathGuideExhaleTime.textContent = `${pattern.exhale} s`;
  if (breathing) updateBreathCountdown();
  else { breathPhase.textContent = tr("Respirer"); breathDetail.textContent = tr("démarrer un cycle"); }
  if (audioEnabled) {
    soundLabel.textContent = soundModeLabel(currentSoundMode);
    audioStatus.textContent = breathing ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · ${soundModeLabel(currentSoundMode).toLowerCase()}` : `${soundModeLabel(currentSoundMode)} · ${soundModeTonality(currentSoundMode)}`;
  } else {
    soundLabel.textContent = tr("Paysage sonore");
    audioStatus.textContent = breathing ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · silence` : tr("Silence · paysage actif");
  }
  setSessionDuration(selectedSessionMinutes, false);
  if (sessionActive) sessionLabel.textContent = currentLanguage === "en" ? "Stop session" : "Arrêter la session";
}

function setLanguage(lang, persist = true) {
  currentLanguage = lang === "en" ? "en" : "fr";
  translateStaticText();
  refreshDynamicLanguage();
  if (persist) localStorage.setItem("gradient-zen-language", currentLanguage);
}

function loadPreferences() {
  try {
    const keys = [
      ["gradient-zen-preferences-v14", 14],
      ["gradient-zen-preferences-v10", 10],
      ["gradient-zen-preferences-v9", 9],
      ["gradient-zen-preferences-v8", 8],
      ["gradient-zen-preferences-v7", 7],
      ["gradient-zen-preferences-v6", 6],
      ["gradient-zen-preferences-v5", 5],
      ["gradient-zen-preferences-v4", 4],
      ["gradient-zen-preferences-v3", 3],
    ];
    for (const [key, version] of keys) {
      const raw = localStorage.getItem(key);
      if (raw) return { ...JSON.parse(raw), _storageVersion: version };
    }
    return {};
  } catch {
    return {};
  }
}

function savePreferences() {
  try {
    localStorage.setItem("gradient-zen-preferences-v14", JSON.stringify({
      palette: currentPalette,
      soundMode: currentSoundMode,
      animationMode,
      breathPattern,
      sessionMinutes: selectedSessionMinutes,
      journey: autoJourneyEnabled,
      volume: Number(volumeRange.value),
      intensity: visualIntensity,
      motion: motionEnabled,
      autodim: autodimEnabled,
    }));
  } catch {
    // Le stockage local peut être indisponible dans certains contextes privés.
  }
}

function rgb([r, g, b]) {
  return `rgb(${r} ${g} ${b})`;
}

function gradientFor(palette) {
  return `linear-gradient(135deg, ${palette.background.map(rgb).join(", ")})`;
}

function parseRgba(value) {
  const numbers = value.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255, 0.2];
  return [numbers[0], numbers[1], numbers[2], numbers[3] ?? 1];
}

let currentWaveColors = palettes.mist.waves.map(parseRgba);
let targetWaveColors = palettes.mist.waves.map(parseRgba);

function crossfadeBackground(palette, immediate = false) {
  const nextLayer = immediate ? visibleColorLayer : 1 - visibleColorLayer;
  colorLayers[nextLayer].style.backgroundImage = gradientFor(palette);

  if (immediate) {
    colorLayers[visibleColorLayer].classList.add("is-visible");
    colorLayers[1 - visibleColorLayer].classList.remove("is-visible");
    return;
  }

  colorLayers[nextLayer].classList.add("is-visible");
  colorLayers[visibleColorLayer].classList.remove("is-visible");
  visibleColorLayer = nextLayer;
}

function applyPalette(name, persist = true, immediate = false) {
  const palette = palettes[name] ?? palettes.mist;
  currentPalette = palettes[name] ? name : "mist";
  document.body.dataset.palette = currentPalette;
  targetWaveColors = palette.waves.map(parseRgba);
  if (immediate || !motionEnabled) currentWaveColors = targetWaveColors.map((color) => [...color]);

  crossfadeBackground(palette, immediate);
  document.documentElement.style.setProperty("--accent-rgb", palette.accent);
  document.documentElement.style.setProperty("--accent-soft-rgb", palette.accentSoft);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", palette.theme);

  paletteButtons.forEach((button) => {
    const active = button.dataset.palette === currentPalette;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  breathButton.animate?.([
    { transform: "scale(1)" },
    { transform: "scale(1.025)" },
    { transform: "scale(1)" },
  ], { duration: 1800, easing: "cubic-bezier(.22,.8,.32,1)" });

  if (!motionEnabled && typeof redraw === "function") redraw();
  if (persist) savePreferences();
}

function updateRangeFill(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const value = Number(input.value);
  const percent = ((value - min) / (max - min)) * 100;
  input.style.background = `linear-gradient(90deg, #657b80 0 ${percent}%, #dce1de ${percent}% 100%)`;
}

// ---------- Respiration guidée ----------

let breathing = false;
let breathTimers = [];
let breathTickerId = null;
let breathCycleStartedAt = 0;
let breathState = "idle";

function clearBreathTimers() {
  breathTimers.forEach((timer) => window.clearTimeout(timer));
  breathTimers = [];
  if (breathTickerId !== null) {
    window.clearInterval(breathTickerId);
    breathTickerId = null;
  }
}

function updateBreathCountdown() {
  if (!breathing || !breathTimer) return;

  const pattern = BREATH_PATTERNS[breathPattern] ?? BREATH_PATTERNS.relax;
  const cycleDuration = pattern.inhale + pattern.exhale;
  const elapsed = (performance.now() - breathCycleStartedAt) / 1000;
  const cycleElapsed = ((elapsed % cycleDuration) + cycleDuration) % cycleDuration;
  const inhaling = cycleElapsed < pattern.inhale;
  const phaseDuration = inhaling ? pattern.inhale : pattern.exhale;
  const phaseElapsed = inhaling ? cycleElapsed : cycleElapsed - pattern.inhale;
  const remaining = Math.max(1, Math.ceil(phaseDuration - phaseElapsed));
  const nextState = inhaling ? "inhale" : "exhale";

  if (nextState !== breathState) {
    breathState = nextState;
    breathPhase.textContent = inhaling ? tr("Inspirer") : tr("Expirer");
    breathButton.dataset.breathPhase = nextState;
  }

  breathTimer.textContent = String(remaining);
  breathDetail.textContent = inhaling
    ? `${remaining} s · ${currentLanguage === "en" ? "slowly, without forcing" : "lentement, sans forcer"}`
    : `${remaining} s · ${currentLanguage === "en" ? "release gently" : "relâchez doucement"}`;
}

function setBreathPattern(name, persist = true) {
  breathPattern = BREATH_PATTERNS[name] ? name : "relax";
  const pattern = BREATH_PATTERNS[breathPattern];
  const cycleDuration = pattern.inhale + pattern.exhale;
  breathButton.dataset.breathPattern = breathPattern;
  breathButton.style.setProperty("--breath-cycle-duration", `${cycleDuration}s`);
  document.documentElement.style.setProperty("--breath-cycle-duration", `${cycleDuration}s`);
  document.documentElement.style.setProperty("--inhale-ratio", `${(pattern.inhale / cycleDuration) * 100}%`);
  if (breathGuideInhaleTime) breathGuideInhaleTime.textContent = `${pattern.inhale} s`;
  if (breathGuideExhaleTime) breathGuideExhaleTime.textContent = `${pattern.exhale} s`;

  breathPatternButtons.forEach((button) => {
    const active = button.dataset.breathPattern === breathPattern;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (breathing) {
    clearBreathTimers();
    scheduleBreathCycle();
  }
  if (persist) savePreferences();
}

function scheduleBreathCycle() {
  if (!breathing) return;
  breathCycleStartedAt = performance.now();
  breathState = "";
  updateBreathCountdown();
  breathTickerId = window.setInterval(updateBreathCountdown, 125);
}

function setBreathing(enabled) {
  breathing = enabled;
  breathButton.classList.toggle("is-breathing", enabled);
  breathButton.setAttribute("aria-pressed", String(enabled));
  clearBreathTimers();

  if (enabled) {
    scheduleBreathCycle();
    audioStatus.textContent = audioEnabled ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · ${soundModeLabel(currentSoundMode).toLowerCase()}` : `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · silence`;
  } else {
    breathState = "idle";
    breathButton.dataset.breathPhase = "idle";
    breathPhase.textContent = tr("Respirer");
    breathDetail.textContent = tr("démarrer un cycle");
    if (breathTimer) breathTimer.textContent = "";
    audioStatus.textContent = audioEnabled ? `${soundModeLabel(currentSoundMode)} · ${currentLanguage === "en" ? "active" : "actif"}` : tr("Silence · paysage actif");
  }
}

function toggleBreathing() {
  setBreathing(!breathing);
  wakeInterface();
}

// ---------- Animation p5.js ----------

const waves = [];
const motes = [];
const ripples = [];
const orbiters = [];
const constellationNodes = [];
const NUM_WAVES = 7;
const NUM_MOTES = 52;
let time = 0;
let pointerTargetX = 0.5;
let pointerTargetY = 0.5;
let pointerX = 0.5;
let pointerY = 0.5;
let p5Ready = false;

// Utilitaire indépendant de p5 : certaines optimisations peuvent être planifiées
// avant l’appel de setup(). On évite donc toute dépendance à p5.random() ici.
function nativeRandomBetween(min = 0, max = 1) {
  return min + Math.random() * (max - min);
}

// État audio-réactif : les formes suivent surtout l’énergie réellement émise.
// La souris reste volontairement une influence secondaire et très douce.
const audioReactive = { bass: 0, mid: 0, high: 0, energy: 0, transient: 0 };

function createWave(index) {
  return {
    colorIndex: index % currentWaveColors.length,
    amplitude: random(35, 105),
    frequency: random(0.0022, 0.007),
    offset: random(TWO_PI),
    verticalRatio: map(index, 0, NUM_WAVES - 1, 0.22, 0.8),
    speed: random(0.55, 1.1),
    secondary: random(7, 18),
  };
}

function createMote() {
  return {
    x: nativeRandomBetween(0, 1),
    y: nativeRandomBetween(0, 1),
    size: nativeRandomBetween(0.7, 2.5),
    drift: nativeRandomBetween(0.00006, 0.0002),
    offset: nativeRandomBetween(0, Math.PI * 2),
    alpha: nativeRandomBetween(12, 38),
  };
}

function createOrbiter(index) {
  return {
    radiusRatio: 0.08 + index * 0.045,
    phase: nativeRandomBetween(0, Math.PI * 2),
    speed: nativeRandomBetween(0.0008, 0.0024) * (index % 2 === 0 ? 1 : -1),
    eccentricity: nativeRandomBetween(0.58, 0.92),
    size: nativeRandomBetween(1.3, 3.2),
    colorIndex: index % currentWaveColors.length,
  };
}

function createConstellationNode(index) {
  return {
    x: nativeRandomBetween(0.08, 0.92),
    y: nativeRandomBetween(0.10, 0.90),
    phase: nativeRandomBetween(0, Math.PI * 2),
    speed: nativeRandomBetween(0.00025, 0.0008),
    driftX: nativeRandomBetween(18, 54),
    driftY: nativeRandomBetween(12, 38),
    size: nativeRandomBetween(1.6, 3.8),
    colorIndex: index % currentWaveColors.length,
  };
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
  noFill();
  strokeWeight(1.35);

  for (let i = 0; i < NUM_WAVES; i += 1) waves.push(createWave(i));
  for (let i = 0; i < NUM_MOTES; i += 1) motes.push(createMote());
  for (let i = 0; i < 13; i += 1) orbiters.push(createOrbiter(i));
  for (let i = 0; i < 34; i += 1) constellationNodes.push(createConstellationNode(i));

  p5Ready = true;
  window.dispatchEvent(new CustomEvent("gradient:p5-ready"));

  if (!motionEnabled) {
    noLoop();
    redraw();
  }
}

function updateWaveColorTransition() {
  const amount = motionEnabled ? 0.018 : 1;
  currentWaveColors = currentWaveColors.map((color, index) => {
    const target = targetWaveColors[index % targetWaveColors.length];
    return color.map((value, channel) => lerp(value, target[channel], amount));
  });
}

function strokePalette(index, alphaMultiplier = 1) {
  const [r, g, b, a] = currentWaveColors[index % currentWaveColors.length];
  stroke(r, g, b, Math.min(255, a * 255 * alphaMultiplier * 1.38));
}

const VISUAL_IDENTITIES = {
  mist:   { density: 0.92, drift: 0.72, size: 1.05, vertical: -0.08, shimmer: 0.72 },
  ocean:  { density: 0.82, drift: 1.18, size: 0.92, vertical: 0.02, shimmer: 0.55 },
  dawn:   { density: 1.18, drift: 0.54, size: 1.18, vertical: -0.16, shimmer: 0.88 },
  forest: { density: 1.05, drift: 0.66, size: 0.86, vertical: -0.32, shimmer: 0.48 },
  sand:   { density: 0.76, drift: 0.96, size: 0.72, vertical: 0.04, shimmer: 0.36 },
};

function drawMotes(multiplier = 1) {
  noStroke();
  const identity = VISUAL_IDENTITIES[currentPalette] ?? VISUAL_IDENTITIES.mist;
  const audioLift = audioEnabled ? (0.88 + audioReactive.high * 0.52 + audioReactive.energy * 0.22) : 1;
  const visibleCount = Math.round(map(visualIntensity, 20, 100, 18, NUM_MOTES) * multiplier * audioLift * identity.density);

  for (let i = 0; i < Math.min(visibleCount, motes.length); i += 1) {
    const mote = motes[i];
    const driftSpeed = identity.drift * (1 + audioReactive.mid * 0.65 + audioReactive.high * 0.35);
    let driftX = sin(time * mote.drift * driftSpeed + mote.offset) * (18 + audioReactive.high * 12);
    let driftY = cos(time * mote.drift * 0.7 * driftSpeed + mote.offset) * (14 + audioReactive.mid * 8);

    // Chaque ambiance possède sa propre logique de déplacement.
    if (currentPalette === "ocean") {
      driftX *= 2.15;
      driftY += sin(time * 0.18 + mote.offset) * 8;
    } else if (currentPalette === "forest") {
      driftX *= 0.55;
      driftY -= ((time * (7 + mote.drift * 9) + mote.offset * 18) % 70);
    } else if (currentPalette === "dawn") {
      driftX *= 0.68;
      driftY *= 0.52;
    } else if (currentPalette === "sand") {
      driftX *= 1.55;
      driftY *= 0.36;
    } else {
      driftX *= 0.86;
      driftY *= 0.82;
    }

    driftY += identity.vertical * 24;
    const alpha = mote.alpha * multiplier * identity.shimmer * (1 + audioReactive.high * 0.8);
    fill(255, 255, 255, alpha);
    circle(
      mote.x * width + driftX,
      mote.y * height + driftY,
      mote.size * identity.size * (1 + audioReactive.high * 0.38),
    );
  }
}

function drawRipples() {
  noFill();

  for (let i = ripples.length - 1; i >= 0; i -= 1) {
    const ripple = ripples[i];
    ripple.life += motionEnabled ? 1 : 4;
    const progress = constrain(ripple.life / 120, 0, 1);
    const radius = lerp(12, 240, easeOutCubic(progress));
    const alpha = lerp(78, 0, progress);
    stroke(255, 255, 255, alpha);
    strokeWeight(lerp(1.3, 0.3, progress));

    if ((ripple.palette ?? currentPalette) === "ocean") {
      for (let ring = 0; ring < 3; ring += 1) {
        arc(ripple.x, ripple.y, radius * (1.55 + ring * .36), radius * (.7 + ring * .12), PI * .08, PI * .92);
      }
    } else if ((ripple.palette ?? currentPalette) === "forest") {
      push();
      translate(ripple.x, ripple.y);
      rotate(progress * .45);
      ellipse(0, 0, radius * 1.1, radius * 1.8);
      ellipse(0, 0, radius * .7, radius * 1.35);
      pop();
    } else if ((ripple.palette ?? currentPalette) === "dawn") {
      circle(ripple.x, ripple.y, radius * 2.2);
      circle(ripple.x, ripple.y, radius * 1.35);
    } else if ((ripple.palette ?? currentPalette) === "sand") {
      ellipse(ripple.x, ripple.y, radius * 2.5, radius * .82);
      ellipse(ripple.x, ripple.y, radius * 1.75, radius * .52);
    } else {
      circle(ripple.x, ripple.y, radius * 2);
      circle(ripple.x, ripple.y, radius * 1.22);
    }

    if (progress >= 1) ripples.splice(i, 1);
  }
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function commonMotionValues() {
  pointerX = lerp(pointerX, pointerTargetX, 0.018);
  pointerY = lerp(pointerY, pointerTargetY, 0.018);

  // La souris ne module plus que légèrement le paysage (±3 % environ).
  const pointerAmplitude = 1 + (pointerX - 0.5) * 0.06;
  const pointerParallax = (pointerY - 0.5) * 8;

  // Le son devient la source principale du mouvement :
  // graves = amplitude / expansion, médiums = fluidité, aigus = détail / scintillement.
  const soundAmplitude = 1
    + audioReactive.bass * 0.78
    + audioReactive.mid * 0.28
    + audioReactive.transient * 0.34;
  const soundSpeed = 1 + audioReactive.mid * 0.48 + audioReactive.high * 0.24;
  const verticalAudioShift = (audioReactive.mid - audioReactive.bass) * 11;

  return {
    pointerAmplitude: pointerAmplitude * soundAmplitude,
    verticalParallax: pointerParallax + verticalAudioShift,
    intensityFactor: map(visualIntensity, 20, 100, 0.58, 1.22) * (1 + audioReactive.energy * 0.20),
    soundSpeed,
    soundGlow: 1 + audioReactive.high * 0.9 + audioReactive.energy * 0.28,
  };
}

function drawWaves() {
  const { pointerAmplitude, verticalParallax, intensityFactor, soundSpeed } = commonMotionValues();
  noFill();

  for (const wave of waves) {
    strokePalette(wave.colorIndex, 1);
    strokeWeight(1.45 + wave.colorIndex * 0.10);
    beginShape();

    for (let x = -30; x <= width + 30; x += 14) {
      const angle = x * wave.frequency + time * 0.018 * wave.speed * soundSpeed + wave.offset;
      const secondary = sin(angle * 0.46 + wave.offset) * wave.secondary;
      const y = height * wave.verticalRatio
        + verticalParallax * (wave.verticalRatio - 0.5)
        + sin(angle) * wave.amplitude * pointerAmplitude * intensityFactor
        + secondary;
      curveVertex(x, y);
    }

    endShape();
  }
}

function drawSilk() {
  const { pointerAmplitude, verticalParallax, intensityFactor, soundSpeed } = commonMotionValues();
  noFill();
  const bands = 5;

  for (let band = 0; band < bands; band += 1) {
    for (let thread = 0; thread < 7; thread += 1) {
      const wave = waves[(band + thread) % waves.length];
      strokePalette(band, 0.58 - thread * 0.038);
      strokeWeight(0.9 + thread * 0.035);
      beginShape();

      for (let x = -50; x <= width + 50; x += 18) {
        const base = height * map(band, 0, bands - 1, 0.19, 0.83);
        const angle = x * (wave.frequency * 0.72) + time * 0.0105 * wave.speed * soundSpeed + wave.offset + thread * 0.11;
        const y = base
          + verticalParallax * (band / bands - 0.5)
          + sin(angle) * wave.amplitude * 0.82 * pointerAmplitude * intensityFactor
          + cos(angle * 0.37) * 30
          + thread * 6;
        curveVertex(x, y);
      }
      endShape();
    }
  }
}

function drawOrbit() {
  const { soundSpeed, soundGlow } = commonMotionValues();
  const centerX = width * (0.5 + (pointerX - 0.5) * 0.025);
  const centerY = height * (0.5 + (pointerY - 0.5) * 0.025);
  const base = min(width, height) * map(visualIntensity, 20, 100, 0.72, 1.05)
    * (1 + audioReactive.bass * 0.16 + audioReactive.transient * 0.08);

  noFill();
  for (let i = 0; i < 8; i += 1) {
    strokePalette(i, 0.50);
    strokeWeight(0.95);
    push();
    translate(centerX, centerY);
    rotate(time * 0.00035 * soundSpeed * (i % 2 ? -1 : 1) + i * 0.18);
    ellipse(0, 0, base * (0.28 + i * 0.09), base * (0.14 + i * 0.055));
    pop();
  }

  noStroke();
  for (const orbiter of orbiters) {
    const angle = time * orbiter.speed + orbiter.phase;
    const radius = base * orbiter.radiusRatio;
    const x = centerX + cos(angle) * radius;
    const y = centerY + sin(angle) * radius * orbiter.eccentricity;
    const [r, g, b, a] = currentWaveColors[orbiter.colorIndex];
    fill(r, g, b, a * 255 * 1.6 * soundGlow);
    circle(x, y, orbiter.size * (1 + audioReactive.high * 0.42));
  }
}

function drawBloom() {
  const { soundSpeed } = commonMotionValues();
  const cx = width * (0.5 + (pointerX - 0.5) * 0.02);
  const cy = height * (0.5 + (pointerY - 0.5) * 0.02);
  const breathPulse = breathing ? (0.88 + 0.14 * (0.5 + 0.5 * sin((time / 600) * TWO_PI))) : 1;
  const audioPulse = 1 + audioReactive.bass * 0.22 + audioReactive.mid * 0.10 + audioReactive.transient * 0.12;
  const baseRadius = min(width, height) * map(visualIntensity, 20, 100, 0.16, 0.3) * breathPulse * audioPulse;

  noFill();
  for (let layer = 0; layer < 8; layer += 1) {
    strokePalette(layer, 0.66 - layer * 0.040);
    strokeWeight(1.0);
    beginShape();
    const points = 120;
    for (let i = 0; i <= points; i += 1) {
      const angle = map(i, 0, points, 0, TWO_PI);
      const petals = 5 + (layer % 3);
      const wobble = sin(angle * petals + time * 0.004 * soundSpeed + layer * 0.4) * (18 + layer * 3 + audioReactive.mid * 10);
      const ripple = sin(angle * 2 - time * 0.002 * soundSpeed + layer) * (8 + audioReactive.high * 7);
      const radius = baseRadius + layer * 14 + wobble + ripple;
      curveVertex(cx + cos(angle) * radius, cy + sin(angle) * radius);
    }
    endShape(CLOSE);
  }
}

function drawTopography() {
  const { verticalParallax, intensityFactor } = commonMotionValues();
  noFill();
  const lines = Math.round(map(visualIntensity, 20, 100, 9, 18));
  const spacing = height / (lines + 1);

  for (let row = 0; row < lines; row += 1) {
    strokePalette(row, 0.68);
    strokeWeight(1.0 + (row % 3) * 0.10);
    beginShape();
    for (let x = -20; x <= width + 20; x += 12) {
      const nx = x * 0.0024;
      const ny = row * 0.16;
      const terrain = (noise(nx, ny, time * 0.00055 * (1 + audioReactive.mid * 0.45)) - 0.5)
        * 118 * intensityFactor * (1 + audioReactive.bass * 0.30);
      const harmonic = sin(x * 0.006 + row * 0.7 + time * 0.006 * (1 + audioReactive.high * 0.30))
        * (18 + audioReactive.mid * 12);
      const y = spacing * (row + 1) + terrain + harmonic + verticalParallax * ((row / lines) - 0.5);
      curveVertex(x, y);
    }
    endShape();
  }
}

function drawConstellation() {
  commonMotionValues();
  const points = constellationNodes.map((node) => ({
    x: node.x * width + sin(time * node.speed * (1 + audioReactive.high * 0.45) + node.phase) * node.driftX + (pointerX - 0.5) * 7,
    y: node.y * height + cos(time * node.speed * 0.78 * (1 + audioReactive.mid * 0.35) + node.phase) * node.driftY + (pointerY - 0.5) * 5,
    node,
  }));
  const threshold = map(visualIntensity, 20, 100, 105, 175)
    * (1 + audioReactive.mid * 0.24 + audioReactive.transient * 0.16);

  noFill();
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
      if (d < threshold) {
        const alpha = map(d, 0, threshold, 0.46, 0.04);
        strokePalette(points[i].node.colorIndex, alpha);
        strokeWeight(0.72);
        line(points[i].x, points[i].y, points[j].x, points[j].y);
      }
    }
  }

  noStroke();
  points.forEach(({ x, y, node }, index) => {
    const [r, g, b, a] = currentWaveColors[node.colorIndex];
    const pulse = 0.78 + 0.22 * sin(time * 0.018 * (1 + audioReactive.high * 0.4) + node.phase);
    fill(r, g, b, a * 255 * 2.05 * (1 + audioReactive.high * 0.65));
    circle(x, y, node.size * pulse * (1 + audioReactive.high * 0.48) + (index % 7 === 0 ? 1.2 : 0));
  });
}

function draw() {
  clear();
  updateAudioReactiveState();
  updateWaveColorTransition();

  if (animationMode === "orbit") drawMotes(0.55);
  else if (animationMode === "bloom") drawMotes(0.75);
  else if (animationMode === "constellation") drawMotes(0.34);
  else if (animationMode === "topography") drawMotes(0.42);
  else drawMotes(1);

  if (animationMode === "silk") drawSilk();
  else if (animationMode === "orbit") drawOrbit();
  else if (animationMode === "bloom") drawBloom();
  else if (animationMode === "topography") drawTopography();
  else if (animationMode === "constellation") drawConstellation();
  else drawWaves();

  drawRipples();
  time += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!motionEnabled) redraw();
}

function setMotion(enabled, persist = true) {
  motionEnabled = Boolean(enabled) && !reducedMotionQuery.matches;
  motionToggle.checked = motionEnabled;

  if (typeof loop === "function" && typeof noLoop === "function") {
    if (motionEnabled) loop();
    else {
      noLoop();
      currentWaveColors = targetWaveColors.map((color) => [...color]);
      redraw();
    }
  }

  if (persist) savePreferences();
}

function setAnimationMode(mode, persist = true) {
  animationMode = ["waves", "silk", "orbit", "bloom", "topography", "constellation"].includes(mode) ? mode : "waves";
  animationModeButtons.forEach((button) => {
    const active = button.dataset.animationMode === animationMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  ripples.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, life: 0 });
  if (!motionEnabled && typeof redraw === "function") redraw();
  if (persist) savePreferences();
}

background.addEventListener("pointermove", (event) => {
  pointerTargetX = event.clientX / Math.max(window.innerWidth, 1);
  pointerTargetY = event.clientY / Math.max(window.innerHeight, 1);
});

background.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a, dialog, input")) return;
  ripples.push({ x: event.clientX, y: event.clientY, life: 0, palette: currentPalette });
  if (!motionEnabled && typeof redraw === "function") redraw();
});

// ---------- Audio Tone.js : paysages ambient harmoniques ----------

const TONE_CDN_URL = "https://cdn.jsdelivr.net/npm/tone@14.8.44/build/Tone.min.js";
let toneLoadPromise = null;

function loadToneLibrary() {
  if (window.Tone) return Promise.resolve(window.Tone);
  if (toneLoadPromise) return toneLoadPromise;

  toneLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TONE_CDN_URL;
    script.async = true;
    script.dataset.gradientTone = "true";
    script.addEventListener("load", () => window.Tone ? resolve(window.Tone) : reject(new Error("Tone.js chargé sans objet Tone")), { once: true });
    script.addEventListener("error", () => reject(new Error("Impossible de charger Tone.js")), { once: true });
    document.head.appendChild(script);
  });

  return toneLoadPromise;
}

function normalizedDbEnergy(db, boost = 1) {
  if (!Number.isFinite(db)) return 0;
  // Une conversion souple adaptée aux nappes ambient, dont les niveaux instantanés sont bas.
  const linear = Math.pow(10, db / 20);
  return clamp(Math.pow(linear * 18 * boost, 0.62), 0, 1);
}

function spectrumBandEnergy(values, minHz, maxHz, sampleRate, boost = 1) {
  if (!values || values.length === 0) return 0;
  const nyquist = sampleRate / 2;
  const first = Math.max(0, Math.floor((minHz / nyquist) * values.length));
  const last = Math.min(values.length - 1, Math.ceil((maxHz / nyquist) * values.length));
  if (last < first) return 0;

  let sum = 0;
  let count = 0;
  for (let i = first; i <= last; i += 1) {
    sum += normalizedDbEnergy(Number(values[i]), boost);
    count += 1;
  }
  return count ? sum / count : 0;
}

function updateAudioReactiveState() {
  const target = { bass: 0, mid: 0, high: 0, energy: 0 };

  if (audioEnabled && audioEngine?.fft) {
    const spectrum = audioEngine.fft.getValue();
    const sampleRate = window.Tone?.getContext?.().sampleRate || 48000;
    target.bass = spectrumBandEnergy(spectrum, 35, 190, sampleRate, 1.65);
    target.mid = spectrumBandEnergy(spectrum, 190, 1800, sampleRate, 1.16);
    target.high = spectrumBandEnergy(spectrum, 1800, 9000, sampleRate, 1.30);
    target.energy = clamp(target.bass * 0.46 + target.mid * 0.36 + target.high * 0.18, 0, 1);
  }

  // Attaque assez vive, relâchement lent : l’image respire au lieu de trembler.
  for (const key of ["bass", "mid", "high", "energy"]) {
    const speed = target[key] > audioReactive[key] ? 0.14 : 0.045;
    audioReactive[key] += (target[key] - audioReactive[key]) * speed;
  }
  audioReactive.transient *= 0.945;
}

let audioEnabled = false;
let audioTimerId = null;
let audioEngine = null;
const audioAuxTimers = new Set();
const harmonicState = {
  chordIndex: 0,
  melodyIndex: 0,
  motifIndex: 0,
  bassIndex: 0,
  lastEvent: null,
  repeatedEvents: 0,
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function volumeToGain(value) {
  const normalized = clamp(Number(value) / 100, 0, 1);
  // V9 : courbe de sortie conservée, avec analyse audio post-master. Le limiteur final protège les crêtes.
  // À 50 % : ~0,94 ; à 75 % : ~1,36 ; à 100 % : 1,82.
  return Math.pow(normalized, 0.95) * 1.82;
}

function scheduleAudioTimeout(callback, delay) {
  const id = window.setTimeout(() => {
    audioAuxTimers.delete(id);
    callback();
  }, delay);
  audioAuxTimers.add(id);
  return id;
}

function clearAudioTimer() {
  if (audioTimerId !== null) {
    window.clearTimeout(audioTimerId);
    audioTimerId = null;
  }
}

function clearAudioAuxTimers() {
  audioAuxTimers.forEach((id) => window.clearTimeout(id));
  audioAuxTimers.clear();
}

function chooseWeightedEvent(weights) {
  const adjusted = { ...weights };

  // Évite qu'un même geste musical soit répété trop souvent.
  if (harmonicState.lastEvent && adjusted[harmonicState.lastEvent]) {
    const penalty = harmonicState.repeatedEvents >= 1 ? 0.32 : 0.64;
    adjusted[harmonicState.lastEvent] *= penalty;
  }

  // Une petite part de texture reste toujours possible, sans casser la tonalité.
  adjusted.texture = (adjusted.texture ?? 0) + 0.11;
  adjusted.counterpoint = (adjusted.counterpoint ?? 0) + 0.08;

  const entries = Object.entries(adjusted);
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let cursor = Math.random() * total;

  for (const [name, weight] of entries) {
    cursor -= weight;
    if (cursor <= 0) {
      if (name === harmonicState.lastEvent) harmonicState.repeatedEvents += 1;
      else harmonicState.repeatedEvents = 0;
      harmonicState.lastEvent = name;
      return name;
    }
  }
  return entries[entries.length - 1][0];
}

function progressiveIndex(length, current, maxStep = 1) {
  if (length <= 1) return 0;
  const steps = maxStep === 1
    ? [-1, 0, 1, 1]
    : [-2, -1, 0, 1, 1, 2];
  const step = randomItem(steps);
  return (current + step + length) % length;
}

function nextChord(config) {
  harmonicState.chordIndex = progressiveIndex(config.padChords.length, harmonicState.chordIndex, 1);
  return config.padChords[harmonicState.chordIndex];
}

function nextScaleNote(notes, stateKey = "melodyIndex", maxStep = 2) {
  const previous = Number.isFinite(harmonicState[stateKey]) ? harmonicState[stateKey] : 0;
  harmonicState[stateKey] = progressiveIndex(notes.length, previous % notes.length, maxStep);
  return notes[harmonicState[stateKey]];
}

function nearbyHarmonyNotes(config, count = 2) {
  const notes = [];
  let cursor = harmonicState.melodyIndex % config.airNotes.length;
  for (let i = 0; i < count; i += 1) {
    cursor = progressiveIndex(config.airNotes.length, cursor, 1);
    notes.push(config.airNotes[cursor]);
  }
  harmonicState.melodyIndex = cursor;
  return [...new Set(notes)];
}

async function createAudioEngine() {
  if (audioEngine) return audioEngine;

  const limiter = new Tone.Limiter(-1.0).toDestination();
  const master = new Tone.Gain(0).connect(limiter);
  const fft = new Tone.FFT(256, 0.86);
  master.connect(fft);

  const forceChannels = (node) => {
    try {
      // Le nombre de canaux par défaut reste à 2 ; on évite seulement qu’il varie
      // dynamiquement au gré des connexions, ce que Firefox signale sur BiquadFilterNode.
      node.channelCountMode = "explicit";
    } catch { /* Certains wrappers/navigateurs n’exposent pas cette propriété. */ }
    return node;
  };

  const reverb = new Tone.Reverb({ decay: 31, preDelay: 0.18, wet: 0.74 }).connect(master);
  const delay = new Tone.FeedbackDelay("8n.", 0.24);
  delay.wet.value = 0.22;
  delay.connect(reverb);

  const chorus = new Tone.Chorus({ frequency: 0.12, delayTime: 4.5, depth: 0.22, wet: 0.12 }).start();
  chorus.connect(reverb);

  // Bus grave renforcé : le sub apporte la profondeur, les harmoniques rendent la basse
  // perceptible même sur de petits haut-parleurs.
  const bassBus = new Tone.Gain(1.62).connect(reverb);
  const lowFilter = forceChannels(new Tone.Filter({ frequency: 760, type: "lowpass", rolloff: -24, Q: 0.70 }));
  const warmFilter = forceChannels(new Tone.Filter({ frequency: 1450, type: "lowpass", rolloff: -12, Q: 0.42 }));
  const airFilter = forceChannels(new Tone.Filter({ frequency: 2200, type: "highpass", rolloff: -12, Q: 0.35 }));
  lowFilter.connect(bassBus);
  warmFilter.connect(chorus);
  airFilter.connect(delay);

  const bedBus = new Tone.Gain(0.96).connect(lowFilter);
  const bedPanners = [new Tone.Panner(-0.24).connect(bedBus), new Tone.Panner(0.24).connect(bedBus)];
  const bedVoices = [0, 1].map((index) => {
    const voice = new Tone.AMSynth({
      harmonicity: index === 0 ? 0.5 : 1.5,
      oscillator: { type: index === 0 ? "sine" : "triangle" },
      modulation: { type: "sine" },
      envelope: { attack: 7 + index * 2, decay: 3, sustain: 0.76, release: 15 },
      modulationEnvelope: { attack: 10, decay: 4, sustain: 0.2, release: 16 },
    }).connect(bedPanners[index]);
    voice.volume.value = -21 - index * 2;
    voice.detune.value = index === 0 ? -4 : 5;
    return voice;
  });

  const subGain = new Tone.Gain(0.050).connect(lowFilter);
  const sub = new Tone.Oscillator("C1", "sine").connect(subGain);
  sub.start();

  const makePad = (type, destination, volume) => {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type },
      envelope: { attack: 3.6, decay: 2.8, sustain: 0.34, release: 12 },
    }).connect(destination);
    synth.volume.value = volume;
    return synth;
  };

  const padPanners = [
    new Tone.Panner(-0.38).connect(warmFilter),
    new Tone.Panner(0.32).connect(warmFilter),
    new Tone.Panner(0).connect(lowFilter),
  ];
  const padLayers = [
    makePad("sine", padPanners[0], -31),
    makePad("triangle", padPanners[1], -33),
    makePad("sawtooth", padPanners[2], -40),
  ];

  const airPanners = [new Tone.Panner(-0.48).connect(airFilter), new Tone.Panner(0.46).connect(airFilter)];
  const airLayers = [
    makePad("triangle", airPanners[0], -38),
    makePad("sine", airPanners[1], -40),
  ];

  const chimePanner = new Tone.Panner(0).connect(delay);
  const chime = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.035, decay: 2.9, sustain: 0, release: 7.5 },
  }).connect(chimePanner);
  chime.volume.value = -39;

  const organicPanner = new Tone.Panner(0).connect(warmFilter);
  const organicVoice = new Tone.FMSynth({
    harmonicity: 1.5,
    modulationIndex: 1.8,
    oscillator: { type: "sine" },
    modulation: { type: "triangle" },
    envelope: { attack: 2.4, decay: 2.5, sustain: 0.18, release: 9 },
    modulationEnvelope: { attack: 3, decay: 2, sustain: 0.1, release: 8 },
  }).connect(organicPanner);
  organicVoice.volume.value = -37;

  const bassPanners = [new Tone.Panner(-0.16).connect(lowFilter), new Tone.Panner(0.16).connect(lowFilter)];
  const lowPulseVoices = ["sine", "triangle"].map((type, index) => {
    const synth = new Tone.Synth({
      oscillator: { type },
      envelope: { attack: 1.25 + index * 0.45, decay: 2.2, sustain: 0.28, release: 9 },
    }).connect(bassPanners[index]);
    synth.volume.value = -25 - index * 2;
    return synth;
  });

  const bassHarmonicPanner = new Tone.Panner(0).connect(warmFilter);
  const bassHarmonicVoice = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 1.1, decay: 2.4, sustain: 0.18, release: 7.5 },
  }).connect(bassHarmonicPanner);
  bassHarmonicVoice.volume.value = -27;

  // Voix courte et cristalline pour les motifs minimalistes du preset Prisme.
  const motifPanner = new Tone.Panner(0).connect(delay);
  const motifVoice = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "square" },
    envelope: { attack: 0.04, decay: 0.9, sustain: 0.035, release: 3.8 },
  }).connect(motifPanner);
  motifVoice.volume.value = -32;

  const noiseLowFilter = forceChannels(new Tone.Filter({ frequency: 190, type: "lowpass", rolloff: -24 }));
  const noiseLowPan = new Tone.Panner(-0.18).connect(reverb);
  noiseLowFilter.connect(noiseLowPan);
  const brownNoise = new Tone.Noise("brown").connect(noiseLowFilter);
  brownNoise.volume.value = -58;
  brownNoise.start();

  const noiseAirFilter = forceChannels(new Tone.Filter({ frequency: 1350, type: "highpass", rolloff: -12 }));
  const noiseAirPan = new Tone.Panner(0.18).connect(delay);
  noiseAirFilter.connect(noiseAirPan);
  const pinkNoise = new Tone.Noise("pink").connect(noiseAirFilter);
  pinkNoise.volume.value = -70;
  pinkNoise.start();

  const whiteFilter = forceChannels(new Tone.Filter({ frequency: 5200, type: "bandpass", Q: 0.8 }));
  const whitePan = new Tone.Panner(0).connect(delay);
  whiteFilter.connect(whitePan);
  const whiteNoise = new Tone.Noise("white").connect(whiteFilter);
  whiteNoise.volume.value = -96;
  whiteNoise.start();

  audioEngine = {
    limiter, master, fft, reverb, delay, chorus,
    bassBus, lowFilter, warmFilter, airFilter,
    bedVoices, bedPanners,
    sub, subGain,
    padLayers, padPanners,
    airLayers, airPanners,
    chime, chimePanner,
    organicVoice, organicPanner,
    lowPulseVoices, bassPanners, bassHarmonicVoice, bassHarmonicPanner,
    motifVoice, motifPanner,
    brownNoise, pinkNoise, whiteNoise,
    noiseLowFilter, noiseAirFilter, whiteFilter,
    noiseLowPan, noiseAirPan, whitePan,
  };

  if (reverb.ready && typeof reverb.ready.then === "function") await reverb.ready;
  return audioEngine;
}

function releaseBed() {
  if (!audioEngine) return;
  audioEngine.bedVoices.forEach((voice) => {
    try { voice.triggerRelease(); } catch { /* aucune note soutenue */ }
  });
}

function attackBed(modeName = currentSoundMode) {
  if (!audioEngine) return;
  const config = SOUND_MODES[modeName];
  const now = Tone.now();

  audioEngine.bedVoices.forEach((voice, index) => {
    voice.triggerAttack(config.bedNotes[index % config.bedNotes.length], now + index * 0.55, 0.48);
  });
  audioEngine.sub.frequency.rampTo(Tone.Frequency(config.subNote).toFrequency(), 6.5);
}

function configureSoundLayers(config) {
  if (!audioEngine) return;

  audioEngine.reverb.wet.rampTo(clamp(config.reverbWet + randomBetween(-0.025, 0.025), 0.55, 0.92), 5);
  audioEngine.delay.wet.rampTo(clamp(config.delayWet + randomBetween(-0.035, 0.035), 0.08, 0.55), 4.5);
  audioEngine.chorus.wet.rampTo(randomBetween(0.08, 0.22), 5);

  audioEngine.brownNoise.volume.rampTo(config.brownDb + 2, 4);
  audioEngine.pinkNoise.volume.rampTo(config.pinkDb + 2, 4);
  audioEngine.whiteNoise.volume.rampTo(-92, 4);

  const padBase = config.padDb + 4;
  audioEngine.padLayers.forEach((layer, index) => layer.volume.rampTo(padBase - index * 2.2, 4));
  audioEngine.airLayers.forEach((layer, index) => layer.volume.rampTo(config.airDb + 4 - index * 1.5, 4));
  audioEngine.chime.volume.rampTo(config.chimeDb + 4, 4);
  audioEngine.organicVoice.volume.rampTo(Math.min(-25, config.padDb + 2), 4);
  audioEngine.lowPulseVoices.forEach((voice, index) => voice.volume.rampTo(config.pulseDb + 8 - index, 4));
  audioEngine.bassHarmonicVoice.volume.rampTo(Math.min(-19, config.pulseDb + 8), 4);
  audioEngine.motifVoice.volume.rampTo(config.motifDb ?? -40, 4);
  audioEngine.bassBus.gain.rampTo(currentSoundMode === "celestial" || currentSoundMode === "crystal" ? 1.28 : 1.62, 4);

  audioEngine.lowFilter.frequency.rampTo((config.filterRange[0] + config.filterRange[1]) / 2, 5);
  audioEngine.warmFilter.frequency.rampTo(Math.max(800, config.filterRange[1] * 1.65), 5);
  audioEngine.airFilter.frequency.rampTo((config.airFilterRange[0] + config.airFilterRange[1]) / 2, 5);
  audioEngine.subGain.gain.rampTo(config.subGain * 1.55, 5);

  audioEngine.bedVoices.forEach((voice, index) => {
    voice.volume.rampTo((config.bedDb[index] ?? config.bedDb[0]) + 5, 4.5);
  });
}

function resetHarmonicState() {
  harmonicState.chordIndex = 0;
  harmonicState.melodyIndex = Math.floor(SOUND_MODES[currentSoundMode].airNotes.length / 2);
  harmonicState.motifIndex = Math.floor((SOUND_MODES[currentSoundMode].motifNotes ?? SOUND_MODES[currentSoundMode].airNotes).length / 3);
  harmonicState.bassIndex = 0;
  harmonicState.lastEvent = null;
  harmonicState.repeatedEvents = 0;
}

function applySoundMode(mode, persist = true, restartBed = true) {
  currentSoundMode = SOUND_MODES[mode] ? mode : "deep";
  const config = SOUND_MODES[currentSoundMode];
  resetHarmonicState();

  soundModeButtons.forEach((button) => {
    const active = button.dataset.soundMode === currentSoundMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (audioEngine) {
    configureSoundLayers(config);
    if (audioEnabled && restartBed) {
      clearAudioTimer();
      clearAudioAuxTimers();
      releaseBed();
      audioEngine.padLayers.forEach((layer) => layer.releaseAll());
      audioEngine.airLayers.forEach((layer) => layer.releaseAll());

      scheduleAudioTimeout(() => {
        if (!audioEnabled) return;
        attackBed(currentSoundMode);
        scheduleAmbientEvent();
      }, 1150);
    }
  }

  if (audioEnabled) {
    soundLabel.textContent = soundModeLabel(currentSoundMode);
    audioStatus.textContent = breathing ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · ${soundModeLabel(currentSoundMode).toLowerCase()}` : `${soundModeLabel(currentSoundMode)} · ${soundModeTonality(currentSoundMode)}`;
  }
  if (persist) savePreferences();
}

function triggerVisualPulse(strength = 1) {
  audioReactive.transient = Math.max(audioReactive.transient, clamp(strength, 0, 1));
  breathButton.animate?.([
    { filter: "brightness(1)", transform: "scale(1)" },
    { filter: `brightness(${1 + 0.09 * strength})`, transform: `scale(${1 + 0.014 * strength})` },
    { filter: "brightness(1)", transform: "scale(1)" },
  ], { duration: 2600 + 750 * strength, easing: "ease-in-out" });
}

function randomizeSpatialTexture(strength = 1) {
  if (!audioEngine) return;
  const seconds = randomBetween(4, 10);
  audioEngine.padPanners.forEach((panner, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    panner.pan.rampTo(clamp(side * randomBetween(0.18, 0.58) * strength, -0.72, 0.72), seconds);
  });
  audioEngine.airPanners.forEach((panner) => panner.pan.rampTo(randomBetween(-0.68, 0.68), seconds));
  audioEngine.chimePanner.pan.rampTo(randomBetween(-0.78, 0.78), seconds * 0.55);
  audioEngine.organicPanner.pan.rampTo(randomBetween(-0.55, 0.55), seconds);
  audioEngine.motifPanner.pan.rampTo(randomBetween(-0.72, 0.72), seconds * 0.7);
  audioEngine.bassHarmonicPanner.pan.rampTo(randomBetween(-0.20, 0.20), seconds);
  audioEngine.delay.feedback.rampTo(randomBetween(0.16, 0.34), seconds);
  audioEngine.chorus.wet.rampTo(randomBetween(0.07, 0.24), seconds);
}

function playPadEvent(config) {
  const chord = nextChord(config);
  const duration = randomBetween(config.duration[0], config.duration[1]);
  const primaryIndex = Math.floor(randomBetween(0, audioEngine.padLayers.length));
  const secondaryIndex = (primaryIndex + 1) % audioEngine.padLayers.length;
  const primary = audioEngine.padLayers[primaryIndex];

  audioEngine.lowFilter.frequency.rampTo(randomBetween(config.filterRange[0], config.filterRange[1]), randomBetween(5, 11));
  audioEngine.warmFilter.frequency.rampTo(randomBetween(Math.max(700, config.filterRange[1]), Math.max(1400, config.filterRange[1] * 2.1)), randomBetween(5, 12));
  primary.triggerAttackRelease(chord, `${duration}s`, undefined, randomBetween(0.20, 0.34));

  if (Math.random() < 0.42) {
    const upper = chord.slice(-Math.min(2, chord.length));
    scheduleAudioTimeout(() => {
      if (!audioEnabled) return;
      audioEngine.padLayers[secondaryIndex].triggerAttackRelease(upper, `${duration * 0.72}s`, undefined, randomBetween(0.09, 0.17));
    }, randomBetween(700, 1900));
  }

  randomizeSpatialTexture(0.8);
  triggerVisualPulse(0.9);
}

function playAirEvent(config) {
  const notes = Math.random() < 0.38 ? nearbyHarmonyNotes(config, 2) : nextScaleNote(config.airNotes, "melodyIndex", 2);
  const duration = randomBetween(4.5, 10.5);
  const layerIndex = Math.random() < 0.52 ? 0 : 1;

  audioEngine.airFilter.frequency.rampTo(randomBetween(config.airFilterRange[0], config.airFilterRange[1]), randomBetween(4, 9));
  audioEngine.airLayers[layerIndex].triggerAttackRelease(notes, `${duration}s`, undefined, randomBetween(0.13, 0.25));

  if (Math.random() < 0.24) {
    const organicNote = nextScaleNote(config.airNotes, "melodyIndex", 1);
    scheduleAudioTimeout(() => {
      if (!audioEnabled) return;
      audioEngine.organicVoice.triggerAttackRelease(organicNote, `${randomBetween(4, 7)}s`, undefined, randomBetween(0.08, 0.15));
    }, randomBetween(900, 2200));
  }

  randomizeSpatialTexture(1);
  triggerVisualPulse(0.7);
}

function playChimeEvent(config) {
  const first = nextScaleNote(config.airNotes, "melodyIndex", 1);
  const second = Math.random() < 0.62 ? nextScaleNote(config.airNotes, "melodyIndex", 1) : null;
  const third = Math.random() < 0.22 ? nextScaleNote(config.airNotes, "melodyIndex", 1) : null;

  audioEngine.chimePanner.pan.rampTo(randomBetween(-0.72, 0.72), 1.8);
  audioEngine.chime.triggerAttackRelease(first, randomItem(["2n", "1n", "1n."]), undefined, randomBetween(0.11, 0.20));

  [second, third].filter(Boolean).forEach((note, index) => {
    scheduleAudioTimeout(() => {
      if (!audioEnabled) return;
      audioEngine.chimePanner.pan.rampTo(randomBetween(-0.76, 0.76), 1.2);
      audioEngine.chime.triggerAttackRelease(note, randomItem(["2n", "1n"]), undefined, randomBetween(0.07, 0.16));
    }, randomBetween(850 + index * 900, 2100 + index * 1400));
  });

  audioEngine.delay.wet.rampTo(clamp(config.delayWet + randomBetween(0.03, 0.14), 0.1, 0.58), 2.5);
  triggerVisualPulse(0.5);
}

function playBassEvent(config) {
  harmonicState.bassIndex = progressiveIndex(config.bassNotes.length, harmonicState.bassIndex, 1);
  const note = config.bassNotes[harmonicState.bassIndex];
  const voiceIndex = Math.random() < 0.65 ? 0 : 1;

  audioEngine.bassPanners[voiceIndex].pan.rampTo(randomBetween(-0.28, 0.28), 4);
  const duration = randomBetween(6.5, 11.5);
  audioEngine.lowPulseVoices[voiceIndex].triggerAttackRelease(note, `${duration}s`, undefined, randomBetween(0.24, 0.40));

  // Double perceptif une octave au-dessus : utile quand l'appareil ne restitue pas le sub.
  if (Math.random() < 0.84) {
    const harmonicFrequency = Tone.Frequency(note).toFrequency() * 2;
    audioEngine.bassHarmonicPanner.pan.rampTo(randomBetween(-0.18, 0.18), 3);
    audioEngine.bassHarmonicVoice.triggerAttackRelease(harmonicFrequency, `${duration * 0.72}s`, undefined, randomBetween(0.13, 0.24));
  }

  audioEngine.subGain.gain.rampTo(Math.max(config.subGain * 1.35, config.subGain * randomBetween(1.30, 1.78)), 4.5);
  triggerVisualPulse(0.72);
}

function playTextureEvent(config) {
  const texture = randomItem(["brown", "pink", "white", "organic"]);
  const duration = randomBetween(5, 11);

  if (texture === "brown") {
    audioEngine.noiseLowPan.pan.rampTo(randomBetween(-0.65, 0.65), duration);
    audioEngine.noiseLowFilter.frequency.rampTo(randomBetween(110, 320), duration * 0.6);
    audioEngine.brownNoise.volume.rampTo(Math.max(config.brownDb + 7, -47), 2.5);
    scheduleAudioTimeout(() => audioEnabled && audioEngine.brownNoise.volume.rampTo(config.brownDb + 2, 4.5), duration * 700);
  } else if (texture === "pink") {
    audioEngine.noiseAirPan.pan.rampTo(randomBetween(-0.72, 0.72), duration);
    audioEngine.noiseAirFilter.frequency.rampTo(randomBetween(900, 2800), duration * 0.6);
    audioEngine.pinkNoise.volume.rampTo(Math.max(config.pinkDb + 8, -55), 2.5);
    scheduleAudioTimeout(() => audioEnabled && audioEngine.pinkNoise.volume.rampTo(config.pinkDb + 2, 4.5), duration * 700);
  } else if (texture === "white") {
    audioEngine.whitePan.pan.rampTo(randomBetween(-0.82, 0.82), duration);
    audioEngine.whiteFilter.frequency.rampTo(randomBetween(3400, 7200), 3);
    audioEngine.whiteNoise.volume.rampTo(-62, 2.2);
    scheduleAudioTimeout(() => audioEnabled && audioEngine.whiteNoise.volume.rampTo(-92, 4), duration * 620);
  } else {
    const note = nextScaleNote(config.airNotes, "melodyIndex", 1);
    audioEngine.organicPanner.pan.rampTo(randomBetween(-0.62, 0.62), 4);
    audioEngine.organicVoice.harmonicity.rampTo(randomBetween(0.75, 2.1), 4);
    audioEngine.organicVoice.modulationIndex.rampTo(randomBetween(0.8, 3.2), 4);
    audioEngine.organicVoice.triggerAttackRelease(note, `${duration}s`, undefined, randomBetween(0.08, 0.17));
  }

  randomizeSpatialTexture(1.1);
  triggerVisualPulse(0.4);
}

function playCounterpointEvent(config) {
  const first = nextScaleNote(config.airNotes, "melodyIndex", 1);
  const second = nextScaleNote(config.airNotes, "melodyIndex", 1);
  const low = config.bassNotes[harmonicState.bassIndex % config.bassNotes.length];

  audioEngine.airLayers[0].triggerAttackRelease(first, `${randomBetween(5, 8)}s`, undefined, randomBetween(0.10, 0.18));
  scheduleAudioTimeout(() => {
    if (!audioEnabled) return;
    audioEngine.airLayers[1].triggerAttackRelease(second, `${randomBetween(4, 7)}s`, undefined, randomBetween(0.08, 0.16));
  }, randomBetween(1100, 2600));

  if (Math.random() < 0.45) {
    scheduleAudioTimeout(() => {
      if (!audioEnabled) return;
      audioEngine.lowPulseVoices[0].triggerAttackRelease(low, `${randomBetween(5, 8)}s`, undefined, 0.12);
    }, randomBetween(500, 1700));
  }

  randomizeSpatialTexture(0.95);
  triggerVisualPulse(0.65);
}

function playMotifEvent(config) {
  const scale = config.motifNotes ?? config.airNotes;
  const length = Math.floor(randomBetween(3, 7));
  const baseSpacing = randomBetween(620, 1180);
  const directionBias = Math.random() < 0.5 ? -1 : 1;

  for (let i = 0; i < length; i += 1) {
    const delayMs = i * baseSpacing * randomBetween(0.86, 1.18);
    scheduleAudioTimeout(() => {
      if (!audioEnabled) return;

      // Marche conjointe avec rares sauts : continuité mélodique sans boucle rigide.
      const stepSize = Math.random() < 0.82 ? 1 : 2;
      let current = Number.isFinite(harmonicState.motifIndex) ? harmonicState.motifIndex : 0;
      const localStep = Math.random() < 0.70 ? directionBias * stepSize : -directionBias;
      current = (current + localStep + scale.length) % scale.length;
      harmonicState.motifIndex = current;
      const note = scale[current];

      audioEngine.motifPanner.pan.rampTo(clamp((i / Math.max(length - 1, 1) - 0.5) * 1.15 + randomBetween(-0.18, 0.18), -0.82, 0.82), 0.7);
      audioEngine.motifVoice.triggerAttackRelease(note, randomItem(["8n", "4n", "4n.", "2n"]), undefined, randomBetween(0.08, 0.17));

      // Une résonance FM très légère prolonge parfois une note du motif.
      if (Math.random() < 0.22) {
        audioEngine.organicVoice.harmonicity.rampTo(randomBetween(1.15, 2.25), 1.8);
        audioEngine.organicVoice.modulationIndex.rampTo(randomBetween(0.8, 2.2), 1.8);
        audioEngine.organicVoice.triggerAttackRelease(note, `${randomBetween(2.8, 5.8)}s`, undefined, randomBetween(0.045, 0.10));
      }
    }, delayMs);
  }

  audioEngine.delay.feedback.rampTo(randomBetween(0.24, 0.41), 2.2);
  audioEngine.delay.wet.rampTo(clamp(config.delayWet + randomBetween(0.04, 0.12), 0.16, 0.58), 2.5);
  randomizeSpatialTexture(1.05);
  triggerVisualPulse(0.58);
}

function scheduleAmbientEvent() {
  if (!audioEnabled || !audioEngine) return;
  const config = SOUND_MODES[currentSoundMode];
  const eventType = chooseWeightedEvent(config.eventWeights);

  if (eventType === "pad") playPadEvent(config);
  else if (eventType === "air") playAirEvent(config);
  else if (eventType === "chime") playChimeEvent(config);
  else if (eventType === "bass") playBassEvent(config);
  else if (eventType === "counterpoint") playCounterpointEvent(config);
  else if (eventType === "motif") playMotifEvent(config);
  else playTextureEvent(config);

  clearAudioTimer();
  const density = breathing ? 0.88 : 1;
  audioTimerId = window.setTimeout(scheduleAmbientEvent, randomBetween(config.interval[0], config.interval[1]) * density);
}

async function startSound() {
  if (audioEnabled) return;

  try {
    await loadToneLibrary();
    await Tone.start();
    const rawContext = Tone.getContext?.().rawContext;
    if (rawContext?.state === "suspended" || rawContext?.state === "interrupted") await rawContext.resume();
    await createAudioEngine();
    audioEnabled = true;
    clearAudioTimer();
    clearAudioAuxTimers();

    const config = SOUND_MODES[currentSoundMode];
    configureSoundLayers(config);
    resetHarmonicState();
    attackBed(currentSoundMode);
    audioEngine.master.gain.rampTo(volumeToGain(volumeRange.value), 3.8);

    scheduleAudioTimeout(() => {
      if (audioEnabled) scheduleAmbientEvent();
    }, 2800);

    soundButton.setAttribute("aria-pressed", "true");
    soundLabel.textContent = soundModeLabel(currentSoundMode);
    audioStatus.textContent = breathing ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · ${soundModeLabel(currentSoundMode).toLowerCase()}` : `${soundModeLabel(currentSoundMode)} · ${soundModeTonality(currentSoundMode)}`;
  } catch (error) {
    console.error("Impossible d’activer l’audio :", error);
    audioStatus.textContent = currentLanguage === "en" ? "Audio could not be enabled" : "L’audio n’a pas pu être activé";
  }
}

function stopSound() {
  if (!audioEnabled || !audioEngine) return;

  audioEnabled = false;
  clearAudioTimer();
  clearAudioAuxTimers();
  releaseBed();
  audioEngine.padLayers.forEach((layer) => layer.releaseAll());
  audioEngine.airLayers.forEach((layer) => layer.releaseAll());
  audioEngine.chime.releaseAll();
  audioEngine.lowPulseVoices.forEach((voice) => voice.triggerRelease());
  try { audioEngine.bassHarmonicVoice.triggerRelease(); } catch { /* aucune note */ }
  audioEngine.motifVoice.releaseAll();
  try { audioEngine.organicVoice.triggerRelease(); } catch { /* aucune note */ }
  audioEngine.master.gain.rampTo(0, 3.2);
  audioReactive.transient = 0;

  soundButton.setAttribute("aria-pressed", "false");
  soundLabel.textContent = tr("Paysage sonore");
  audioStatus.textContent = breathing ? `${currentLanguage === "en" ? "Guided breathing" : "Respiration guidée"} · silence` : tr("Silence · paysage actif");
}

function toggleSound() {
  if (audioEnabled) stopSound();
  else startSound();
  wakeInterface();
}

// ---------- Sessions guidées et voyage automatique ----------

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) return "∞";
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function setSessionDuration(minutes, persist = true) {
  selectedSessionMinutes = [0, 5, 10, 20].includes(Number(minutes)) ? Number(minutes) : 0;
  sessionDurationButtons.forEach((button) => {
    const active = Number(button.dataset.sessionMinutes) === selectedSessionMinutes;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (!sessionActive) sessionLabel.textContent = selectedSessionMinutes ? `Session ${selectedSessionMinutes} min` : tr("Session libre");
  if (persist) savePreferences();
}

function clearSessionTimers() {
  if (sessionTickerId !== null) {
    window.clearInterval(sessionTickerId);
    sessionTickerId = null;
  }
  if (journeyTimerId !== null) {
    window.clearTimeout(journeyTimerId);
    journeyTimerId = null;
  }
}

function pickDifferent(items, current) {
  const candidates = items.filter((item) => item !== current);
  return randomItem(candidates.length ? candidates : items);
}

function journeyIntervalMs() {
  if (selectedSessionMinutes === 5) return 85000;
  if (selectedSessionMinutes === 10) return 125000;
  if (selectedSessionMinutes === 20) return 175000;
  return 150000;
}

function performJourneyShift() {
  if (!sessionActive || !autoJourneyEnabled) return;
  journeyStepCount += 1;

  const nextPalette = pickDifferent(Object.keys(palettes), currentPalette);
  const nextAnimation = pickDifferent(["waves", "silk", "orbit", "bloom", "topography", "constellation"], animationMode);
  applyPalette(nextPalette, false);
  setAnimationMode(nextAnimation, false);

  // Le paysage sonore évolue moins souvent que le visuel pour préserver la continuité musicale.
  if (journeyStepCount % 2 === 0) {
    const nextSound = pickDifferent(Object.keys(SOUND_MODES), currentSoundMode);
    applySoundMode(nextSound, false, true);
  }

  savePreferences();
  scheduleJourneyShift();
}

function scheduleJourneyShift() {
  if (journeyTimerId !== null) window.clearTimeout(journeyTimerId);
  if (!sessionActive || !autoJourneyEnabled) return;
  journeyTimerId = window.setTimeout(performJourneyShift, journeyIntervalMs() * randomBetween(0.88, 1.12));
}

function updateSessionProgress() {
  if (!sessionActive) return;
  if (selectedSessionMinutes === 0) {
    const elapsed = (performance.now() - sessionStartedAt) / 1000;
    sessionRemaining.textContent = formatTime(elapsed);
    sessionState.textContent = currentLanguage === "en" ? "Open session · elapsed time" : "Session libre · temps écoulé";
    sessionProgressBar.style.width = "100%";
    return;
  }

  const total = selectedSessionMinutes * 60;
  const elapsed = (performance.now() - sessionStartedAt) / 1000;
  const remaining = Math.max(0, total - elapsed);
  const progress = clamp(elapsed / total, 0, 1);
  sessionRemaining.textContent = formatTime(remaining);
  sessionState.textContent = `Session ${selectedSessionMinutes} min`;
  sessionProgressBar.style.width = `${progress * 100}%`;

  if (remaining <= 0) stopSession(true);
}

async function startSession() {
  if (sessionActive) return;
  sessionActive = true;
  sessionStartedAt = performance.now();
  journeyStepCount = 0;
  sessionProgress.hidden = false;
  sessionButton.setAttribute("aria-pressed", "true");
  sessionLabel.textContent = currentLanguage === "en" ? "Stop session" : "Arrêter la session";
  document.body.classList.add("session-active");
  setBreathing(true);

  if (!audioEnabled) await startSound();
  updateSessionProgress();
  sessionTickerId = window.setInterval(updateSessionProgress, 500);
  scheduleJourneyShift();
  wakeInterface();
}

function stopSession(completed = false) {
  if (!sessionActive) return;
  sessionActive = false;
  clearSessionTimers();
  document.body.classList.remove("session-active");
  sessionButton.setAttribute("aria-pressed", "false");
  sessionLabel.textContent = selectedSessionMinutes ? `Session ${selectedSessionMinutes} min` : tr("Session libre");
  setBreathing(false);

  if (completed) {
    sessionProgress.hidden = false;
    sessionState.textContent = currentLanguage === "en" ? "Session complete" : "Session terminée";
    sessionRemaining.textContent = "00:00";
    sessionProgressBar.style.width = "100%";
    if (audioEnabled && audioEngine) {
      const endNote = SOUND_MODES[currentSoundMode].airNotes[0];
      audioEngine.chime.triggerAttackRelease(endNote, "2n", undefined, 0.12);
      scheduleAudioTimeout(() => { if (audioEnabled) stopSound(); }, 3600);
    }
    window.setTimeout(() => { if (!sessionActive) sessionProgress.hidden = true; }, 6500);
  } else {
    sessionProgress.hidden = true;
  }
  wakeInterface();
}

function toggleSession() {
  if (sessionActive) stopSession(false);
  else startSession();
}

// ---------- Dialogues, immersion et interface ----------

function setImmersive(enabled) {
  document.body.classList.toggle("immersive", enabled);
  exitImmersive.hidden = !enabled;
  immersionButton.setAttribute("aria-pressed", String(enabled));

  if (enabled) {
    document.body.classList.remove("ui-idle");
    clearIdleTimer();
  } else {
    wakeInterface();
  }
}

function clearIdleTimer() {
  if (idleTimerId !== null) {
    window.clearTimeout(idleTimerId);
    idleTimerId = null;
  }
}

function anyDialogOpen() {
  return settingsDialog.open || aboutDialog.open;
}

function wakeInterface() {
  if (document.body.classList.contains("immersive")) return;
  document.body.classList.remove("ui-idle");
  clearIdleTimer();

  if (autodimEnabled && !anyDialogOpen()) {
    idleTimerId = window.setTimeout(() => {
      document.body.classList.add("ui-idle");
    }, 7000);
  }
}

function openDialog(dialog) {
  document.body.classList.remove("ui-idle");
  clearIdleTimer();
  dialog.showModal();
}

function closeDialog(dialog) {
  dialog.close();
  wakeInterface();
}

// ---------- Initialisation ----------

const saved = loadPreferences();
currentPalette = palettes[saved.palette] ? saved.palette : "mist";
currentSoundMode = SOUND_MODES[saved.soundMode] ? saved.soundMode : "deep";
animationMode = ["waves", "silk", "orbit", "bloom", "topography", "constellation"].includes(saved.animationMode) ? saved.animationMode : "waves";
breathPattern = BREATH_PATTERNS[saved.breathPattern] ? saved.breathPattern : "relax";
selectedSessionMinutes = [0, 5, 10, 20].includes(Number(saved.sessionMinutes)) ? Number(saved.sessionMinutes) : 0;
autoJourneyEnabled = saved.journey === true;
visualIntensity = Number.isFinite(Number(saved.intensity)) ? Math.min(100, Math.max(20, Number(saved.intensity))) : 55;
autodimEnabled = saved.autodim !== false;

const storedVolume = Number(saved.volume);
const migratedVolume = Number.isFinite(storedVolume)
  ? (saved._storageVersion && saved._storageVersion < 7 ? storedVolume + 12 : storedVolume)
  : 78;
volumeRange.value = Math.min(100, Math.max(0, migratedVolume));
intensityRange.value = visualIntensity;
volumeOutput.value = `${volumeRange.value} %`;
intensityOutput.value = `${intensityRange.value} %`;
autodimToggle.checked = autodimEnabled;
journeyToggle.checked = autoJourneyEnabled;

if (saved.motion === false || reducedMotionQuery.matches) motionEnabled = false;
motionToggle.checked = motionEnabled;

updateRangeFill(volumeRange);
updateRangeFill(intensityRange);
applyPalette(currentPalette, false, true);
applySoundMode(currentSoundMode, false, false);
setAnimationMode(animationMode, false);
setBreathPattern(breathPattern, false);
setSessionDuration(selectedSessionMinutes, false);
setLanguage(currentLanguage, false);
wakeInterface();

languageButton.addEventListener("click", () => setLanguage(currentLanguage === "fr" ? "en" : "fr"));
breathButton.addEventListener("click", toggleBreathing);
sessionButton.addEventListener("click", toggleSession);
soundButton.addEventListener("click", toggleSound);
immersionButton.addEventListener("click", () => setImmersive(true));
exitImmersive.addEventListener("click", () => setImmersive(false));
settingsButton.addEventListener("click", () => openDialog(settingsDialog));
closeSettings.addEventListener("click", () => closeDialog(settingsDialog));
aboutButton.addEventListener("click", () => openDialog(aboutDialog));
whyLink.addEventListener("click", () => openDialog(aboutDialog));
closeAbout.addEventListener("click", () => closeDialog(aboutDialog));

[settingsDialog, aboutDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", wakeInterface);
});

paletteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyPalette(button.dataset.palette);
    wakeInterface();
  });
});

soundModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applySoundMode(button.dataset.soundMode);
    wakeInterface();
  });
});

animationModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setAnimationMode(button.dataset.animationMode);
    wakeInterface();
  });
});

breathPatternButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setBreathPattern(button.dataset.breathPattern);
    wakeInterface();
  });
});

sessionDurationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (sessionActive) stopSession(false);
    setSessionDuration(Number(button.dataset.sessionMinutes));
    wakeInterface();
  });
});

journeyToggle.addEventListener("change", () => {
  autoJourneyEnabled = journeyToggle.checked;
  if (autoJourneyEnabled) scheduleJourneyShift();
  else if (journeyTimerId !== null) { window.clearTimeout(journeyTimerId); journeyTimerId = null; }
  savePreferences();
  wakeInterface();
});

volumeRange.addEventListener("input", () => {
  volumeOutput.value = `${volumeRange.value} %`;
  updateRangeFill(volumeRange);
  if (audioEnabled && audioEngine) audioEngine.master.gain.rampTo(volumeToGain(volumeRange.value), 0.45);
  savePreferences();
});

intensityRange.addEventListener("input", () => {
  visualIntensity = Number(intensityRange.value);
  intensityOutput.value = `${visualIntensity} %`;
  updateRangeFill(intensityRange);
  if (!motionEnabled && typeof redraw === "function") redraw();
  savePreferences();
});

motionToggle.addEventListener("change", () => setMotion(motionToggle.checked));

autodimToggle.addEventListener("change", () => {
  autodimEnabled = autodimToggle.checked;
  savePreferences();
  wakeInterface();
});

["pointermove", "pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, wakeInterface, { passive: true });
});

window.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea, select") || anyDialogOpen()) return;

  if (event.code === "Space") {
    event.preventDefault();
    toggleBreathing();
  } else if (event.key.toLowerCase() === "m") {
    toggleSound();
  } else if (event.key.toLowerCase() === "s") {
    toggleSession();
  } else if (event.key.toLowerCase() === "f") {
    setImmersive(!document.body.classList.contains("immersive"));
  } else if (event.key === "Escape" && document.body.classList.contains("immersive")) {
    setImmersive(false);
  }
});

reducedMotionQuery.addEventListener?.("change", (event) => {
  if (event.matches) setMotion(false, false);
});

window.addEventListener("pagehide", () => {
  clearAudioTimer();
  clearBreathTimers();
  clearSessionTimers();
  if (audioEngine) {
    releaseBed();
    audioEngine.padLayers.forEach((layer) => layer.releaseAll());
    audioEngine.airLayers.forEach((layer) => layer.releaseAll());
    audioEngine.chime.releaseAll();
    audioEngine.motifVoice.releaseAll();
    audioEngine.lowPulseVoices.forEach((voice) => { try { voice.triggerRelease(); } catch { /* noop */ } });
    try { audioEngine.bassHarmonicVoice.triggerRelease(); } catch { /* noop */ }
    audioEngine.master.gain.value = 0;
  }
});

// =========================================================
// V13 — interactions audiovisuelles poétiques + optimisations
// =========================================================
(function gradientV13Enhancements() {
  const interactionBursts = [];
  const interactionTrails = [];
  let pointerIsDownV13 = false;
  let lastTrailStampV13 = 0;
  let lastSoundStampV13 = 0;
  let orbHoldTimerV13 = null;
  let orbFocusedV13 = false;
  let glowFadeTimerV13 = null;

  function sceneKindV13(palette = currentPalette) {
    return ({ mist: "mist", ocean: "ocean", dawn: "dawn", forest: "forest", sand: "sand" })[palette] ?? "mist";
  }

  function setPointerGlowV13(xNorm = 0.5, yNorm = 0.5, strength = 0.5) {
    document.documentElement.style.setProperty("--pointer-glow-x", `${clamp(xNorm, 0, 1) * 100}%`);
    document.documentElement.style.setProperty("--pointer-glow-y", `${clamp(yNorm, 0, 1) * 100}%`);
    document.documentElement.style.setProperty("--pointer-glow-opacity", `${clamp(0.16 + strength * 0.62, 0, 0.88)}`);
    window.clearTimeout(glowFadeTimerV13);
    glowFadeTimerV13 = window.setTimeout(() => {
      document.documentElement.style.setProperty("--pointer-glow-opacity", "0");
    }, 520);
  }

  function markEngagedV13() {
    document.body.classList.add("v13-engaged", "v13-user-active");
    window.setTimeout(() => document.body.classList.remove("v13-user-active"), 900);
  }

  function pushInteractionBurstV13(x, y, strength = 0.6, options = {}) {
    const burst = {
      x,
      y,
      strength: clamp(strength, 0.12, 1.65),
      life: 0,
      duration: options.duration ?? Math.round(78 + strength * 58 + randomBetween(0, 30)),
      kind: options.kind ?? sceneKindV13(options.palette ?? currentPalette),
      palette: options.palette ?? currentPalette,
      seed: nativeRandomBetween(0, 1000),
      twist: nativeRandomBetween(-0.8, 0.8),
      flatten: nativeRandomBetween(0.56, 1.26),
    };
    interactionBursts.push(burst);

    const rippleCount = options.withRipples === false ? 0 : Math.round(1 + strength * 1.8);
    for (let i = 0; i < rippleCount; i += 1) {
      ripples.push({
        x: x + nativeRandomBetween(-18, 18),
        y: y + nativeRandomBetween(-18, 18),
        life: -i * 5,
        palette: burst.palette,
      });
    }

    audioReactive.transient = Math.max(audioReactive.transient, clamp(0.18 + strength * 0.48, 0, 1));
    if (typeof triggerVisualPulse === "function") triggerVisualPulse(strength * 0.72);
    setPointerGlowV13(x / Math.max(window.innerWidth, 1), y / Math.max(window.innerHeight, 1), strength);
    markEngagedV13();
  }

  function pushInteractionTrailV13(x, y, strength = 0.34) {
    interactionTrails.push({
      x,
      y,
      px: x + nativeRandomBetween(-10, 10),
      py: y + nativeRandomBetween(-10, 10),
      life: 0,
      duration: Math.round(30 + strength * 34 + randomBetween(0, 12)),
      strength: clamp(strength, 0.12, 0.9),
      palette: currentPalette,
    });
  }

  function triggerInteractionSoundV13(strength = 0.45, xNorm = 0.5, accent = false) {
    if (!audioEnabled || !audioEngine || !window.Tone) return;
    const nowStamp = performance.now();
    const minimumGap = accent ? 190 : (pointerIsDownV13 ? 360 : 260);
    if (nowStamp - lastSoundStampV13 < minimumGap) return;
    lastSoundStampV13 = nowStamp;

    const config = SOUND_MODES[currentSoundMode] ?? SOUND_MODES.deep;
    const notePool = config.motifNotes ?? config.airNotes;
    harmonicState.motifIndex = progressiveIndex(notePool.length, harmonicState.motifIndex, accent ? 2 : 1);
    const mainNote = notePool[harmonicState.motifIndex % notePool.length];
    const secondNote = notePool[(harmonicState.motifIndex + 2) % notePool.length];
    const bassNote = config.bassNotes[harmonicState.bassIndex % config.bassNotes.length];
    harmonicState.bassIndex = progressiveIndex(config.bassNotes.length, harmonicState.bassIndex, 1);

    const pan = clamp((xNorm - 0.5) * 1.4, -0.88, 0.88);
    try {
      audioEngine.chimePanner.pan.rampTo(pan, 0.26);
      audioEngine.organicPanner.pan.rampTo(pan * 0.55, 0.4);
      audioEngine.motifPanner.pan.rampTo(-pan * 0.45, 0.32);
    } catch {
      // Certains wrappers peuvent ne pas exposer toutes les méthodes de pan.
    }

    const airy = currentSoundMode === "celestial" || currentSoundMode === "crystal" || currentSoundMode === "warm";
    const organic = currentSoundMode === "night" || currentPalette === "forest" || currentPalette === "mist";
    const prismLike = currentSoundMode === "prism" || currentPalette === "ocean";
    const velocity = clamp(0.08 + strength * (accent ? 0.24 : 0.16), 0.07, 0.35);

    if (accent) {
      audioEngine.chime.triggerAttackRelease([mainNote, secondNote], randomItem(["2n", "2n.", "1n"]), undefined, velocity);
      if (organic) {
        audioEngine.organicVoice.triggerAttackRelease(mainNote, `${randomBetween(3.8, 6.5)}s`, undefined, clamp(velocity * 0.72, 0.07, 0.22));
      } else if (prismLike) {
        audioEngine.motifVoice.triggerAttackRelease([mainNote, secondNote], randomItem(["8n", "4n", "4n."]), undefined, clamp(velocity * 0.8, 0.07, 0.22));
      } else {
        audioEngine.airLayers[0].triggerAttackRelease([mainNote, secondNote], `${randomBetween(3.6, 5.8)}s`, undefined, clamp(velocity * 0.74, 0.07, 0.24));
      }
      if (!airy) {
        audioEngine.lowPulseVoices[0].triggerAttackRelease(bassNote, `${randomBetween(2.4, 4.8)}s`, undefined, clamp(velocity * 1.25, 0.12, 0.34));
      }
    } else if (organic) {
      audioEngine.organicVoice.triggerAttackRelease(mainNote, `${randomBetween(2.6, 4.8)}s`, undefined, clamp(velocity * 0.72, 0.05, 0.18));
    } else if (prismLike) {
      audioEngine.motifVoice.triggerAttackRelease(mainNote, randomItem(["8n", "4n", "4n."]), undefined, clamp(velocity * 0.9, 0.05, 0.17));
    } else {
      audioEngine.chime.triggerAttackRelease(mainNote, randomItem(["4n", "4n.", "2n"]), undefined, clamp(velocity, 0.05, 0.18));
    }
  }

  function drawInteractionTrailsV13() {
    if (!interactionTrails.length) return;
    push();
    blendMode(SCREEN);
    for (let i = interactionTrails.length - 1; i >= 0; i -= 1) {
      const trail = interactionTrails[i];
      trail.life += motionEnabled ? 1 : 2.5;
      const progress = clamp(trail.life / trail.duration, 0, 1);
      const fade = 1 - progress;
      const [r, g, b, a] = currentWaveColors[i % currentWaveColors.length];
      stroke(r, g, b, a * 255 * fade * 0.95 * (1 + audioReactive.high * 0.42));
      strokeWeight(0.9 + trail.strength * 2.3);
      line(trail.px, trail.py, trail.x, trail.y);
      noStroke();
      fill(r, g, b, 255 * fade * 0.22);
      circle(trail.x, trail.y, 5 + trail.strength * 18 * fade);
      if (progress >= 1) interactionTrails.splice(i, 1);
    }
    blendMode(BLEND);
    pop();
  }

  function drawInteractionBurstsV13() {
    if (!interactionBursts.length) return;
    push();
    blendMode(SCREEN);
    noFill();
    for (let i = interactionBursts.length - 1; i >= 0; i -= 1) {
      const burst = interactionBursts[i];
      burst.life += motionEnabled ? 1 : 3.2;
      const progress = clamp(burst.life / burst.duration, 0, 1);
      const fade = 1 - progress;
      const radius = 16 + progress * (70 + burst.strength * 160) * (1 + audioReactive.bass * 0.22);
      const [r, g, b, a] = currentWaveColors[(Math.floor(burst.seed) + i) % currentWaveColors.length];
      stroke(r, g, b, a * 255 * fade * (0.85 + burst.strength * 0.4));
      strokeWeight(0.85 + burst.strength * 1.8 * fade);

      if (burst.kind === "ocean") {
        for (let ring = 0; ring < 3; ring += 1) {
          arc(burst.x, burst.y + ring * 1.6, radius * (1.2 + ring * 0.26), radius * (0.48 + ring * 0.08), PI * (0.04 + burst.twist * 0.04), PI * (0.96 + burst.twist * 0.04));
        }
      } else if (burst.kind === "forest") {
        push();
        translate(burst.x, burst.y);
        rotate(progress * burst.twist * 1.2);
        ellipse(0, 0, radius * 1.1, radius * 0.68);
        ellipse(0, 0, radius * 0.72, radius * 1.16);
        pop();
      } else if (burst.kind === "sand") {
        ellipse(burst.x, burst.y, radius * 1.9, radius * 0.56);
        ellipse(burst.x, burst.y + 1.5, radius * 1.18, radius * 0.34);
      } else if (burst.kind === "dawn") {
        circle(burst.x, burst.y, radius * 1.3);
        circle(burst.x, burst.y, radius * 0.78);
      } else {
        circle(burst.x, burst.y, radius * 1.05);
        circle(burst.x, burst.y, radius * 0.62);
      }

      noStroke();
      fill(r, g, b, 255 * fade * 0.13 * burst.strength * (1 + audioReactive.high * 0.35));
      for (let dot = 0; dot < 5; dot += 1) {
        const angle = progress * TWO_PI * (0.55 + dot * 0.16) + burst.seed * 0.01 + dot;
        const dist = radius * (0.16 + dot * 0.14) * burst.flatten;
        circle(
          burst.x + cos(angle) * dist,
          burst.y + sin(angle * 1.05) * dist * burst.flatten,
          2.2 + fade * 4.8 * burst.strength,
        );
      }

      if (progress >= 1) interactionBursts.splice(i, 1);
    }
    blendMode(BLEND);
    pop();
  }

  const originalDrawV13 = draw;
  draw = function wrappedDrawV13() {
    originalDrawV13();
    drawInteractionTrailsV13();
    drawInteractionBurstsV13();
  };

  function applyAdaptiveQualityV13() {
    // setup() de p5 doit être terminé avant de toucher aux tableaux graphiques.
    if (!p5Ready) return;

    const area = window.innerWidth * window.innerHeight;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const baseDpr = window.devicePixelRatio || 1;
    const dprCap = reducedMotionQuery.matches ? 1 : (area > 2200000 ? 1.15 : (coarsePointer ? 1.35 : 1.7));
    try {
      if (typeof pixelDensity === "function") pixelDensity(Math.min(baseDpr, dprCap));
    } catch {
      // pixelDensity n'est pas accessible avant l'initialisation p5.
    }

    const targetMotes = area < 530000 ? 34 : area > 1700000 ? 44 : 52;
    while (motes.length > targetMotes) motes.pop();
    while (motes.length < targetMotes) motes.push(createMote());

    const targetNodes = area < 530000 ? 22 : area > 1700000 ? 30 : 34;
    while (constellationNodes.length > targetNodes) constellationNodes.pop();
    while (constellationNodes.length < targetNodes) constellationNodes.push(createConstellationNode(constellationNodes.length));
  }

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(applyAdaptiveQualityV13);
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (typeof noLoop === "function") noLoop();
    } else if (motionEnabled) {
      if (typeof loop === "function") loop();
      applyAdaptiveQualityV13();
    } else if (typeof redraw === "function") {
      redraw();
    }
  });

  background.addEventListener("pointerdown", (event) => {
    pointerIsDownV13 = true;
    const isUiControl = event.target.closest(".topbar, .scene-switcher, .settings-dialog, dialog, input, select, label");
    if (!isUiControl) {
      const strength = event.target.closest(".breath-orb") ? 0.88 : 0.56;
      pushInteractionBurstV13(event.clientX, event.clientY, strength, { kind: sceneKindV13() });
      triggerInteractionSoundV13(strength * 0.7, event.clientX / Math.max(window.innerWidth, 1), false);
    }
  });

  background.addEventListener("pointermove", (event) => {
    if (!pointerIsDownV13) return;
    const nowStamp = performance.now();
    const spacing = window.matchMedia("(pointer: coarse)").matches ? 95 : 48;
    if (nowStamp - lastTrailStampV13 < spacing) return;
    lastTrailStampV13 = nowStamp;
    const strength = 0.22 + audioReactive.energy * 0.48;
    pushInteractionTrailV13(event.clientX, event.clientY, strength);
    if (Math.random() < 0.45) {
      pushInteractionBurstV13(event.clientX, event.clientY, strength * 0.62, { withRipples: false, duration: 50 + randomBetween(0, 18) });
    }
    if (Math.random() < 0.28) {
      triggerInteractionSoundV13(strength * 0.55, event.clientX / Math.max(window.innerWidth, 1), false);
    }
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    pointerIsDownV13 = false;
    window.clearTimeout(orbHoldTimerV13);
    if (orbFocusedV13) {
      orbFocusedV13 = false;
      document.body.classList.remove("v13-orb-focus");
    }
  }, { passive: true });

  window.addEventListener("pointercancel", () => {
    pointerIsDownV13 = false;
    window.clearTimeout(orbHoldTimerV13);
    orbFocusedV13 = false;
    document.body.classList.remove("v13-orb-focus");
  }, { passive: true });

  background.addEventListener("dblclick", (event) => {
    if (event.target.closest("dialog, input, select")) return;
    pushInteractionBurstV13(event.clientX, event.clientY, 1.15, { duration: 150, kind: sceneKindV13() });
    triggerInteractionSoundV13(0.95, event.clientX / Math.max(window.innerWidth, 1), true);
  });

  breathButton.addEventListener("pointerdown", (event) => {
    const rect = breathButton.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    window.clearTimeout(orbHoldTimerV13);
    orbHoldTimerV13 = window.setTimeout(() => {
      orbFocusedV13 = true;
      document.body.classList.add("v13-orb-focus");
      pushInteractionBurstV13(x, y, 1.24, { duration: 172, kind: sceneKindV13() });
      triggerInteractionSoundV13(1.0, 0.5, true);
    }, 420);
    setPointerGlowV13(event.clientX / Math.max(window.innerWidth, 1), event.clientY / Math.max(window.innerHeight, 1), 0.7);
  });

  ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
    breathButton.addEventListener(eventName, () => {
      window.clearTimeout(orbHoldTimerV13);
      if (eventName !== "pointerleave") {
        window.setTimeout(() => {
          orbFocusedV13 = false;
          document.body.classList.remove("v13-orb-focus");
        }, 260);
      }
    });
  });

  breathButton.addEventListener("dblclick", () => {
    const rect = breathButton.getBoundingClientRect();
    pushInteractionBurstV13(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.35, { duration: 180 });
    triggerInteractionSoundV13(1.15, 0.5, true);
  });

  soundButton.addEventListener("click", () => {
    const rect = soundButton.getBoundingClientRect();
    pushInteractionBurstV13(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.66, { duration: 110, kind: sceneKindV13() });
  });

  sessionButton.addEventListener("click", () => {
    const rect = sessionButton.getBoundingClientRect();
    pushInteractionBurstV13(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.72, { duration: 120, kind: sceneKindV13() });
  });

  paletteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const rect = button.getBoundingClientRect();
      pushInteractionBurstV13(rect.left + rect.width / 2, rect.top + rect.height / 2, 0.6, { duration: 100, kind: button.dataset.palette ?? sceneKindV13() });
    });
  });

  if (p5Ready) {
    applyAdaptiveQualityV13();
  } else {
    window.addEventListener("gradient:p5-ready", applyAdaptiveQualityV13, { once: true });
  }
})();

// =========================================================
// V14 — Rituel cinématographique, scènes intelligentes et gestes
// =========================================================
(function gradientV14() {
  const ritualButton = document.getElementById("ritual-button");
  const ritualLabel = document.getElementById("ritual-label");
  const ritualHud = document.getElementById("ritual-hud");
  const ritualKicker = document.getElementById("ritual-kicker");
  const ritualChapter = document.getElementById("ritual-chapter");
  const ritualPoem = document.getElementById("ritual-poem");
  const ritualProgressBar = document.getElementById("ritual-progress-bar");
  const ritualExit = document.getElementById("ritual-exit");
  const cinematicTransition = document.getElementById("cinematic-transition");
  const gestureHint = document.getElementById("gesture-hint");

  if (!ritualButton || !ritualHud || !cinematicTransition) return;

  Object.assign(EN_TEXT, {
    "Rituel": "Ritual",
    "Quitter le rituel": "Exit ritual",
    "Progression du rituel": "Ritual progress",
    "Rituel · chapitre I": "Ritual · chapter I",
    "Arrivée": "Arrival",
    "Laissez le paysage venir à vous.": "Let the landscape come to you.",
    "Glissez · maintenez · dessinez un cercle": "Swipe · hold · draw a circle",
    "rituel ·": "ritual ·",
    "Gestes du paysage": "Landscape gestures",
    "Glisser horizontalement : voyager · vers le haut : ouvrir les harmoniques · vers le bas : ancrer le grave · dessiner un cercle : résonner.": "Swipe horizontally: travel · upward: open the harmonics · downward: ground the bass · draw a circle: resonate.",
  });

  const SCENE_PROFILES_V14 = {
    mist: {
      animations: ["silk", "constellation", "waves"],
      sounds: ["celestial", "night", "prism"],
      next: ["ocean", "dawn", "forest"],
    },
    ocean: {
      animations: ["waves", "orbit", "silk"],
      sounds: ["tide", "prism", "celestial"],
      next: ["mist", "dawn", "sand"],
    },
    dawn: {
      animations: ["bloom", "silk", "constellation"],
      sounds: ["warm", "celestial", "crystal"],
      next: ["sand", "ocean", "mist"],
    },
    forest: {
      animations: ["topography", "bloom", "waves"],
      sounds: ["night", "deep", "warm"],
      next: ["mist", "sand", "ocean"],
    },
    sand: {
      animations: ["orbit", "topography", "silk"],
      sounds: ["prism", "deep", "warm"],
      next: ["dawn", "mist", "forest"],
    },
  };

  const RITUAL_CHAPTERS_V14 = [
    {
      id: "arrival", at: 0,
      fr: "Arrivée", en: "Arrival",
      poemFr: "Laissez le paysage venir à vous.", poemEn: "Let the landscape come to you.",
      palette: "mist", animation: "silk", sound: "celestial",
    },
    {
      id: "grounding", at: 0.14,
      fr: "Ancrage", en: "Grounding",
      poemFr: "Le souffle descend. Le paysage trouve son poids.", poemEn: "The breath settles. The landscape finds its weight.",
      palette: "forest", animation: "topography", sound: "deep",
    },
    {
      id: "opening", at: 0.34,
      fr: "Ouverture", en: "Opening",
      poemFr: "L’espace s’ouvre autour du souffle.", poemEn: "Space opens around the breath.",
      palette: "dawn", animation: "bloom", sound: "warm",
    },
    {
      id: "drift", at: 0.55,
      fr: "Dérive", en: "Drift",
      poemFr: "Rien à retenir. Laissez passer.", poemEn: "Nothing to hold. Let it pass.",
      palette: "ocean", animation: "waves", sound: "tide",
    },
    {
      id: "suspension", at: 0.76,
      fr: "Suspension", en: "Suspension",
      poemFr: "Un instant sans direction, seulement la présence.", poemEn: "A moment without direction, only presence.",
      palette: "sand", animation: "orbit", sound: "prism",
    },
    {
      id: "return", at: 0.90,
      fr: "Retour", en: "Return",
      poemFr: "Le mouvement ralentit. Revenez doucement.", poemEn: "The movement slows. Return gently.",
      palette: "mist", animation: "constellation", sound: "celestial",
    },
  ];

  let transitionTimersV14 = [];
  let ritualActiveV14 = false;
  let ritualStartedAtV14 = 0;
  let ritualTotalMsV14 = 10 * 60 * 1000;
  let ritualTickerV14 = null;
  let ritualChapterIndexV14 = -1;
  let ritualHadAudioV14 = false;
  let ritualHadBreathingV14 = false;
  let gestureV14 = null;
  let lastGestureActionV14 = 0;

  function clearTransitionTimersV14() {
    transitionTimersV14.forEach((timer) => window.clearTimeout(timer));
    transitionTimersV14 = [];
  }

  function laterV14(callback, delay) {
    const timer = window.setTimeout(() => {
      transitionTimersV14 = transitionTimersV14.filter((item) => item !== timer);
      callback();
    }, delay);
    transitionTimersV14.push(timer);
    return timer;
  }

  function choiceDifferentV14(items, current) {
    const candidates = items.filter((item) => item !== current);
    return randomItem(candidates.length ? candidates : items);
  }

  function compatibleSceneV14(palette, forceNew = false) {
    const profile = SCENE_PROFILES_V14[palette] ?? SCENE_PROFILES_V14.mist;
    return {
      palette,
      animation: !forceNew && profile.animations.includes(animationMode)
        ? animationMode
        : choiceDifferentV14(profile.animations, animationMode),
      sound: !forceNew && profile.sounds.includes(currentSoundMode)
        ? currentSoundMode
        : choiceDifferentV14(profile.sounds, currentSoundMode),
    };
  }

  function smartNextPaletteV14(direction = 1) {
    const profile = SCENE_PROFILES_V14[currentPalette] ?? SCENE_PROFILES_V14.mist;
    const ordered = profile.next;
    if (direction >= 0) return ordered[Math.floor(Math.random() * ordered.length)];
    const reverseCandidates = Object.keys(SCENE_PROFILES_V14).filter((key) => SCENE_PROFILES_V14[key].next.includes(currentPalette));
    return randomItem(reverseCandidates.length ? reverseCandidates : ordered);
  }

  function transitionToSceneV14(targetPalette, options = {}) {
    const scene = options.scene ?? compatibleSceneV14(targetPalette, options.forceNew === true);
    const targetPaletteData = palettes[scene.palette] ?? palettes.mist;
    const transitionRgb = targetPaletteData.accentSoft ?? targetPaletteData.accent;
    const shouldChangeSound = scene.sound && scene.sound !== currentSoundMode;
    const masterTarget = volumeToGain(volumeRange.value);

    clearTransitionTimersV14();
    document.documentElement.style.setProperty("--v14-transition-rgb", transitionRgb);
    document.body.classList.add("scene-transitioning");
    cinematicTransition.classList.remove("is-active");
    void cinematicTransition.offsetWidth;
    cinematicTransition.classList.add("is-active");

    if (audioEnabled && audioEngine && shouldChangeSound) {
      audioEngine.master.gain.rampTo(masterTarget * 0.64, 0.9);
    }

    laterV14(() => applyPalette(scene.palette, false), 180);
    laterV14(() => setAnimationMode(scene.animation, false), 390);
    laterV14(() => {
      if (scene.sound) applySoundMode(scene.sound, false, audioEnabled);
    }, 620);

    laterV14(() => {
      if (audioEnabled && audioEngine) audioEngine.master.gain.rampTo(masterTarget, 4.4);
      audioReactive.transient = Math.max(audioReactive.transient, 0.78);
      if (typeof triggerVisualPulse === "function") triggerVisualPulse(0.88);
      const cx = window.innerWidth * randomBetween(0.35, 0.65);
      const cy = window.innerHeight * randomBetween(0.32, 0.68);
      for (let i = 0; i < 3; i += 1) {
        ripples.push({ x: cx + nativeRandomBetween(-18, 18), y: cy + nativeRandomBetween(-14, 14), life: -i * 9, palette: scene.palette });
      }
    }, 760);

    laterV14(() => cinematicTransition.classList.remove("is-active"), 1950);
    laterV14(() => document.body.classList.remove("scene-transitioning"), 2750);
    laterV14(() => savePreferences(), 2900);
  }

  // Le voyage automatique V14 suit désormais une continuité de scène plutôt qu'un tirage global.
  performJourneyShift = function performJourneyShiftV14() {
    if (!sessionActive || !autoJourneyEnabled || ritualActiveV14) return;
    journeyStepCount += 1;
    const nextPalette = smartNextPaletteV14(1);
    const scene = compatibleSceneV14(nextPalette, journeyStepCount % 3 === 0);
    // Le son évolue encore moins souvent pour conserver une vraie continuité musicale.
    if (journeyStepCount % 2 !== 0) scene.sound = currentSoundMode;
    transitionToSceneV14(nextPalette, { scene });
    scheduleJourneyShift();
  };

  function ritualDurationLabelV14() {
    const minutes = selectedSessionMinutes || 10;
    return `${minutes} min`;
  }

  function ritualTextV14(chapter) {
    return {
      name: currentLanguage === "en" ? chapter.en : chapter.fr,
      poem: currentLanguage === "en" ? chapter.poemEn : chapter.poemFr,
    };
  }

  function clearRitualChapterClassesV14() {
    RITUAL_CHAPTERS_V14.forEach((chapter) => document.body.classList.remove(`ritual-chapter-${chapter.id}`));
  }

  function applyRitualChapterV14(index, immediate = false) {
    const chapter = RITUAL_CHAPTERS_V14[index];
    if (!chapter) return;
    ritualChapterIndexV14 = index;
    clearRitualChapterClassesV14();
    document.body.classList.add(`ritual-chapter-${chapter.id}`);
    const copy = ritualTextV14(chapter);
    ritualKicker.textContent = `${currentLanguage === "en" ? "Ritual" : "Rituel"} · ${currentLanguage === "en" ? "chapter" : "chapitre"} ${String(index + 1).padStart(2, "0")}`;
    ritualChapter.textContent = copy.name;
    ritualPoem.textContent = copy.poem;

    if (immediate) {
      applyPalette(chapter.palette, false);
      setAnimationMode(chapter.animation, false);
      applySoundMode(chapter.sound, false, audioEnabled);
      audioReactive.transient = Math.max(audioReactive.transient, 0.55);
    } else {
      transitionToSceneV14(chapter.palette, {
        scene: { palette: chapter.palette, animation: chapter.animation, sound: chapter.sound },
      });
    }
  }

  function updateRitualV14() {
    if (!ritualActiveV14) return;
    const elapsed = performance.now() - ritualStartedAtV14;
    const progress = clamp(elapsed / ritualTotalMsV14, 0, 1);
    ritualProgressBar.style.width = `${progress * 100}%`;
    document.documentElement.style.setProperty("--v14-ritual-progress", `${progress * 100}%`);

    let nextIndex = 0;
    for (let i = 0; i < RITUAL_CHAPTERS_V14.length; i += 1) {
      if (progress >= RITUAL_CHAPTERS_V14[i].at) nextIndex = i;
    }
    if (nextIndex !== ritualChapterIndexV14) applyRitualChapterV14(nextIndex, ritualChapterIndexV14 < 0);
    if (progress >= 1) stopRitualV14(true);
  }

  async function startRitualV14() {
    if (ritualActiveV14) return;
    if (sessionActive) stopSession(false);
    if (document.body.classList.contains("immersive")) setImmersive(false);

    ritualActiveV14 = true;
    ritualStartedAtV14 = performance.now();
    ritualTotalMsV14 = (selectedSessionMinutes || 10) * 60 * 1000;
    ritualChapterIndexV14 = -1;
    ritualHadAudioV14 = audioEnabled;
    ritualHadBreathingV14 = breathing;

    ritualHud.hidden = false;
    ritualButton.setAttribute("aria-pressed", "true");
    ritualLabel.textContent = currentLanguage === "en" ? "Exit ritual" : "Quitter le rituel";
    document.body.classList.add("ritual-active");
    document.body.classList.remove("ui-idle");
    setBreathing(true);

    if (!audioEnabled) await startSound();
    applyRitualChapterV14(0, true);
    updateRitualV14();
    ritualTickerV14 = window.setInterval(updateRitualV14, 250);
    wakeInterface();
  }

  function stopRitualV14(completed = false) {
    if (!ritualActiveV14) return;
    ritualActiveV14 = false;
    if (ritualTickerV14 !== null) {
      window.clearInterval(ritualTickerV14);
      ritualTickerV14 = null;
    }
    clearTransitionTimersV14();
    cinematicTransition.classList.remove("is-active");
    document.body.classList.remove("ritual-active", "scene-transitioning");
    clearRitualChapterClassesV14();
    ritualButton.setAttribute("aria-pressed", "false");
    ritualLabel.textContent = currentLanguage === "en" ? "Ritual" : "Rituel";
    ritualProgressBar.style.width = completed ? "100%" : "0%";

    if (!ritualHadBreathingV14) setBreathing(false);

    if (completed && audioEnabled && audioEngine) {
      const config = SOUND_MODES[currentSoundMode];
      const finalNote = config.airNotes[Math.floor(config.airNotes.length / 2)] ?? config.airNotes[0];
      try {
        audioEngine.chimePanner.pan.rampTo(0, 0.8);
        audioEngine.chime.triggerAttackRelease(finalNote, "1n", undefined, 0.15);
      } catch { /* fin de rituel silencieuse si le contexte se ferme */ }
    }

    if (!ritualHadAudioV14 && audioEnabled) {
      window.setTimeout(() => { if (!ritualActiveV14 && audioEnabled) stopSound(); }, completed ? 5200 : 900);
    }

    window.setTimeout(() => {
      if (!ritualActiveV14) ritualHud.hidden = true;
    }, completed ? 4300 : 450);
    wakeInterface();
  }

  async function toggleRitualV14() {
    if (ritualActiveV14) stopRitualV14(false);
    else await startRitualV14();
  }

  function gestureVisualV14(x, y, strength = 0.85, count = 5) {
    audioReactive.transient = Math.max(audioReactive.transient, clamp(strength, 0, 1));
    for (let i = 0; i < count; i += 1) {
      ripples.push({
        x: x + nativeRandomBetween(-28, 28),
        y: y + nativeRandomBetween(-22, 22),
        life: -i * 6,
        palette: currentPalette,
      });
    }
    if (typeof triggerVisualPulse === "function") triggerVisualPulse(strength);
  }

  function openHarmonicsV14(xNorm = 0.5) {
    document.body.classList.add("v14-gesture-known");
    gestureVisualV14(window.innerWidth * xNorm, window.innerHeight * 0.42, 0.9, 4);
    if (!audioEnabled || !audioEngine) return;
    const config = SOUND_MODES[currentSoundMode];
    const noteA = config.airNotes[Math.max(0, Math.floor(config.airNotes.length * 0.55))];
    const noteB = config.airNotes[Math.max(0, Math.floor(config.airNotes.length * 0.82))];
    try {
      audioEngine.airFilter.frequency.rampTo(Math.min(7800, config.airFilterRange[1] * 1.35), 1.8);
      audioEngine.airPanners[0].pan.rampTo(clamp((xNorm - .5) * 1.25, -.8, .8), .5);
      audioEngine.airLayers[0].triggerAttackRelease([noteA, noteB], `${randomBetween(4.5, 7.5)}s`, undefined, 0.17);
      window.setTimeout(() => {
        if (!audioEnabled || !audioEngine) return;
        audioEngine.airFilter.frequency.rampTo((config.airFilterRange[0] + config.airFilterRange[1]) / 2, 4.5);
      }, 2300);
    } catch { /* interaction non critique */ }
  }

  function groundSoundV14(xNorm = 0.5) {
    document.body.classList.add("v14-gesture-known");
    gestureVisualV14(window.innerWidth * xNorm, window.innerHeight * 0.62, 1, 6);
    if (!audioEnabled || !audioEngine) return;
    const config = SOUND_MODES[currentSoundMode];
    const bass = config.bassNotes[harmonicState.bassIndex % config.bassNotes.length];
    harmonicState.bassIndex = progressiveIndex(config.bassNotes.length, harmonicState.bassIndex, 1);
    try {
      audioEngine.bassPanners[0].pan.rampTo(clamp((xNorm - .5) * .55, -.4, .4), .6);
      audioEngine.lowPulseVoices[0].triggerAttackRelease(bass, `${randomBetween(4.4, 7)}s`, undefined, 0.31);
      const hz = Tone.Frequency(bass).toFrequency() * 2;
      audioEngine.bassHarmonicVoice.triggerAttackRelease(hz, `${randomBetween(3.4, 5.5)}s`, undefined, 0.16);
    } catch { /* interaction non critique */ }
  }

  function resonateCircleV14(centerX, centerY) {
    document.body.classList.add("v14-gesture-known");
    gestureVisualV14(centerX, centerY, 1.0, 9);
    if (!audioEnabled || !audioEngine) return;
    const config = SOUND_MODES[currentSoundMode];
    const chord = nextChord(config);
    try {
      audioEngine.padPanners[0].pan.rampTo(0, .8);
      audioEngine.padLayers[0].triggerAttackRelease(chord, `${randomBetween(7, 11)}s`, undefined, 0.24);
      const high = config.airNotes[Math.floor(config.airNotes.length * .65)] ?? config.airNotes[0];
      audioEngine.chime.triggerAttackRelease(high, "1n", undefined, 0.12);
      randomizeSpatialTexture(0.72);
    } catch { /* interaction non critique */ }
  }

  function analyzeGestureV14(points) {
    if (!points || points.length < 5) return;
    const nowStamp = performance.now();
    if (nowStamp - lastGestureActionV14 < 550) return;

    const first = points[0];
    const last = points[points.length - 1];
    const dx = last.x - first.x;
    const dy = last.y - first.y;
    const straight = Math.hypot(dx, dy);
    let path = 0;
    let minX = first.x, maxX = first.x, minY = first.y, maxY = first.y;
    for (let i = 1; i < points.length; i += 1) {
      path += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
      minX = Math.min(minX, points[i].x); maxX = Math.max(maxX, points[i].x);
      minY = Math.min(minY, points[i].y); maxY = Math.max(maxY, points[i].y);
    }

    const widthBox = maxX - minX;
    const heightBox = maxY - minY;
    const endDistance = Math.hypot(last.x - first.x, last.y - first.y);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    if (path > 260 && widthBox > 70 && heightBox > 70 && endDistance < Math.max(78, Math.min(widthBox, heightBox) * .72)) {
      let angleTravel = 0;
      let previousAngle = Math.atan2(points[0].y - centerY, points[0].x - centerX);
      for (let i = 1; i < points.length; i += 1) {
        const angle = Math.atan2(points[i].y - centerY, points[i].x - centerX);
        let delta = angle - previousAngle;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        angleTravel += Math.abs(delta);
        previousAngle = angle;
      }
      if (angleTravel > Math.PI * 1.45) {
        lastGestureActionV14 = nowStamp;
        resonateCircleV14(centerX, centerY);
        return;
      }
    }

    if (straight < 90 || path > straight * 2.2) return;
    lastGestureActionV14 = nowStamp;
    document.body.classList.add("v14-gesture-known");

    if (Math.abs(dx) > Math.abs(dy) * 1.22) {
      const direction = dx > 0 ? 1 : -1;
      const nextPalette = smartNextPaletteV14(direction);
      transitionToSceneV14(nextPalette, { scene: compatibleSceneV14(nextPalette, true) });
    } else if (dy < 0) {
      openHarmonicsV14(clamp(last.x / Math.max(window.innerWidth, 1), 0, 1));
    } else {
      groundSoundV14(clamp(last.x / Math.max(window.innerWidth, 1), 0, 1));
    }
  }

  function isGestureSurfaceV14(target) {
    return !target.closest("button, a, dialog, input, select, label, .settings-panel, .about-panel, .topbar, .primary-actions, .scene-switcher, .session-progress, .breath-visual-guide");
  }

  background.addEventListener("pointerdown", (event) => {
    if (!isGestureSurfaceV14(event.target) || ritualActiveV14) return;
    gestureV14 = {
      id: event.pointerId,
      started: performance.now(),
      held: false,
      points: [{ x: event.clientX, y: event.clientY, t: performance.now() }],
      holdTimer: null,
    };
    const startX = event.clientX;
    const startY = event.clientY;
    gestureV14.holdTimer = window.setTimeout(() => {
      if (!gestureV14 || gestureV14.id !== event.pointerId) return;
      const latest = gestureV14.points[gestureV14.points.length - 1];
      if (Math.hypot(latest.x - startX, latest.y - startY) > 34) return;
      gestureV14.held = true;
      document.body.classList.add("v14-gesture-known");
      groundSoundV14(clamp(startX / Math.max(window.innerWidth, 1), 0, 1));
      gestureVisualV14(startX, startY, 1, 8);
    }, 680);
  }, { passive: true });

  background.addEventListener("pointermove", (event) => {
    if (!gestureV14 || gestureV14.id !== event.pointerId) return;
    const points = gestureV14.points;
    const first = points[0];
    if (gestureV14.holdTimer && Math.hypot(event.clientX - first.x, event.clientY - first.y) > 34) {
      window.clearTimeout(gestureV14.holdTimer);
      gestureV14.holdTimer = null;
    }
    const last = points[points.length - 1];
    if (!last || performance.now() - last.t > 28) {
      points.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (points.length > 72) points.shift();
    }
  }, { passive: true });

  function finishGestureV14(event) {
    if (!gestureV14 || gestureV14.id !== event.pointerId) return;
    gestureV14.points.push({ x: event.clientX, y: event.clientY, t: performance.now() });
    const points = gestureV14.points;
    const wasHeld = gestureV14.held;
    if (gestureV14.holdTimer) window.clearTimeout(gestureV14.holdTimer);
    gestureV14 = null;
    if (!wasHeld) analyzeGestureV14(points);
  }

  background.addEventListener("pointerup", finishGestureV14, { passive: true });
  background.addEventListener("pointercancel", () => {
    if (gestureV14?.holdTimer) window.clearTimeout(gestureV14.holdTimer);
    gestureV14 = null;
  }, { passive: true });

  // Les sélecteurs de palette passent eux aussi par la transition audiovisuelle V14.
  paletteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const palette = button.dataset.palette;
      if (!palette || palette === currentPalette) {
        wakeInterface();
        return;
      }
      transitionToSceneV14(palette, { scene: compatibleSceneV14(palette, false) });
      wakeInterface();
    }, true);
  });

  ritualButton.addEventListener("click", toggleRitualV14);
  ritualExit.addEventListener("click", () => stopRitualV14(false));

  // Si une session classique est lancée pendant le rituel, on restaure d'abord l'état normal.
  sessionButton.addEventListener("click", () => {
    if (ritualActiveV14) stopRitualV14(false);
  }, true);

  window.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select") || anyDialogOpen()) return;
    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      toggleRitualV14();
    } else if (event.key === "Escape" && ritualActiveV14) {
      event.preventDefault();
      stopRitualV14(false);
    }
  });

  // La langue du HUD du rituel suit les traductions dynamiques.
  const refreshLanguageBaseV14 = refreshDynamicLanguage;
  refreshDynamicLanguage = function refreshDynamicLanguageV14() {
    refreshLanguageBaseV14();
    ritualLabel.textContent = ritualActiveV14
      ? (currentLanguage === "en" ? "Exit ritual" : "Quitter le rituel")
      : (currentLanguage === "en" ? "Ritual" : "Rituel");
    ritualExit.textContent = currentLanguage === "en" ? "Exit ritual" : "Quitter le rituel";
    gestureHint.textContent = currentLanguage === "en" ? "Swipe · hold · draw a circle" : "Glissez · maintenez · dessinez un cercle";
    ritualHud.setAttribute("aria-label", currentLanguage === "en" ? "Ritual progress" : "Progression du rituel");
    if (ritualChapterIndexV14 >= 0) {
      const chapter = RITUAL_CHAPTERS_V14[ritualChapterIndexV14];
      const copy = ritualTextV14(chapter);
      ritualKicker.textContent = `${currentLanguage === "en" ? "Ritual" : "Rituel"} · ${currentLanguage === "en" ? "chapter" : "chapitre"} ${String(ritualChapterIndexV14 + 1).padStart(2, "0")}`;
      ritualChapter.textContent = copy.name;
      ritualPoem.textContent = copy.poem;
    }
  };

  // Rejoue une traduction après ajout des nouvelles chaînes V14.
  setLanguage(currentLanguage, false);

  window.addEventListener("pagehide", () => {
    if (ritualTickerV14 !== null) window.clearInterval(ritualTickerV14);
    clearTransitionTimersV14();
  });
})();
