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
| `src/optimize-home-images.py` | Génération des variantes WebP des cartes de l’accueil ; nécessite Pillow |
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

## Publier sur GitHub Pages

1. Ajoutez les fichiers du projet à la racine du dépôt GitHub. Vérifiez que `index.html` et `.nojekyll` se trouvent dans `docs/`.
2. Enregistrez les fichiers dans un commit sur la branche à publier, par exemple `main`.
3. Ouvrez **Settings → Pages**. Choisissez **Deploy from a branch**, sélectionnez votre branche et le dossier **/docs**, puis cliquez sur **Save**.
4. Ouvrez l’adresse affichée par GitHub. Vérifiez l’accueil, le changement de langue et l’ouverture directe d’une notice par son URL.

Les liens générés sont relatifs au dossier du projet. Les options de publication et le dossier source `/docs` sont décrits dans le [guide de configuration de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Vérifications avant remise

Les derniers contrôles portent sur le site publié à partir du commit `36e98ce`. Le [bilan détaillé et les rapports consultables hors ligne](verification/README.md) sont inclus dans le dépôt.

| Contrôle | Résultat |
| --- | --- |
| HTML et CSS | Nu HTML Checker 26.11.9 ne relève aucune erreur ni aucun avertissement dans les 22 pages HTML et la feuille de style. |
| Pages publiées | Les 22 pages répondent avec le statut HTTP 200 et correspondent aux fichiers testés. |
| Liens et ressources locales | 715 références locales, dont les liens vers les pages, les ancres et les ressources, vérifiées sans erreur. |
| Mise en page | 44 contrôles : les 22 pages en vue mobile et ordinateur, sans débordement horizontal, erreur JavaScript ni ressource en échec. |
| Accessibilité automatisée | axe-core 4.14.0 ne détecte aucune violation lors de 50 contrôles, couvrant les 22 pages sur mobile et ordinateur ainsi que les états interactifs. Les limites de ce contrôle sont indiquées dans `verification/README.md`. |
| Navigation et formulaire | Ouverture et fermeture du menu, touche Échap, retour du focus et formulaire de démonstration vérifiés dans les deux langues. La navigation principale reste utilisable sans JavaScript. |
| Contrastes du texte | Les 18 associations contrôlées passent le seuil AA de 4,5:1 ; la borne conservatrice la plus basse sur les fonds texturés est de 4,686:1. Méthode et portée détaillées dans `verification/`. |
| Images publiées | Les 10 images de chaque accueil se chargent après défilement, en français et en anglais, sur mobile et ordinateur. |
| Lighthouse 13.6.0 | Les accueils français et anglais publiés obtiennent 100 en performances, accessibilité, bonnes pratiques et SEO sur mobile et ordinateur. Les quatre rapports HTML complets sont inclus dans `verification/`. |
| Sources et crédits | Les 13 liens externes présents dans les pages vers les sources, crédits et licences répondent avec le statut HTTP 200. Les licences des polices sont incluses. |

Les contrôles actuels et leur périmètre sont détaillés dans `verification/`. Une nouvelle analyse sur le site de PageSpeed Insights a renvoyé « Unable to resolve » et n’a produit aucun nouveau rapport partageable ; les scores ci-dessus proviennent de Lighthouse exécuté directement sur le site publié. Ils concernent les pages et les conditions de test indiquées dans les rapports.

Pour effectuer un contrôle complémentaire avec WAVE, utilisez les adresses du [site public MOMOA](https://andriana-art.github.io/momoa/) dans [WAVE en ligne](https://wave.webaim.org/). L’extension WAVE permet aussi d’examiner les états interactifs, comme le menu ouvert et les messages du formulaire.

## Contenus et crédits

- La collection reprend les six œuvres des maquettes Figma approuvées, à savoir la Victoire de Samothrace, le Discobole, la Vénus de Milo, Prométhée, Athéna et Poséidon.
- Sur la page de la galerie, la carte d’information renvoie vers la FAQ dans les deux langues. Ce lien remplace l’ancienne adresse électronique et l’ancien numéro de téléphone de DEDAL figurant dans l’export Builder.io.
- Les notices indiquent les crédits et les liens vers les photographies originales lorsqu’ils sont disponibles. Les images adaptées du Discobole comportent l’attribution et le lien de la licence CC BY-SA 3.0. La page du musée de Cambridge complète le lien vers le musée d’origine.
- Les notices de Prométhée renvoient à la rubrique Nationalgalerie des archives des Staatliche Museen zu Berlin. L’inventaire « Findbuch Nationalgalerie » documente la réalisation de la sculpture et son transport vers Berlin à la page 259 du PDF, sous la cote I/NG 1812. [Archives de la Nationalgalerie](https://www.smb.museum/en/museums-institutions/zentralarchiv/holdings/overview/internal-business-records-up-to-1945/#c38859)
- L’export attribue le portrait de la galerie et la photographie de l’exposition à Montserrat Mondragón / Pexels, ainsi que la photographie des cariatides à Efrem Efre / Pexels. Les fichiers image suivent les maquettes fournies.
