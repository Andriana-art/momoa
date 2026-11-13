# MOMOA

MOMOA est une galerie fictive consacrée à la sculpture grecque et à ses reproductions, créée dans le cadre d’un projet universitaire. Le site comprend 22 pages en français et en anglais, réalisées en HTML, CSS et JavaScript à partir de l’export Builder.io et des [maquettes Figma approuvées](https://www.figma.com/design/2hP92QF9qMobRzZcJIsvFf/Momoa-Export-HTM-Builder.io?node-id=282-1408).

| Chemin | Contenu |
| --- | --- |
| `docs/` | Site complet, prêt pour un hébergement statique |
| `docs/assets/styles.css` | Mise en page, typographie et styles adaptatifs communs |
| `docs/assets/site.js` | Menu mobile et formulaire de démonstration local |
| `docs/assets/images/` et `docs/assets/fonts/` | Images, polices et licences des polices hébergées localement |
| `src/content.mjs` | Textes français et anglais, fiches des œuvres et liste des routes |
| `src/build.mjs` | Script de génération des pages HTML à partir des modèles communs et des textes |

## Prévisualiser le site sur votre ordinateur

1. Décompressez l’archive ZIP, puis ouvrez le dossier `momoa-website` obtenu.
2. Ouvrez un terminal dans ce dossier. Sous Windows, vous pouvez saisir `powershell` dans la barre d’adresse de l’Explorateur de fichiers et appuyer sur Entrée.
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

Les pages HTML sont déjà générées. Pour modifier les textes, éditez `src/content.mjs`, puis exécutez `node src/build.mjs` avec Node.js 22 ou une version plus récente. Après une modification du CSS ou du JavaScript, actualisez la page dans le navigateur.

## Publier sur GitHub Pages

1. À la racine du dépôt GitHub de l’équipe, ajoutez le contenu du projet décompressé. Vérifiez que `index.html` et `.nojekyll` se trouvent à la racine du dossier `docs/`.
2. Enregistrez les fichiers dans un commit sur la branche à publier, par exemple `main`.
3. Ouvrez **Settings → Pages**. Choisissez **Deploy from a branch**, sélectionnez votre branche et le dossier **/docs**, puis cliquez sur **Save**.
4. Ouvrez l’adresse affichée par GitHub. Vérifiez l’accueil, le passage à l’anglais et l’ouverture directe d’une notice par son URL.

Les liens générés sont relatifs au dossier du projet. Les options de publication et le dossier source `/docs` sont décrits dans le [guide de configuration de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Vérifications

| Contrôle | Résultat |
| --- | --- |
| HTML et CSS | Nu HTML Checker a relevé zéro erreur dans les 22 documents HTML et la feuille de style. |
| Routes et ressources locales | Les 22 pages, leurs équivalents dans l’autre langue et les 657 références locales ont été vérifiés sous un chemin de projet de type GitHub Pages. |
| Collection et FAQ | Les six cartes dans les deux langues, les douze liens vers l’œuvre précédente et les douze liens vers l’œuvre suivante ont été vérifiés. Sur l’accueil, chaque question mène directement à sa réponse dans la FAQ de la même langue. Le bouton d’inscription de la FAQ amène directement au formulaire. |
| Redimensionnement | Les 22 pages ont été testées dans Chromium à 320, 360, 390, 639, 640, 768, 895, 896, 1024, 1440 et 1920 pixels CSS. Les grilles et commandes vérifiées ne présentaient ni débordement horizontal, ni texte tronqué, ni chevauchement involontaire. Le menu ouvert et les états d’erreur et de confirmation du formulaire ont également été vérifiés. |
| Navigation au clavier | Les 62 tests d’interaction dans Chromium ont réussi. Ils couvraient notamment le retour à l’accueil depuis les notices sur mobile et ordinateur, le lien d’accès direct au contenu, Échap, le retour du focus au menu, le changement de langue et les deux formulaires de démonstration. La navigation principale a aussi été vérifiée au clavier avec JavaScript désactivé. Le formulaire efface les champs et n’envoie aucune requête de soumission. |
| Accessibilité et contraste | axe-core 4.14.0 n’a détecté aucune violation automatisée des critères WCAG de niveaux A et AA lors de 54 contrôles sur mobile et ordinateur, y compris les états du menu et du formulaire. Les 832 échantillons de texte sur fond texturé respectaient les seuils de contraste applicables. Le rapport le plus bas mesuré était de 5,07 pour 1. |
| Images | Tous les fichiers WebP ont été décodés. Le buste et son socle forment une seule image adaptative, disponible en plusieurs tailles. Les cartes et les notices reprennent les cadrages Figma, avec des fichiers distincts pour les notices sur mobile et ordinateur. |
| Lighthouse 13.6.0 | Après les derniers ajustements, les deux accueils ont obtenu 96 en performances sur mobile, 100 sur ordinateur, et 100 en accessibilité, bonnes pratiques et SEO sur les deux appareils. Lors de l’audit complet précédent, les 22 pages ont obtenu de 94 à 99 en performances sur mobile et 100 dans les trois autres catégories. Sur ordinateur, les 22 pages ont obtenu 100 dans les quatre catégories. |
| WAVE | Les deux pages d’accueil publiées, en français et en anglais, ont passé le contrôle WAVE. Les liens redondants du logo ont ensuite été retirés des pages intérieures. Les liens Accueil et Home restent accessibles dans les menus et le pied de page. La vérification du HTML des 22 pages a confirmé l’absence de liens consécutifs pointant vers la même destination. Le nouveau contrôle WAVE des pages intérieures reste à effectuer. |

Les contrôles dans le navigateur comprenaient 12 mises en page testées avec une zone d’affichage CSS équivalente à un zoom de 200 % dans une fenêtre de 1440 px. Un essai avec la commande de zoom du navigateur reste à effectuer. Lighthouse a été exécuté sur le site servi localement. Le dossier `verification/` de l’archive ZIP contient les résultats des 44 tests de l’audit complet précédent ainsi que les rapports mobile et ordinateur pour l’accueil et la galerie en français.

Pour répéter le contrôle WAVE, utilisez les adresses du [site public MOMOA](https://andriana-art.github.io/momoa/) dans [WAVE en ligne](https://wave.webaim.org/). L’extension WAVE permet aussi d’examiner les états interactifs, comme le menu ouvert et les messages du formulaire.

Le rapport PageSpeed Insights de la galerie publiée sur GitHub Pages a obtenu 100 dans les quatre catégories sur [mobile](https://pagespeed.web.dev/analysis/https-andriana-art-github-io-momoa-galerie/k2ff0fscqf?form_factor=mobile) et sur [ordinateur](https://pagespeed.web.dev/analysis/https-andriana-art-github-io-momoa-galerie/k2ff0fscqf?form_factor=desktop).

## Contenus et crédits

- La collection reprend les six œuvres des maquettes Figma approuvées, à savoir la Victoire de Samothrace, le Discobole, la Vénus de Milo, Prométhée, Athéna et Poséidon.
- Sur la page de la galerie, la carte d’information renvoie vers la FAQ dans les deux langues. Ce lien remplace l’ancienne adresse électronique et l’ancien numéro de téléphone de DEDAL figurant dans l’export Builder.io.
- Les notices indiquent les crédits et les liens vers les photographies originales lorsqu’ils sont disponibles. Les images adaptées du Discobole comportent l’attribution et le lien de la licence CC BY-SA 3.0. La page du musée de Cambridge complète le lien vers le musée d’origine.
- La notice de Prométhée cite la fiche d’archives de la sculpture à la Nationalgalerie de Berlin. La fiche de la réplique du GNM était indisponible lors de la vérification.
- L’export attribue le portrait de la galerie et la photographie de l’exposition à Montserrat Mondragón / Pexels, ainsi que la photographie des cariatides à Efrem Efre / Pexels. Les fichiers image suivent les maquettes fournies.
