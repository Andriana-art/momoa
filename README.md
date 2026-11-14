# MOMOA

MOMOA est une galerie fictive consacrée à la sculpture grecque et à ses reproductions, créée dans le cadre d’un projet universitaire. Le site comprend 22 pages en français et en anglais, réalisées en HTML, CSS et JavaScript à partir de l’export Builder.io et des [maquettes Figma approuvées](https://www.figma.com/design/2hP92QF9qMobRzZcJIsvFf/Momoa-Export-HTM-Builder.io?node-id=282-1408).

Le [site publié sur GitHub Pages](https://andriana-art.github.io/momoa/) peut être consulté directement. Le formulaire est une démonstration locale : aucune inscription n’est créée et aucune donnée n’est envoyée ni conservée.

| Chemin | Contenu |
| --- | --- |
| `docs/` | Site complet, prêt pour un hébergement statique |
| `docs/assets/styles.css` | Mise en page, typographie et styles adaptatifs communs |
| `docs/assets/site.js` | Menu mobile et formulaire de démonstration local |
| `docs/assets/images/` et `docs/assets/fonts/` | Images, polices et licences des polices hébergées localement |
| `src/content.mjs` | Textes français et anglais, fiches des œuvres et liste des routes |
| `src/build.mjs` | Génération des 22 pages HTML à partir des modèles communs et des textes |
| `src/optimize-home-images.py` | Génération des images adaptatives de l’accueil avec Pillow (WebP et AVIF) |
| `src/optimize-fonts.py` | Optimisation facultative de DM Sans avec fontTools ; graisses et taille optique utilisées par le site |
| `verification/` | Bilan des contrôles et rapports Lighthouse autonomes du site publié |

## Prévisualiser le site sur votre ordinateur

1. Téléchargez ou clonez le dépôt. Si vous utilisez une archive ZIP, décompressez-la.
2. Ouvrez un terminal dans le dossier qui contient `docs/`, `src/` et ce fichier `README.md`.
3. Si Python est installé, exécutez la commande correspondant à votre système.

   **Sous Windows**

   ```powershell
   py -m http.server 8000 --bind 127.0.0.1 --directory docs
   ```

   **Sous macOS ou Linux**

   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
   ```

4. Ouvrez [http://localhost:8000/](http://localhost:8000/) dans votre navigateur. Laissez le terminal ouvert pendant la prévisualisation. Pour arrêter le serveur, appuyez sur Ctrl+C dans le terminal.

Les pages HTML et les images sont déjà générées ; aucune installation de dépendances n’est nécessaire pour consulter le site. Pour modifier les textes, éditez `src/content.mjs`, puis exécutez `node src/build.mjs` avec Node.js 22 ou une version plus récente. Après une modification du CSS ou du JavaScript, actualisez la page dans le navigateur.

Pour régénérer les variantes d’images de l’accueil, exécutez `python3 src/optimize-home-images.py` avec une version de Pillow qui prend en charge WebP et AVIF. Le navigateur choisit une version adaptée à l’écran. Sur mobile, le buste est proposé en AVIF avec une variante WebP de secours.

## Publier sur GitHub Pages

1. Ajoutez les fichiers du projet à la racine du dépôt GitHub. Vérifiez que `index.html` et `.nojekyll` se trouvent dans `docs/`.
2. Enregistrez les fichiers dans un commit sur la branche à publier, par exemple `main`.
3. Ouvrez **Settings → Pages**. Choisissez **Deploy from a branch**, sélectionnez votre branche et le dossier **/docs**, puis cliquez sur **Save**.
4. Ouvrez l’adresse affichée par GitHub. Vérifiez l’accueil, le changement de langue et l’ouverture directe d’une notice par son URL.

Les liens générés sont relatifs au dossier du projet. Les options de publication et le dossier source `/docs` sont décrits dans le [guide de configuration de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Vérifications avant remise

La [grille de remise détaillée](verification/GRILLE-REMISE.md) reprend les sept critères du projet. Les [preuves et leur périmètre](verification/README.md) sont inclus dans le dépôt ; les empreintes SHA-256 identifient les fichiers contrôlés après les corrections graphiques, publiés dans le commit `1ede3b68f7ffa7fa5c0cccc4780ed1563a81cbef`.

Le 14 novembre 2026, PageSpeed Insights a mesuré **100 en performances, accessibilité, bonnes pratiques et SEO** sur l’accueil et la galerie en français, sur mobile et ordinateur. Les deux rapports ont été générés après la publication du commit `23e1d1b`. [Rapport de l’accueil](https://pagespeed.web.dev/analysis/https-andriana-art-github-io-momoa/gwpmqxnzpp?form_factor=mobile) · [Rapport de la galerie](https://pagespeed.web.dev/analysis/https-andriana-art-github-io-momoa-galerie/4u32hpct1y?form_factor=mobile)

| Critère | Résultat |
| --- | --- |
| Conformité graphique | 44 vues de base comparées aux maquettes Figma, en français et en anglais à 390 et 1440 px, avec contrôle des états interactifs. Les écarts résiduels et adaptations utiles sont documentés. |
| Responsive | 286 mises en page à 13 largeurs de 320 à 1920 px et 18 états interactifs sans échec ; 12 vues avec zone CSS équivalente à un zoom de 200 %. |
| Bootstrap | Facultatif dans la grille, non utilisé ; mise en page en CSS Grid et Flexbox. |
| Écriture du code | Sources communes, contenus bilingues centralisés, HTML sémantique, CSS et comportements JavaScript séparés ; génération reproductible des 22 pages. |
| Validation W3C | Nu HTML Checker 26.11.9 : 22 HTML et CSS sans message. Service CSS W3C : zéro erreur et 192 avertissements, détaillés dans les preuves. |
| SEO | Titres et descriptions renseignés, une hiérarchie de titres cohérente, langues FR/EN, images et liens nommés ; 22 URL publiées accessibles aux robots. |
| Accessibilité | 50 contrôles axe-core sans violation détectée ; navigation au clavier et formulaire contrôlés ; borne minimale de contraste textuel calculée à 4,686:1. |

Les derniers rapports Lighthouse du site publié après corrections obtiennent 100 dans les quatre catégories sur les deux accueils, en français et en anglais, sur mobile et ordinateur. Un premier passage anglais mobile a obtenu 99 ; le contrôle suivant a obtenu 100 sans changement de code. Les rapports et les dates sont conservés dans `verification/`.

Les scores concernent les pages et les conditions indiquées dans chaque rapport. Les polices et les images optimisées sont hébergées avec le site. La version de DM Sans utilise la taille optique de 14 déjà définie dans la feuille de style. La licence SIL Open Font License est incluse dans `docs/assets/fonts/`.

Le formulaire reste une démonstration universitaire sans envoi ni conservation des données. Les sources, crédits et licences sont conservés. Le contrôle du zoom couvre un équivalent CSS à 200 % ; la commande de zoom native du navigateur n’a pas été vérifiée.

## Contenus et crédits

- La collection reprend les six œuvres des maquettes Figma approuvées, à savoir la Victoire de Samothrace, le Discobole, la Vénus de Milo, Prométhée, Athéna et Poséidon.
- Sur la page de la galerie, la carte d’information renvoie vers la FAQ dans les deux langues. Ce lien remplace l’ancienne adresse électronique et l’ancien numéro de téléphone de DEDAL figurant dans l’export Builder.io.
- Les notices indiquent les crédits et les liens vers les photographies originales lorsqu’ils sont disponibles. Les images adaptées du Discobole comportent l’attribution et le lien de la licence CC BY-SA 3.0. La page du musée de Cambridge complète le lien vers le musée d’origine.
- Les notices de Prométhée renvoient à la rubrique Nationalgalerie des archives des Staatliche Museen zu Berlin. L’inventaire « Findbuch Nationalgalerie » documente la réalisation de la sculpture et son transport vers Berlin à la page 259 du PDF, sous la cote I/NG 1812. [Archives de la Nationalgalerie](https://www.smb.museum/en/museums-institutions/zentralarchiv/holdings/overview/internal-business-records-up-to-1945/#c38859)
- L’export attribue le portrait de la galerie et la photographie de l’exposition à Montserrat Mondragón / Pexels, ainsi que la photographie des cariatides à Efrem Efre / Pexels. Les fichiers image suivent les maquettes fournies.
