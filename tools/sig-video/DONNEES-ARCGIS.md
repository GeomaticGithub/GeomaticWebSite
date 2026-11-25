# Données à exporter depuis ArcGIS Pro pour le film d’accueil

Le film d’accueil du site doit reprendre les plans « quartier » de la vidéo Esri *About ArcGIS* : réseau de rues la nuit, bâtiments en 3D, dôme de visibilité, ligne de visée, projet de bâtiment. Ces plans ont besoin des rues et des bâtiments d’un quartier marocain. Voici ce qu’il faut exporter.

## 1. Choisir la zone

- **Un quartier d’environ 2 km de côté**, reconnaissable et dense. Par exemple : Casablanca Marina et le port, Maârif autour du Twin Center, ou Tanger Med.
- **Une zone large d’environ 15 km de côté** autour de ce quartier, pour le plan du réseau routier vu de nuit.

## 2. Couches à fournir

| Couche | Géométrie | Emprise | Champs nécessaires |
|---|---|---|---|
| Bâtiments | Polygones | Le quartier | Hauteur en mètres, ou à défaut nombre d’étages |
| Voies du quartier | Lignes | Le quartier | Classe de voie (autoroute, principale, secondaire, locale) |
| Voies de la ville | Lignes | La zone large | Classe de voie |
| Limite du quartier | Polygone | Le quartier | Aucun |

Facultatif : le trait de côte ou les quais, et un point pour l’emplacement d’une antenne ou d’un projet de bâtiment.

## 3. Format

- **GeoJSON en WGS 84 (EPSG:4326)**, un fichier par couche.
- Dans ArcGIS Pro : outil **Entités vers JSON** (*Features To JSON*), en cochant **GeoJSON** et **Projeter en WGS_1984**.
- Moins de 50 Mo par fichier. Si une couche est plus lourde, réduisez l’emprise.

## 4. Où déposer les fichiers

Dans le dossier `tools/sig-video/data-arcgis/` du projet du site, avec ces noms :

```
batiments.geojson
voies-quartier.geojson
voies-ville.geojson
limite-quartier.geojson
```

## 5. Droits sur les données

Le film sera publié sur le site public de Geomatic. Merci d’indiquer pour chaque couche :

- **sa source** (données Geomatic, client, organisme public, Living Atlas, etc.) ;
- **si la source autorise cette publication** ;
- **si elle impose une mention**, et laquelle.

Les fonds de carte Esri ne peuvent en général pas être extraits en entités : il faut des couches dont Geomatic détient les droits.

## Autre possibilité : une animation exportée d’ArcGIS Pro

Si vous préférez, exportez directement une animation 3D depuis ArcGIS Pro (onglet **Animation**, export en MP4, 1080 × 1080 ou plus, 30 images par seconde, 4 à 6 secondes par plan). Les plans seront alors montés tels quels dans le film. Plans utiles : survol du quartier en 3D, analyse de visibilité, ligne de visée, réseau de rues sur fond sombre.
