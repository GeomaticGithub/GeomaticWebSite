# Crédits

Deux films existent. Celui du hero du site est le film « casablanca » (depuis le 23 novembre 2026).

## Film « casablanca » (dans le hero du site)

Script `casablanca.html`, données `casablanca.json`, `centre3d.json` et `cities.json` produites par `extract-osm.mjs` à partir de l’extrait Geofabrik du Maroc.

- **Rues et bâtiments de Casablanca, villes du Maroc** : © les contributeurs d’OpenStreetMap, licence ODbL. **Cette mention est obligatoire** : elle figure dans le film (plan de Casablanca) et dans les crédits des mentions légales du site.
- **Terre vue de l’espace** : NASA, Blue Marble. **Contours** : Natural Earth, domaine public.
- **Mauritanie** (`mauritanie.json`, produit par `extract-mauritanie.mjs`) : contour et 19 villes de Natural Earth, domaine public. Aucune donnée OpenStreetMap ; aucune mention obligatoire.

Le film « ouverture » ci-dessous n’utilise que des données du domaine public ou sous licence CC0 ; aucune mention n’y est obligatoire.

## Film « ouverture » (sans OpenStreetMap, non utilisé pour l’instant)

- **Terre vue de l’espace** (`assets/earth.jpg`) et **relief du Maroc** (`assets/maroc-relief.jpg`) : NASA, Blue Marble Next Generation, images libres d’utilisation. Le relief vient du service NASA GIBS, couche `BlueMarble_ShadedRelief_Bathymetry`. Les nuages sont générés par le programme.
- **Lumières nocturnes** (`assets/maroc-nuit.jpg`) : NASA, Black Marble 2016 (VIIRS), service NASA GIBS, couche `VIIRS_Black_Marble`, images libres d’utilisation. Une colonne par maille de 0,04° éclairée ; sa hauteur suit la luminosité mesurée.
- **Contours du Maroc et des terres** (`data.json`) : Natural Earth, domaine public.
- **Réseau routier** (`maroc.json`) : Natural Earth, routes au 1/10 000 000, domaine public. Ce sont les grands axes du pays, pas le détail des rues.
- **Villes et populations** (`maroc.json`) : Wikidata, licence CC0. 133 villes et communes urbaines de 20 000 habitants ou plus, dont 38 de 100 000 habitants ou plus.

### Ce qui est calculé, et sur quoi

- **Zones de desserte** : plus courts chemins depuis Casablanca sur le graphe routier. Vitesses supposées par type de voie : 100, 80, 65 et 55 km/h. Trois classes : 0–2 h, 2–4 h et 4–6 h.
- **Affectation au centre le plus proche** : chaque tronçon et chaque ville sont rattachés à la capitale régionale la plus proche en temps de trajet (douze capitales).
- **Zones tampons** : disques de 50 km autour de chaque ville, fusionnés et découpés sur le contour du pays.
- **Population des villes** : la hauteur d’une barre suit la racine carrée de la population.

Les temps de trajet reposent sur un réseau simplifié et des vitesses supposées : ils illustrent la méthode, ce ne sont pas des temps réels.

## Version 2 « villes » : images réelles (non utilisée sur le site)

Tous les clips viennent de Pexels. Licence Pexels : utilisation gratuite, y compris commerciale et sur un site web,
sans attribution obligatoire ; interdiction de revendre les clips tels quels. https://www.pexels.com/license/

| Ville | Clip (titre sur Pexels) | Auteur | Page |
|---|---|---|---|
| Casablanca | Hassan II Mosque at Dusk by the Sea | Othmane Ettalbi | https://www.pexels.com/video/39731447/ |
| Rabat | Hassan Tower in Rabat, Morocco under Clear Skies | Earth Photart | https://www.pexels.com/video/34659387/ |
| Tanger | tangier drone | Muhamed Abghour | https://www.pexels.com/video/20214791/ |
| Chefchaouen | Aerial View of Chefchaouen's Blue Buildings | LUFFY YB Imrani | https://www.pexels.com/video/40414394/ |
| Marrakech | Koutoubia Mosque Tower in Marrakech, Morocco | Tony Zohari | https://www.pexels.com/video/37601122/ |
