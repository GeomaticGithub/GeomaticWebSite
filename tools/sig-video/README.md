# Vidéos « Le SIG au Maroc » (hero de la page d'accueil)

Films générés par code (canvas) et encodés en MP4 H.264 avec Edge en mode headless.
Aucun logiciel vidéo ni ffmpeg n'est nécessaire.

Il existe trois versions, conservées côte à côte :

| Version | Fichier source | Vidéos produites | Contenu |
|---|---|---|---|
| 1 — carte 3D | `index.html` | `sig-maroc-<fr|en>.mp4` (30 s) | Carte 3D, colonnes par secteur, champ de barres |
| 2 — villes réelles | `villes.html` | `sig-maroc-villes-<fr|en>.mp4` (24 s) | Carte 3D + images réelles de 5 villes + champ de barres |
| 3 — ouverture (dans le hero) | `ouverture.html` | `sig-maroc-ouverture-<fr|en>.mp4` (24 s) | Terre vue de l’espace avec toutes les villes du Maroc, puis 4 analyses calculées sur les données réelles de Casablanca (zones de desserte, ligne de visée, zone de couverture, densité du bâti), carte du Maroc + signature |

Le hero utilise la version indiquée dans `src/messages/{fr,en}/home.json` (`home.hero.video` et `home.hero.poster`).
Pour changer de version, il suffit de changer le préfixe du nom de fichier (`sig-maroc-`, `sig-maroc-villes-` ou `sig-maroc-ouverture-`) dans ces deux fichiers.

## Fichiers

- `index.html` : version 1. Textes dans `TXT.scenes`, minutage et couleurs dans `SCENES`, villes dans `CITIES`, liaisons dans `EDGES`, durée `T`, caméra 3D dans `TILT`, `ROT`, `ZOOM`.
- `villes.html` : version 2. Ordre et position des villes dans `TOUR`, minutage en haut du fichier (`SLOT` = durée par ville).
- `ouverture.html` : version 3. Minutage en haut du fichier ; `assets/earth.jpg` (NASA Blue Marble), `cities.json` (toutes les villes du Maroc), `casablanca.json` (routes et densité du bâti), `centre3d.json` (bâtiments de la maquette 3D).
- `PLANS-ARCGIS-PRO.md` : plans d’analyse 3D que l’équipe peut enregistrer dans ArcGIS Pro pour remplacer les plans calculés par des captures photoréalistes.
- `clips.json` : les 5 clips sources (adresse, auteur, début `t0`, cadrage `cx`/`cy`). `clips/` : les extraits recadrés.
- `prep.html` : découpe les extraits. `data.json` : contours simplifiés (Natural Earth ; carte du Maroc « point de vue Maroc »).
- `make.mjs` : pilote Edge et écrit les fichiers. `CREDITS.md` : auteurs et licence des images réelles.
- `research/` : planche des clips candidats étudiés.

## Régénérer

```bash
cd tools/sig-video

# Version 1
node make.mjs stills fr                  # images de contrôle still-fr-*.jpg
node make.mjs video fr 1000000           # sig-maroc-fr.mp4 + poster   (idem "en")

# Version 2
node make.mjs villes stills fr 0,5.5,9   # images de contrôle still-villes-fr-*.jpg
node make.mjs villes video fr 1600000    # sig-maroc-villes-fr.mp4 + poster   (idem "en")

# Version 3
node make.mjs ouverture stills fr 0,3.7,7.8,10.6
node make.mjs ouverture video fr 1500000  # sig-maroc-ouverture-fr.mp4 + poster   (idem "en")

# Refaire les extraits de villes (seulement si on change un clip ou un cadrage dans clips.json) :
# télécharger chaque "source" de clips.json sous <dossier>/<id>.mp4, puis
node make.mjs prep <dossier>
```

Copier ensuite les `.mp4` et `-poster.jpg` dans `public/videos/`.
Nécessite Node 22+, Microsoft Edge et un accès Internet (police Figtree et bibliothèque mp4-muxer).

## Film du hero : « casablanca »

Le hero du site joue `sig-maroc-casablanca-<fr|en>.mp4`, produit par `casablanca.html`.
Depuis le 25 novembre 2026, le globe et la carte finale montrent le Maroc **et la Mauritanie**.

```bash
node make.mjs casablanca stills fr 3.0,3.7,22.9   # images de contrôle
node make.mjs casablanca video fr 1500000          # sig-maroc-casablanca-fr.mp4 + poster   (idem "en")
```

- `mauritanie.json` : contour et villes de la Mauritanie (Natural Earth, domaine public), produit par `extract-mauritanie.mjs`.
  Pour le refaire : placer `ne_10m_admin_0_countries_mar.geojson` et `ne_10m_populated_places_simple.geojson` dans un dossier, puis `node extract-mauritanie.mjs <dossier>`.
- Cadrage de la carte finale : `MAP_CENTRE`, `MAP_AT` et `MAP_SCALE` dans `casablanca.html`.
- `archive/` : versions précédentes du film et de son script, conservées avant chaque modification.

## Données du film « ouverture »

Le film n’utilise que des données du domaine public ou CC0 (voir `CREDITS.md`).

- `extract-ne.mjs` : construit `maroc.json` (routes Natural Earth, villes Wikidata) et calcule les deux analyses de réseau.
- `assets/maroc-relief.jpg` : relief NASA Blue Marble du Maroc (19° O à 1° E, 19° N à 38° N, 100 pixels par degré).

```
# Mettre à jour les données : placer dans un dossier
#   ne_10m_roads.geojson  (https://github.com/nvkelso/natural-earth-vector, dossier geojson)
#   wd.json               (résultat JSON de la requête SPARQL Wikidata : éléments du Maroc avec coordonnées, population ≥ 20 000 et type)
node extract-ne.mjs <dossier>
node make.mjs ouverture video fr 1400000
node make.mjs ouverture video en 1400000
```
