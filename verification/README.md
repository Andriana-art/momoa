# Vérifications de MOMOA avant remise

## Adresse à analyser dans PageSpeed

L’adresse publique du site est **https://andriana-art.github.io/momoa/**.

- [Lancer une nouvelle analyse mobile de l’accueil français](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fandriana-art.github.io%2Fmomoa%2F&form_factor=mobile)
- [Lancer une nouvelle analyse mobile de l’accueil anglais](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fandriana-art.github.io%2Fmomoa%2Fen%2F&form_factor=mobile)

Cette page README présente les preuves de vérification. Une analyse de son adresse `github.com/Andriana-art/momoa/blob/main/verification/README.md` mesure l’interface GitHub. Pour mesurer MOMOA, utilisez les liens PageSpeed ci-dessus.

Le [bilan selon les sept critères](GRILLE-REMISE.md) rassemble les conclusions de la remise. Les contrôles sont datés dans chaque rapport et couvrent les corrections graphiques et les optimisations intégrées, sur les fichiers identifiés dans [empreintes-finales.json](empreintes-finales.json), identiques aux fichiers du site publiés dans le commit `57e156f34f697b3f07b73534adda23a3f558b462`. Les valeurs SHA-256 des CSS et HTML sont également présentes dans les relevés responsive et W3C.

Les preuves brutes sont conservées avec leurs dates, identifiants de base et chemins de travail d’origine. Ces chemins servent à documenter le contrôle ; les fichiers inclus ci-dessous sont consultables dans le dépôt. Les identifiants de base antérieurs à la mise à jour de l’historique n’identifient pas à eux seuls l’arbre final : les empreintes des fichiers font foi.

## Preuves finales

| Contrôle | Périmètre et résultat | Fichiers |
| --- | --- | --- |
| Comparaison Figma | 44 vues de base à 390/1440 px, états et différences conservées documentés | [Accueils](figma-accueils.json), [pages](figma-pages.json), [inscription/FAQ](figma-inscription-faq.json), [notices](figma-notices.json) |
| Responsive | 22 pages × 13 largeurs = 286 mises en page ; 18 états interactifs ; aucun échec, débordement horizontal ou ressource cassée détecté | [Résultats](responsive.json), [sources testées](sources-testees.json) |
| Équivalent CSS du zoom | 12 vues à 720 × 450 pixels CSS et densité 2, correspondant à la surface CSS d’une fenêtre 1440 × 900 au zoom 200 % ; aucun échec | [Résultats et limites](zoom-equivalent.json) |
| HTML et CSS | Nu HTML Checker 26.11.9 : 22 HTML et feuille CSS sans erreur ni avertissement | [Nu](validation-html-css.json), [réponse brute](nu-local-raw.json) |
| CSS W3C | Profil CSS3 : zéro erreur, 191 avertissements | [Bilan W3C](validation-w3c.json), [bilan CSS](validation-css-w3c.json), [réponse brute CSS](css-multipart-response.json) |
| Accessibilité automatisée | axe-core 4.14.0 : 50 contrôles sans violation détectée | [Résultats axe](accessibilite-axe.json) |
| Contraste textuel | 20 associations contrôlées au seuil normal AA de 4,5:1 ; borne minimale conservatrice de 4,686:1 | [Calculs](contrastes.json), [script reproductible](contrastes.py) |
| Code et SEO | Analyse des 22 documents, langues, titres, descriptions, hiérarchie et structure | [Code et SEO](code-seo.json), [accessibilité des URL publiques aux robots](indexabilite.json) |

Les contrôles responsive couvrent 320, 360, 390, 412, 639, 640, 768, 895, 896, 1024, 1280, 1440 et 1920 pixels CSS. Les états comprennent le menu ouvert, Échap, le changement de point de rupture et les erreurs, la confirmation et le retour du formulaire dans les deux langues. Le zoom natif du navigateur n’est pas couvert par les 12 contrôles CSS équivalents.

Le service CSS W3C signale 146 redéfinitions, 18 avertissements de couleur, 9 liés aux variables CSS, 4 aux familles génériques de polices, 12 aux couleurs de fond et 2 aux couleurs identiques. Ces avertissements sont conservés ; le nombre d’erreurs du service est nul.

Le contraste est calculé sur les couleurs textuelles stables et les survols stabilisés, avec une borne conservatrice couvrant toute couleur d’image sous les dégradés. Les transitions intermédiaires, icônes et contours de focus ne sont pas inclus dans ce calcul. Les vérifications automatisées complètent les contrôles fonctionnels sans constituer un audit WCAG manuel exhaustif.

## Rapports Lighthouse

Les quatre derniers rapports ci-dessous portent sur le site publié après les corrections graphiques, au commit `57e156f34f697b3f07b73534adda23a3f558b462`. Ils obtiennent 100 dans les quatre catégories. Les [huit mesures](lighthouse-repetitions.json), dont trois passages mobiles par langue, obtiennent toutes 100.

- [Accueil français, mobile](accueil-fr-mobile.html)
- [Accueil français, ordinateur](accueil-fr-ordinateur.html)
- [Accueil anglais, mobile](accueil-en-mobile.html)
- [Accueil anglais, ordinateur](accueil-en-ordinateur.html)

Les rapports HTML joints proviennent de Lighthouse exécuté directement sur le site publié. Des rapports PageSpeed publics antérieurs, tous à 100, sont conservés avec leurs dates et URL dans [pagespeed-public.json](pagespeed-public.json) ; ils précèdent les derniers allégements.

Le fichier [resultats.json](resultats.json) rassemble les résultats chiffrés et distingue le périmètre des mesures Lighthouse de celui des contrôles finaux.

À titre historique, un [passage anglais mobile avant optimisation](accueil-en-mobile-premier-passage.html) avait donné 99, puis un [contrôle sur cette ancienne version](historique/accueil-en-mobile-controle-avant-optimisation.html) avait donné 100. Les huit nouvelles mesures de la version optimisée obtiennent toutes 100.

## Ressources initiales

Les [gains de ressources](performance-ressources.json) conservent tous les caractères de DM Sans. Les textures décoratives utilisent le chargement différé natif, avec variantes 320/480 px. La comparaison typographique de 44 vues ne relève aucun déplacement après l’optimisation des fontes de la version distante. Les [contrôles de pointeur](interactions-textures.json) confirment que les 20 liens concernés restent accessibles et que les 13 images de chaque accueil se chargent après défilement.

Les contrôles complémentaires de zoom CSS sont conservés avec leurs dates et leurs empreintes d’origine. Les contrôles responsives de la version intégrée et les mesures Lighthouse récentes identifient séparément leurs fichiers testés.
