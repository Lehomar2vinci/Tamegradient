Cette version développe Gradient comme une expérience audiovisuelle plus cinématographique et plus sensible aux gestes.

## Mode Rituel

Le bouton **Rituel** lance une séquence guidée utilisant la durée de session choisie. Si la durée est réglée sur Libre, le rituel dure 10 minutes.

La séquence traverse six chapitres :

1. **Arrivée** — Brume / Voiles / Halo céleste
2. **Ancrage** — Forêt / Topographie / Profondeurs
3. **Ouverture** — Aube / Floraison / Nappe solaire
4. **Dérive** — Océan / Vagues / Marée harmonique
5. **Suspension** — Sable / Orbites / Prisme suspendu
6. **Retour** — Brume / Constellation / Halo céleste

Les changements utilisent des transitions visuelles et audio synchronisées : la sortie audio baisse légèrement pendant la métamorphose puis revient progressivement.

## Transitions audiovisuelles intelligentes

Chaque palette possède des animations et paysages sonores compatibles. Lorsqu'un paysage change :

- le mode sonore actuel est conservé s'il appartient déjà à la famille compatible ;
- idem pour l'animation ;
- sinon Gradient choisit un mode proche et effectue un crossfade progressif ;
- le Voyage automatique suit maintenant un graphe de scènes cohérent au lieu d'un tirage totalement aléatoire.

## Gestes

Les gestes ne s'appliquent que sur le paysage, jamais sur les contrôles :

- **glissement horizontal** : traverser vers un autre paysage audiovisuel cohérent ;
- **glissement vers le haut** : ouvrir momentanément les harmoniques et le registre aigu ;
- **glissement vers le bas** : renforcer une impulsion grave et l'ancrage ;
- **geste circulaire** : produire une résonance harmonique et une floraison visuelle ;
- **maintien sur le paysage** : approfondir le grave ;
- **interactions** : traînées, halos, appui long sur le cercle respiratoire ;

## Raccourcis

- `Espace` : respiration
- `M` : son
- `S` : session
- `R` : rituel
- `F` : immersion
- `Échap` : quitter le rituel / l'immersion
## Correctif initialisation p5

La V14 corrigée diffère l'optimisation adaptative jusqu'à la fin de `setup()` de p5. Les générateurs de particules appelables hors du cycle p5 utilisent désormais un générateur natif basé sur `Math.random()`. Cela corrige l'erreur `ReferenceError: random is not defined` qui pouvait survenir au chargement.
