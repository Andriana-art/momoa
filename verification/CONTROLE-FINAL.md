# Contrôle final de MOMOA avant remise

Vérification du **14 novembre 2026**, sur le site publié **https://andriana-art.github.io/momoa/**. Le code contrôlé localement est `d0cc826`, fusionné par la [PR française nº9](https://github.com/Andriana-art/momoa/pull/9) et publié dans `90ac25625c539c70b6c79353c44dc21eacf909f6`. Les [empreintes](controle-final/empreintes.json) et les [résultats chiffrés](controle-final/resultats.json) identifient les fichiers concernés. Les ajouts ultérieurs de preuves ne modifient pas le site dans `docs/`.

Les contrôles techniques ci-dessous réussissent. La campagne Google finale donne **22 passages à 100 et deux à 99 en performances**, sur 22 pages mobiles et les deux accueils sur ordinateur. Les 24 mesures donnent 100 en accessibilité, bonnes pratiques et SEO, un TBT nul et un CLS nul. L’objectif strict 100 en performances pour chaque URL reste donc partiellement atteint.

## Grille de remise

| Critère | Résultat contrôlé | Preuves |
| --- | --- | --- |
| Fidélité graphique | Continuité des 44 vues Figma examinées précédemment ; corps de 21 documents inchangés ; seuls les attributs initiaux des deux formulaires évoluent. Les 16 comparaisons de leurs états FR/EN à 390/1440 px sont identiques au pixel près. Les écarts de maquette déjà documentés restent conservés. | [Continuité](controle-final/responsive/continuite-rendu.json), [comparaisons](controle-final/responsive/signup-comparison.json), [écarts Figma](GRILLE-REMISE.md) |
| Responsive | 23 documents × 13 largeurs de 320 à 1920 px : 299 mises en page, 18 états interactifs et 174 contrôles fonctionnels, sans échec détecté. | [Bilan](controle-final/responsive/resume.json), [résultats complets](controle-final/responsive/resultats-responsive.json), [interactions](controle-final/responsive/interactions.json) |
| Bootstrap | Facultatif et non utilisé ; CSS Grid, Flexbox et media queries assurent la mise en page. | [Code et SEO](controle-final/code/static-findings.json) |
| Écriture du code | Sources communes, contenu échappé, HTML sémantique, identifiants uniques, contrôles nommés, absence d’attributs style et d’événements HTML ; syntaxe JS et régénération reproductible vérifiées. CSS et JS sont versionnés par leur contenu. | [Revue](controle-final/code/code-review.json), [ressources générées](controle-final/code/generated-asset-checks.json) |
| Validation HTML/CSS | Nu 26.11.9 : 23 HTML et CSS, styles intégrés inclus, zéro erreur et zéro avertissement. Validateur CSS officiel W3C, profil CSS3 : zéro erreur et 11 avertissements conservés. | [Nu](controle-final/code/nu-summary.json), [CSS W3C](controle-final/code/validation-css-w3c-officielle.json), [réponse CSS complète](controle-final/code/jigsaw-officiel-local.json) |
| Bases SEO | Titres, descriptions, langues, H1, hiérarchie, alt et liens nommés sur 22 pages ; 783 références internes valides ; aucune directive noindex sur les pages métier. | [Analyse statique](controle-final/code/static-findings.json), [site publié](controle-final/published/site-publie.json) |
| Accessibilité | 52 contrôles axe sans violation détectée, 171 contrôles clavier/focus, 32 contrôles de repli JS et 23 associations textuelles au seuil AA ; borne minimale 4,686:1. | [Bilan](controle-final/accessibility/summary.json), [axe](controle-final/accessibility/axe-all-pages.json), [clavier](controle-final/accessibility/keyboard.json), [repli JS](controle-final/accessibility/script-fallback.json), [contrastes](controle-final/accessibility/contrastes.json) |

La navigation bilingue et sans JavaScript couvre les 22 pages. Les erreurs, la correction, la confirmation et le retour du formulaire sont testés. Aucune requête de soumission ni écriture de stockage ou de cookie n’a été observée pendant ces interactions de démonstration.

