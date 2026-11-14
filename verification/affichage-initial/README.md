# Affichage initial des accueils

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

Les mesures Google du site publié seront ajoutées après le déploiement de cette correction. Un lien du viewer contenant `psiurl` lance une nouvelle mesure : il ne désigne pas un rapport sauvegardé. Les rapports JSON et HTML autonomes permettent de consulter un résultat daté sans relancer l’analyse.
