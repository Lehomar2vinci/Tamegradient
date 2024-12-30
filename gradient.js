/********************************************************
 *               Définition des gradients                *
 ********************************************************/
const gradients = {
  original: {
    background: [
      [100, 69, 54],
      [178, 103, 94],
      [196, 163, 129],
      [187, 214, 134],
      [238, 241, 189],
    ],
    waves: [
      "rgba(100,69,54,0.2)",
      "rgba(178,103,94,0.2)",
      "rgba(196,163,129,0.2)",
      "rgba(187,214,134,0.2)",
      "rgba(238,241,189,0.2)",
    ],
  },
  bleu: {
    background: [
      [30, 60, 90],
      [60, 90, 120],
      [90, 120, 150],
      [120, 150, 180],
      [150, 180, 210],
    ],
    waves: [
      "rgba(30,60,90,0.2)",
      "rgba(60,90,120,0.2)",
      "rgba(90,120,150,0.2)",
      "rgba(120,150,180,0.2)",
      "rgba(150,180,210,0.2)",
    ],
  },
  pastel: {
    background: [
      [227, 228, 255],
      [202, 201, 252],
      [230, 228, 255],
      [247, 237, 241],
      [255, 250, 245],
    ],
    waves: [
      "rgba(227,228,255,0.2)",
      "rgba(202,201,252,0.2)",
      "rgba(230,228,255,0.2)",
      "rgba(247,237,241,0.2)",
      "rgba(255,250,245,0.2)",
    ],
  },
};

// Variable globale pour la couleur des vagues
let colors = gradients.original.waves;

/********************************************************
 *           Fonction pour appliquer un gradient         *
 ********************************************************/
function applyGradient(type) {
  const grad = gradients[type];
  const bgColors = grad.background
    .map((c) => `rgb(${c[0]},${c[1]},${c[2]})`)
    .join(", ");

  // On applique un linear-gradient
  document.querySelector(".background").style.background = `
    linear-gradient(135deg, ${bgColors})
  `;
  // On met à jour la palette des vagues
  colors = grad.waves;
}

/********************************************************
 *                   Animation p5.js                     *
 ********************************************************/
let waves = [];
const numWaves = 5;
let t = 0;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("sketch-container");
  noFill();
  strokeWeight(2);

  // On crée les vagues avec des propriétés aléatoires
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      color: colors[i % colors.length],
      amplitude: random(50, 150),
      frequency: random(0.002, 0.01),
      offset: random(TWO_PI),
      verticalShift: map(i, 0, numWaves - 1, height * 0.3, height * 0.7),
    });
  }
}

function draw() {
  clear();

  // Modifie légèrement l'amplitude en fonction de la position de la souris
  let mouseFactor = map(mouseX, 0, width, 0.8, 1.2);

  for (let i = 0; i < waves.length; i++) {
    let w = waves[i];
    stroke(w.color); // utilisation de la couleur de la vague
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let angle = x * w.frequency + t * 0.05 + w.offset;
      let y = w.verticalShift + sin(angle) * w.amplitude * mouseFactor;
      vertex(x, y);
    }
    endShape();
  }

  t += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/********************************************************
 *                Musique générative (Tone.js)          *
 ********************************************************/
const notes = ["C4", "D4", "E4", "F#4", "G4", "A4", "B4", "C5"];
const reverb = new Tone.Reverb({ decay: 20, wet: 0.8 });
const delay = new Tone.FeedbackDelay("8n", 0.2);

reverb.connect(delay);
delay.toDestination();

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sine" },
  envelope: {
    attack: 10,
    decay: 2,
    sustain: 0.7,
    release: 20,
  },
}).connect(reverb);

// Baisser ou augmenter le volume ici selon vos besoins
synth.volume.value = 25;

let playing = false;
let stopSound = false;

/**
 * Joue une note (ou deux) aléatoire(s) sur un intervalle aléatoire,
 * recrée un effet "ambient".
 */
function playRandomPad() {
  if (stopSound) return; // Ne pas lancer de nouvelles notes si on a arrêté le son

  let numNotes = Math.random() < 0.7 ? 1 : 2;
  let chosenNotes = [];

  for (let i = 0; i < numNotes; i++) {
    chosenNotes.push(random(notes));
  }

  const durations = [4, 6, 8, 10, 12];
  const durationSec = random(durations);
  const duration = durationSec + "s";

  synth.triggerAttackRelease(chosenNotes, duration);

  // Prochain intervalle entre 10s et 30s
  const nextInterval = random(10, 30) * 1000;
  setTimeout(playRandomPad, nextInterval);
}

/**
 * Fade out du son (descend progressivement le volume)
 */
function fadeOutSound() {
  stopSound = true;
  // On rampe le volume vers -Infinity sur 5 secondes
  synth.volume.rampTo(-Infinity, 5);
}

/********************************************************
 *        Gestion des boutons et du menu overlay         *
 ********************************************************/
const soundButton = document.getElementById("sound-button");
const stopButton = document.getElementById("stop-button");
const infoButton = document.getElementById("info-button");
const overlayMenu = document.getElementById("overlay-menu");
const closeMenu = document.getElementById("close-menu");
const gradientSelect = document.getElementById("gradient-select");

/* 
  Au chargement du DOM, on laisse le texte noir pendant 
  2 secondes, puis on le passe en blanc.
  (Vous pouvez ajuster le délai comme vous le souhaitez.)
*/
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".content").style.color = "#fff";
  }, 2000);
});

// Bouton "Activer le son"
soundButton.addEventListener("click", async () => {
  await Tone.start();
  stopSound = false;
  playing = true;
  playRandomPad();
  soundButton.style.display = "none";
  stopButton.style.display = "inline-block";
});

// Bouton "Stop le son"
stopButton.addEventListener("click", () => {
  fadeOutSound();
  // stopButton.style.display = "none";
  soundButton.style.display = "inline-block";
});

// Ouverture du menu d'options
infoButton.addEventListener("click", () => {
  overlayMenu.classList.add("show");
  overlayMenu.setAttribute("aria-hidden", "false");
});

// Fermeture du menu d'options
closeMenu.addEventListener("click", () => {
  overlayMenu.classList.remove("show");
  // Pour éviter un "flash", on retire l'overlay après l’animation
  setTimeout(() => {
    overlayMenu.setAttribute("aria-hidden", "true");
  }, 400);
});

// Changement du gradient
gradientSelect.addEventListener("change", (e) => {
  applyGradient(e.target.value);
});