## Problème trouvé et corrigé

Sur l’inscription française, le formulaire était initialement masqué jusqu’à l’exécution du script différé. Le bloc suivant se déplaçait de 453 px. Google mesurait un CLS de 0,2198 et une performance de 89. Le retard volontaire du script reproduit exactement ce déplacement, avec les polices déjà chargées.

Le formulaire occupe désormais sa place dès le premier rendu lorsque JavaScript est activé. Ses contrôles restent inertes jusqu’à l’installation des gestionnaires. Sans JavaScript, ou en cas d’échec de chargement du script, le message et la navigation de repli restent disponibles. Les ressources CSS/JS sont versionnées, et la police des titres est préchargée sur toutes les pages qui l’utilisent.

Le test contrôlé avec plus de 2 secondes de retard du script donne 0 px de déplacement et un CLS nul. Google mesure ensuite 100 sur les deux inscriptions, avec CLS 0. Les captures des quatre états du formulaire restent identiques à la version antérieure.

- [Diagnostic avant](controle-final/signup-before-diagnostic.json) · [diagnostic après](controle-final/signup-after-diagnostic.json)
- [Rapport HTML de l’inscription française après correction](controle-final/inscription-mobile.html)

## Lighthouse et PageSpeed sur toutes les pages

Les 24 mesures ci-dessous proviennent du moteur Google PageSpeed, via le viewer Lighthouse 13.6.0, entre **22:34 et 22:38, heure de Paris**. Une mesure par cible a été effectuée après vérification des 22 HTML publiés. Aucun passage minoré de cette campagne n’a été remplacé par une nouvelle tentative.

| Page | Appareil | Performance | Accessibilité | Bonnes pratiques | SEO | CLS | Rapport JSON complet |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/momoa/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/home-fr-mobile.json.gz) |
| `/momoa/en/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/home-en-mobile.json.gz) |
| `/momoa/` | Ordinateur | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/home-fr-desktop.json.gz) |
| `/momoa/en/` | Ordinateur | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/home-en-desktop.json.gz) |
| `/momoa/collection/athena/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-athena-mobile.json.gz) |
| `/momoa/collection/discobole/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-discobole-mobile.json.gz) |
| `/momoa/collection/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-mobile.json.gz) |
| `/momoa/collection/poseidon/` | Mobile | 99 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-poseidon-mobile.json.gz) |
| `/momoa/collection/prometheus/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-prometheus-mobile.json.gz) |
| `/momoa/collection/venus-de-milo/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-venus-de-milo-mobile.json.gz) |
| `/momoa/collection/victoire-de-samothrace/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/collection-victoire-de-samothrace-mobile.json.gz) |
| `/momoa/en/collection/athena/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-athena-mobile.json.gz) |
| `/momoa/en/collection/discobolus/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-discobolus-mobile.json.gz) |
| `/momoa/en/collection/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-mobile.json.gz) |
| `/momoa/en/collection/poseidon/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-poseidon-mobile.json.gz) |
| `/momoa/en/collection/prometheus/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-prometheus-mobile.json.gz) |
| `/momoa/en/collection/venus-de-milo/` | Mobile | 99 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-venus-de-milo-mobile.json.gz) |
| `/momoa/en/collection/winged-victory-of-samothrace/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-collection-winged-victory-of-samothrace-mobile.json.gz) |
| `/momoa/en/gallery/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-gallery-mobile.json.gz) |
| `/momoa/en/questions/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-questions-mobile.json.gz) |
| `/momoa/en/sign-up/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/en-sign-up-mobile.json.gz) |
| `/momoa/galerie/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/galerie-mobile.json.gz) |
| `/momoa/inscription/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/inscription-mobile.json.gz) |
| `/momoa/questions/` | Mobile | 100 | 100 | 100 | 100 | 0 | [JSON.gz](controle-final/lighthouse-apres/questions-mobile.json.gz) |

