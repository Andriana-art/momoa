# Vérifications de MOMOA avant remise

Les contrôles ci-dessous concernent le commit `36e98ce0e2cf54d76a69b9645b8a89a553e609ea`, publié sur [GitHub Pages](https://andriana-art.github.io/momoa/). Ils ont été effectués le 13 novembre 2026. Les modifications ultérieures de la documentation ne changent pas les fichiers du site testés.

## Rapports Lighthouse du site publié

Ouvrez les fichiers HTML suivants dans un navigateur ; ce sont des rapports autonomes complets, consultables hors ligne.

| Page testée | Appareil | Performances | Accessibilité | Bonnes pratiques | SEO | Rapport |
| --- | --- | --- | --- | --- | --- | --- |
| Accueil français | Mobile | 100 | 100 | 100 | 100 | [Rapport mobile](accueil-fr-mobile.html) |
| Accueil français | Ordinateur | 100 | 100 | 100 | 100 | [Rapport ordinateur](accueil-fr-ordinateur.html) |
| Accueil anglais | Mobile | 100 | 100 | 100 | 100 | [Rapport mobile](accueil-en-mobile.html) |
| Accueil anglais | Ordinateur | 100 | 100 | 100 | 100 | [Rapport ordinateur](accueil-en-ordinateur.html) |

Lighthouse 13.6.0 a été exécuté directement sur les accueils publiés, en français (`https://andriana-art.github.io/momoa/`) et en anglais (`https://andriana-art.github.io/momoa/en/`).

| Page et appareil | FCP | LCP | Indice de vitesse | Temps total de blocage | CLS |
| --- | --- | --- | --- | --- | --- |
| Français, mobile | 0,9 s | 1,8 s | 1,4 s | 30 ms | 0 |
| Français, ordinateur | 0,3 s | 0,5 s | 0,5 s | 0 ms | 0 |
| Anglais, mobile | 0,9 s | 1,6 s | 1,1 s | 30 ms | 0 |
| Anglais, ordinateur | 0,3 s | 0,5 s | 0,5 s | 0 ms | 0 |

FCP désigne le premier affichage de contenu, LCP le plus grand élément visible et CLS les décalages de mise en page.

Une tentative puis un nouvel essai sur le site de PageSpeed Insights ont renvoyé « Unable to resolve » pour l’accueil anglais. Aucun nouveau rapport PageSpeed partageable n’a donc été créé. Les scores ci-dessus proviennent des rapports Lighthouse joints, pas d’une nouvelle analyse aboutie sur le site PageSpeed.

## Contrôles fonctionnels et ressources

- Nu HTML Checker 26.11.9 valide les 22 documents HTML et la feuille de style sans erreur ni avertissement.
- axe-core 4.14.0 ne détecte aucune violation lors de 50 contrôles : les 22 pages sur mobile et ordinateur et six états interactifs stabilisés du menu et du formulaire, dans les deux langues. Les contrastes sur fonds en dégradé, que cet outil ne peut pas déterminer, ont été contrôlés séparément par calcul conservateur.
- Les 18 associations de couleurs de texte et de fond contrôlées passent le seuil AA de 4,5:1. Pour les fonds texturés, le calcul couvre toute couleur d’image sous-jacente possible ; la borne minimale est de 4,686:1. Il porte sur les couleurs stables du texte et des survols, sans inclure les phases intermédiaires des animations, les icônes ni les contours de focus.
- Les 22 pages publiées répondent avec le statut HTTP 200 ; leur contenu correspond aux fichiers HTML du commit testé.
- Les 715 références locales vers les pages, les ancres et les ressources sont valides.
- Les 22 pages ont été contrôlées à 390 px et 1440 px, soit 44 mises en page, sans débordement horizontal.
- Le menu, sa fermeture avec Échap, le retour du focus et les états du formulaire de démonstration fonctionnent en français et en anglais.
- La navigation principale reste accessible avec JavaScript désactivé.
- Après défilement complet de chaque accueil publié, les 10 images sont chargées à 412 px et 1350 px, dans les deux langues.
- Aucun échec de requête ni erreur JavaScript n’a été relevé lors de ces contrôles.
- Les 13 liens externes des pages vers les sources, crédits et licences répondent avec le statut HTTP 200.

Le fichier [resultats.json](resultats.json) rassemble les résultats chiffrés, les adresses testées et les dates des rapports. Les résultats bruts de [Nu HTML Checker](validation-html-css.json) et d’[axe-core](accessibilite-axe.json) sont également inclus. Les contrôles automatisés d’accessibilité complètent les vérifications fonctionnelles et ne constituent pas une certification manuelle complète.

Le [détail des calculs de contraste](contrastes.json) indique les classes CSS et l’empreinte de la feuille de style vérifiée. Pour les reproduire sans dépendance supplémentaire, exécutez `python3 verification/contrastes.py` depuis la racine du dépôt.
