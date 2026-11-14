# Grille de remise de MOMOA

Cette grille reprend les sept critères fournis pour le projet. Les preuves finales portent sur les fichiers identifiés par leurs [empreintes SHA-256](empreintes-finales.json), après corrections graphiques et régénération des 22 pages, publiées dans le commit `57e156f34f697b3f07b73534adda23a3f558b462`. Le [détail des contrôles](README.md) donne les outils, le périmètre et les limites.

Le [contrôle complémentaire de l’affichage initial](affichage-initial/README.md) couvre la modification ultérieure du chargement CSS des deux accueils : dix vues restent identiques au pixel près, avec nouvelle validation HTML/CSS et contrôles des menus.

| Critère | Conclusion | Éléments vérifiés |
| --- | --- | --- |
| 1. Conformité graphique générale aux maquettes | Conformité générale vérifiée, adaptations et écarts résiduels documentés | 44 vues de base : 4 accueils, 16 vues galerie/collection/inscription/FAQ et 24 vues de notices, en FR/EN à 390 et 1440 px ; états complémentaires du menu et du formulaire. |
| 2. Responsive | Contrôles réussis | 286 mises en page sur 13 largeurs de 320 à 1920 px, 18 états interactifs et 12 vues avec zone CSS équivalente à 200 % ; aucun échec détecté. |
| 3. Bootstrap | Sans objet : facultatif et non utilisé | CSS Grid, Flexbox, variables partagées et media queries assurent la mise en page. |
| 4. Règles d’écriture du code | Conventions usuelles appliquées | Structure HTML sémantique, identifiants uniques, absence d’attributs style et d’événements HTML, source CSS commune et JavaScript séparé, modèles communs, contenus bilingues centralisés et échappés ; syntaxe du générateur et régénération vérifiées. Les styles des accueils sont intégrés automatiquement au HTML pour supprimer une requête bloquante. |
| 5. Validation W3C | Zéro erreur | Nu HTML Checker : 22 HTML et CSS sans message ; service CSS W3C : zéro erreur et 191 avertissements conservés dans le rapport. |
| 6. Bases SEO | Bases appliquées aux 22 pages | Titres et descriptions renseignés, un H1 par page, hiérarchie cohérente, langue du document, UTF-8, viewport, images avec attribut alt approprié et liens nommés ; URL publiques en HTTP 200 sans directive noindex. |
| 7. Accessibilité | Contrôles automatisés et fonctionnels réussis dans le périmètre décrit | 50 contrôles axe sans violation, menu et formulaires au clavier, focus, navigation principale sans JavaScript, 20 associations textuelles au seuil AA ; borne minimale de contraste 4,686:1. |

## Fidélité graphique et adaptations conservées

Les comparaisons retrouvent les mêmes œuvres et photographies, les mêmes familles Cormorant Garamond et DM Sans, la palette, l’ordre des sections, les colonnes et les cadrages principaux. Les corrections portent notamment sur le cadrage du fond de l’accueil, les espacements, les tailles de titres, l’alignement des cartes et les blocs de crédit des notices.

Les bilans documentent les variations restantes :

- Les accueils restent environ 2 à 6 px différents en hauteur totale ; les collections environ 1 à 4 px, en raison des métriques de texte et arrondis de rendu.
- La galerie mobile garde une hauteur naturelle différente lorsque les anciennes coordonnées DEDAL sont remplacées par un lien utile vers la FAQ : environ −41 px en français et −25 px en anglais.
- La notice du Discobole mobile conserve les liens supplémentaires vers Cambridge et la licence CC BY-SA 3.0, soit environ 63 à 64 px supplémentaires ; les autres notices mobiles restent proches à environ 3 px près.
- L’inscription anglaise sur ordinateur conserve le flux normal du contenu : la hauteur fixe de la maquette provoque un chevauchement du pied de page et des informations, que le site évite.
- Le voile de la section d’histoire conserve une opacité minimale de 0,64 pour le contraste. Les crédits cliquables, soulignements de navigation et indications de focus sont préservés.
- De faibles différences de texture, de séparateurs, de rendu de police et de compression WebP/AVIF subsistent. La conformité générale ne constitue pas une identité pixel à pixel.

Preuves : [accueils](figma-accueils.json), [pages et écarts résiduels](figma-pages.json), [états inscription/FAQ](figma-inscription-faq.json), [notices](figma-notices.json), [alignement final des cartes](figma-collection-alignement.json) et [géométrie finale des notices](figma-notices-geometrie.json).

## Périmètre des validations

Le responsive contrôle les boîtes, le défilement, les limites horizontales, les images et les états. Le contrôle de 12 vues à 720 × 450 pixels CSS avec densité 2 reproduit la zone CSS d’un zoom de 200 % dans une fenêtre 1440 × 900 ; il ne vérifie pas la commande de zoom native du navigateur.

Les 191 avertissements CSS W3C concernent des redéfinitions, couleurs, variables et familles génériques. Ils sont conservés dans la [réponse brute](css-multipart-response.json) ; aucune erreur CSS n’est signalée.

Le contrôle du code suit les conventions communes du projet ; aucun guide de style propre au cours n’a été fourni. Le mot « Collection » produit naturellement le même titre FR/EN, avec des descriptions et langues distinctes. Les URL canoniques, un sitemap XML et les métadonnées alternatives de langue restent des améliorations possibles, sans blocage des bases SEO contrôlées.

Les calculs de contraste couvrent le texte stable et les survols stabilisés. L’accessibilité des icônes, l’ensemble des technologies d’assistance et les transitions intermédiaires ne sont pas certifiés par ces calculs ou par axe. Le formulaire est explicitement une démonstration sans envoi ni conservation de données.

Les derniers rapports Lighthouse du site corrigé obtiennent 100 dans les quatre catégories sur les deux accueils, en français et en anglais, sur mobile et ordinateur. Les huit mesures de la version optimisée obtiennent 100 ; elles sont conservées dans le [dossier de vérification](README.md).