Les deux 99 concernent la notice française de Poséidon et la notice anglaise de Vénus. Leur Speed Index est à 3,5–3,6 s, avec un LCP à 1,2 s, un TBT nul et un CLS nul. L’origine précise du délai observé avant peinture n’a pas été établie. Leurs scores sont conservés intégralement.

Les [mesures finales détaillées](controle-final/lighthouse-apres.json) donnent les dates, configurations, métriques et empreintes des sources. Les rapports HTML autonomes de l’[accueil français](controle-final/home-fr-mobile.html), de l’[accueil anglais](controle-final/home-en-mobile.html) et de la [FAQ anglaise](controle-final/en-questions-mobile.html) sont téléchargeables et peuvent être ouverts dans un navigateur. Les JSON complets sont compressés en GZip pour limiter le poids du dépôt.

La [campagne initiale](controle-final/lighthouse-avant.json) reste conservée : 21 performances à 100, une à 99, la FAQ anglaise à 98 et l’inscription française à 89. Une réponse 503 isolée sur la texture de l’accueil ordinateur avait aussi donné 96 en bonnes pratiques ; le [contrôle de disponibilité](controle-final/incident-texture-disponibilite.json) et un [passage de confirmation](controle-final/lighthouse-avant/summary-followup.json.gz) ont ensuite réussi. La campagne finale ne contient aucune erreur de ce type. Les tests locaux de retard des polices n’ont pas reproduit le CLS de la FAQ initiale ; son origine n’est pas affirmée comme résolue par une cause démontrée.

Un lien du viewer contenant `psiurl` lance une nouvelle analyse. Pour mesurer MOMOA, utilisez l’adresse du site indiquée en haut, plutôt que l’adresse GitHub de ce rapport. Les scores peuvent varier lors d’une nouvelle mesure.

## Dépôt, déploiement et archive

Les 115 fichiers de `docs/` sont servis enHTTPS et correspondent octet pour octet au code publié. Les 22 routes métier retournent 200 ; une URL inconnue retourne bien 404 avec la page personnalisée et son lien de retour. Le [workflow GitHub Pages](https://github.com/Andriana-art/momoa/actions/runs/43643382742) est terminé avec succès ; la source reste `main` et `/docs`.

L’[archive GitHub du code publié](controle-final/published/archive.json), contrôlée avant ajout de ce dossier de preuves, contient les 178 fichiers attendus, sans erreur CRC, fichier parasite ou différence avec Git. Le générateur, les 22 routes, la 404, les polices, leurs licences et la documentation sont présents. Le [contrôle du dépôt](controle-final/hygiene-depot.json) ne relève aucun des motifs explicites de clés testés ; il ne constitue pas un audit complet de sécurité.

## Limites et éléments conservés

- La conformité graphique reprend l’audit Figma antérieur et vérifie sa continuité ; aucune nouvelle consultation complète de Figma n’a été faite. La 404 ne possède pas de maquette documentée.
- Les 50 vérifications axe incomplètes concernent les contrastes sur images et dégradés. Des calculs complémentaires couvrent les associations textuelles recensées. Les lecteurs d’écran, le zoom natif, les autres moteurs et les contrastes des icônes/contours ne font pas l’objet d’un audit exhaustif.
- Le service CSS W3C en ligne retournait des erreurs 500. Le CSS a été contrôlé localement avec le [JAR officiel de W3C](https://github.com/w3c/css-validator/releases/tag/cssval-20250226), profil CSS3, niveau d’avertissements 2. Un contrôle volontairement invalide donne deux erreurs, confirmant que le parseur lit bien le contenu. Le résultat du site est zéro erreur et 11 avertissements ; aucun résultat web non vérifié n’est utilisé comme preuve.
- Les 13 références externes étaient joignables au [premier contrôle](controle-final/code/liens-externes-premier-controle.json). Au [contrôle suivant](controle-final/code/external-links.json), la référence officielle des archives SMB a dépassé le délai ; les 12 autres répondaient. Les 783 références internes restent valides.
- Sitemap, canonical et robots.txt sont des améliorations facultatives absentes. Les pages métier sont accessibles aux robots ; cela ne garantit pas leur indexation effective par un moteur.
