# MOMOA

MOMOA est une galerie fictive consacrée à la sculpture grecque, réalisée dans le cadre d’un projet universitaire. Le site comprend 22 pages en français et en anglais, en HTML, CSS et JavaScript, à partir d’un export Builder.io et des maquettes Figma.

[Voir le site](https://andriana-art.github.io/momoa/) · [Maquettes Figma](https://www.figma.com/design/2hP92QF9qMobRzZcJIsvFf/Momoa-Export-HTM-Builder.io?node-id=282-1408)

[Fiche de remise (PDF)](MOMOA-remise.pdf)

Le formulaire est une démonstration : aucune inscription n’est créée et aucune donnée n’est envoyée ni conservée.

## Ouvrir le projet

Depuis le dossier du projet, lancer :

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Sous Windows, remplacer `python3` par `py`. Ouvrir ensuite [localhost:8000](http://localhost:8000/).

## Fichiers

- `docs/` : pages du site, styles, JavaScript, images et polices.
- `src/content.mjs` : textes français et anglais.
- `src/build.mjs` : génération des pages HTML.

Pour modifier le logo ou les coordonnées du pied de page, éditer `src/build.mjs`. Après une modification des sources, régénérer les pages dans `docs/` avec Node.js.

```bash
node src/build.mjs
```

## Crédits

Les sources des œuvres et photographies sont indiquées dans les notices. Le Discobole utilise une photographie de Valerio Perticone, sous [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), avec un fond modifié. Les photos du portrait et de l’exposition sont créditées à Montserrat Mondragón / Pexels ; celle des cariatides à Efrem Efre / Pexels.

Les polices Cormorant Garamond et DM Sans sont accompagnées de leurs [licences OFL](docs/assets/fonts/).
