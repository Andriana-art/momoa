# Affichage initial des accueils

Les quatre mesures Google après publication donnent **100 en performances, accessibilité, bonnes pratiques et SEO**. Elles ont été réalisées une fois chacune le 14 novembre 2026, entre 20:31 et 20:32 UTC, via le viewer Lighthouse utilisant PageSpeed Insights, après vérification des empreintes des HTML publiés au commit `233b231a6bf17d808947989e70e1d5a03d87f8e2`.

| Accueil | Appareil | Performance | Speed Index | LCP | TBT | CLS | Rapport enregistré |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Français | Mobile | 100 | 2,1 s | 1,2 s | 0 ms | 0 | [HTML](fr-mobile.html) · [JSON](fr-mobile.json) |
| Anglais | Mobile | 100 | 2,1 s | 1,2 s | 0 ms | 0 | [HTML](en-mobile.html) · [JSON](en-mobile.json) |
| Français | Ordinateur | 100 | 0,4 s | 0,4 s | 0 ms | 0 | [HTML](fr-desktop.html) · [JSON](fr-desktop.json) |
| Anglais | Ordinateur | 100 | 0,2 s | 0,4 s | 0 ms | 0 | [HTML](en-desktop.html) · [JSON](en-desktop.json) |

Les [mesures Google détaillées](mesures-google.json) conservent les dates, configurations mobiles/ordinateur, empreintes des pages et diagnostics. La [capture du viewer mobile français](fr-mobile-viewer.png) montre le résultat sans relancer une analyse. Pour consulter un rapport HTML autonome depuis GitHub, téléchargez-le puis ouvrez-le dans votre navigateur.

## Rapport fourni avant correction

Le rapport mobile fourni le 14 novembre 2026 mesure bien le site MOMOA : **99 en performances**, avec un Speed Index de 3,526 s. Le FCP est à 0,762 s, le LCP à 1,201 s, le TBT à 0 ms et le CLS à 0. Le [résumé des données fournies](rapport-fourni-resume.json) conserve les mesures et l’empreinte du JSON d’origine.

Les captures du rapport présentent une attente avant le premier affichage, malgré la fin du chargement des ressources critiques. Sans la trace complète, son origine ne peut pas être attribuée avec certitude au code, au décodage d’image ou à l’environnement de mesure. Un autre passage à 100 ne suffit pas à expliquer ce 99.

## Correction

Lighthouse identifie la feuille CSS externe comme bloquante et estime un gain de 140 ms en la retirant du chemin critique. Le générateur intègre désormais cette feuille dans les deux accueils, après les préchargements de polices et d’images. Il réécrit les URL des ressources relativement à chaque document. La source reste unique : `docs/assets/styles.css`.

Les vingt autres pages générées conservent leur feuille externe versionnée. La régénération reste nécessaire après toute modification du CSS. Le téléchargement HTML compressé augmente d’environ 5,2 ko, tout en supprimant le téléchargement CSS initial distinct d’environ 5,4 ko hors en-têtes. La première visite d’une autre page chargera sa feuille CSS externe en cache.

## Contrôles avant publication

- [Nu HTML Checker](validation-nu.json) : 22 HTML et CSS, y compris les styles intégrés, sans erreur ni avertissement.
- [Comparaison visuelle](comparaison-visuelle.json) : dix vues FR/EN à 390, 412, 640, 896 et 1440 px ; captures identiques au pixel près, dimensions et styles résolus identiques, polices et treize images chargées.
- [Navigation](interactions.json) : 26 contrôles réussis, dont menu au clavier, restitution du focus et navigation sans JavaScript.
- [Accessibilité axe](accessibilite-axe.json) : six contrôles sans violation détectée. Les contrastes sur images restent des vérifications manuelles, documentées dans le bilan général.
- [Sources contrôlées](sources.json) : empreintes des deux accueils, de la feuille CSS et du générateur.

Les [mesures locales](mesures-locales.json) sont conservées : 91 pendant les contrôles navigateur concurrents, puis 99 sans ces contrôles. Le second passage a un Speed Index de 0,9 s et un TBT de 90 ms. Aucun des deux passages ne signale de ressource bloquant l’affichage. Ces mesures locales ne constituent pas un résultat PageSpeed du site publié.

## Mesure après publication

Les quatre nouveaux rapports ne contiennent aucune requête CSS externe, aucune ressource bloquant l’affichage et aucun avertissement d’exécution. Les mesures mobiles ont un FCP de 0,8 s.

Un intervalle entre la fin du chargement et la première peinture observée subsiste dans ces mesures Google, plus court que dans le rapport fourni. Son origine précise reste indéterminée. La suppression de la requête CSS bloquante est vérifiée ; elle ne permet pas d’attribuer à elle seule toute la différence de Speed Index.

Un lien du viewer contenant `psiurl` lance une nouvelle mesure : il ne désigne pas un rapport sauvegardé. Les rapports JSON et HTML autonomes permettent de consulter un résultat daté sans relancer l’analyse. Les scores décrivent ces passages et peuvent varier lors d’une nouvelle exécution.
