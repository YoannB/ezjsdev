# Spécification fonctionnelle et technique — ezjsdev

**Version :** 0.1 — 3 novembre 2026  
**Statut :** proposition de spécification à valider avant développement  
**Type de projet :** site vitrine personnel / portfolio interactif  
**Nom de travail :** ezjsdev (à confirmer)  
**Langues au lancement :** français et anglais  
**Référence visuelle :** maquettes desktop et mobile fournies  
**Socle technique prévu :** boilerplate Next.js + TypeScript + OpenRouter + Netlify, avec Material UI

---

## 1. Objet du document et périmètre des sources

Cette spécification décrit la création du site personnel de Yoann Barbier à partir :

- de la maquette desktop « Interface VS Code sombre avec aperçu ezjsdev » ;
- de la maquette mobile « Interface mobile d’éditeur web sombre en français » ;
- du CV LinkedIn fourni en PDF ;
- du boilerplate Next.js / OpenRouter / Netlify qui sera transmis depuis GitHub après relecture et validation.

Le code du boilerplate n’étant pas encore disponible dans le cadre de cette spécification, aucune hypothèse ne doit être considérée comme une description de son implémentation actuelle. **La première étape du futur développement sera donc un audit du dépôt**, afin d’identifier les composants, conventions, routes, dépendances et fonctions déjà présents et de les réutiliser au maximum.

L’URL Axons communiquée ([https://axons-preview.netlify.app/fr](https://axons-preview.netlify.app/fr)) est une référence de projet et de rendu fournie par le commanditaire. Son code et son état exact devront être vérifiés dans le dépôt ou sur le site au moment de l’implémentation ; cette spécification ne prétend pas avoir audité ce code.

### 1.1 Principes de conception

1. Conserver l’esprit des deux maquettes : une interface de développeur inspirée de VS Code, sombre par défaut, textuelle, lisible et rétro-moderne.
2. Transformer cette interface en véritable navigation de portfolio : les fichiers et dossiers représentent les pages et rubriques du site.
3. Ne pas construire un IDE complet. L’éditeur est une représentation visuelle en lecture seule du contenu des pages ; il ne doit pas nécessiter le coût et la complexité d’un véritable éditeur de code.
4. Faire du site une vitrine professionnelle crédible, avec des informations vérifiables issues du CV et des réalisations validées par le commanditaire.
5. Réutiliser le boilerplate existant plutôt que de reconstruire l’architecture ou de mettre à jour arbitrairement ses dépendances.
6. Distinguer clairement les animations de démonstration, les véritables appels à l’IA et les résultats réellement déployés.

---

## 2. Objectifs du site

Le site doit remplir quatre objectifs principaux :

- **Présenter le profil professionnel** : développeur full-stack senior, indépendant, orienté React, TypeScript, Node.js, architecture et accompagnement technique.
- **Rendre le parcours navigable et mémorable** : les visiteurs parcourent le site comme un projet dans un environnement de développement.
- **Valoriser les réalisations** : montrer des expériences et projets concrets, sans publier de détails confidentiels ni inventer de résultats.
- **Créer un effet de démonstration** : une console animée et un aperçu de site illustrent le processus de réalisation d’un projet web et permettent de découvrir un rendu réel, notamment celui d’Axons.

Le site doit rester un portfolio et un support de prise de contact. Il ne doit pas devenir une application SaaS avec comptes utilisateurs, espace d’administration ou stockage de projets clients.

### 2.1 Indicateur de réussite

Un visiteur doit pouvoir comprendre en moins d’une minute :

- qui est Yoann Barbier et quel est son niveau d’expérience ;
- quelles expertises il propose ;
- quels types de projets il peut prendre en charge ;
- quelques réalisations représentatives ;
- comment le contacter, en priorité via LinkedIn.

---

## 3. Positionnement et contenu professionnel

Le contenu éditorial doit partir du CV fourni. Il peut être reformulé pour le web, mais les dates, responsabilités, technologies, chiffres et résultats doivent rester exacts.

### 3.1 Présentation proposée

**Titre professionnel :**  
Lead Full-Stack Senior — React, TypeScript, Node.js | Ex-CTO

**Accroche proposée :**  
Développeur full-stack indépendant basé à Nantes, j’accompagne les entreprises et les équipes produit dans la conception, l’architecture et l’évolution d’applications web modernes. J’interviens principalement sur les environnements JavaScript et TypeScript, avec une attention particulière portée à la qualité du code, aux performances et à la robustesse des solutions.

**Éléments factuels à valoriser :**

- Plus de 15 ans d’expérience professionnelle indiqués dans le CV.
- Activité indépendante en développement full-stack depuis juin 2021.
- Expérience de Lead Developer FullStack chez Lone Stone de juin 2018 à juin 2021.
- Expérience de CTO chez Keople de septembre 2014 à mai 2018.
- Conception et évolution de la plateforme SaaS myKeople, passée du prototype à une version utilisée par plus de 16 000 utilisateurs.
- Taux de participation de 93 % indiqué pour cette plateforme.
- Diplôme de Polytech’Nantes, spécialité Système Informatique Logicielle et Réseaux, obtenu en 2008.
- Basé à Nantes, disponible en télétravail ou sur site selon les projets.

Ne pas remplacer automatiquement « plus de 15 ans » par un nombre calculé à partir des dates : conserver la formulation du CV tant qu’une nouvelle version du CV n’a pas été validée.

### 3.2 Expertises à présenter

Les expertises directement étayées par le CV sont :

- développement front-end et full-stack ;
- React.js et TypeScript ;
- Node.js et NestJS ;
- architecture et refonte d’applications web ;
- applications SaaS, web et mobiles ;
- optimisation des performances et évolutivité ;
- lead technique, coordination et mentoring ;
- intégration continue et pipelines CI/CD ;
- qualité du code, tests et documentation ;
- Vue / Nuxt, Angular, HTML et CSS.

Le référencement naturel et les outils SEO apparaissent dans le concept des maquettes, mais ne sont pas décrits comme une expérience professionnelle détaillée dans le CV transmis. Il faudra donc confirmer les prestations SEO exactes, les méthodes utilisées et les éventuels exemples avant d’afficher une promesse d’expertise SEO ou des résultats chiffrés.

### 3.3 Expériences et réalisations

**Indépendant — Full-stack Developer (depuis juin 2021)**  
Interventions d’expertise front-end et full-stack autour de React.js, TypeScript et Node.js. Architecture, performances, bonnes pratiques, intégration continue, tests, pipelines CI/CD et collaboration avec les équipes produit et design.

**Lone Stone — Lead Developer FullStack (juin 2018 – juin 2021)**  
Lead technique sur des projets SaaS, web et mobiles. Supervision d’équipes, choix technologiques, architecture, développement, performances, scalabilité, CI/CD et mentoring. Environnements cités dans le CV : Angular, React, React Native, Vue/Nuxt, Node.js, NestJS, TypeORM et GitLab CI.

**Keople — CTO (septembre 2014 – mai 2018)**  
Direction technique et conception de la plateforme SaaS myKeople, outil RH en ligne. Architecture MEAN, développement du produit du prototype à une version scalable, microservices, Socket.IO, cache mémoire, load balancing, génération PDF et gestion d’équipe. Résultats indiqués dans le CV : plus de 16 000 utilisateurs et 93 % de taux de participation.

**Bull — Ingénieur Développement (juin 2013 – août 2014)**  
Développement d’interfaces pour une box satellite : UI 3D, guide TV, VOD, lecteur multimédia, composants interactifs, middleware et débogage à distance.

**ODAXYS / Infotel — Ingénieur d’études (juillet 2008 – octobre 2012)**  
Participation à des projets grands comptes, refonte d’applications métiers, développement front-end, évolution ExtJS, encadrement technique et intégration continue.

### 3.4 Confidentialité des références clients

Les noms de clients, logos, captures, produits et détails de missions ne doivent être publiés que si leur diffusion est autorisée. À défaut de validation explicite, présenter les missions de manière anonymisée (secteur, type de produit, rôle, stack et contribution) et ne pas utiliser de logo client.

Les noms cités dans le CV — notamment Neadz, Startup Only, Voodoo, Arpej, Comap, PSA, ACFCI et DARVA — ne doivent donc pas être automatiquement transformés en références publiques ou en études de cas détaillées.

### 3.5 Ton rédactionnel

- Professionnel, direct, concret et sobre.
- Éviter les superlatifs génériques (« expert ultime », « révolutionnaire », « résultats garantis »).
- Privilégier les faits, les responsabilités, les technologies et les résultats documentés.
- Rédiger en français et en anglais avec une adaptation naturelle, pas une traduction automatique littérale.
- Ne pas afficher de témoignages, logos, évaluations ou chiffres qui n’ont pas été fournis et validés.

---

## 4. Identité visuelle et principes d’interface

### 4.1 Concept général

L’interface doit évoquer un environnement de développement moderne inspiré de VS Code, sans chercher à reproduire chaque fonction du véritable logiciel.

Éléments visuels à reprendre :

- fond bleu nuit / anthracite en thème sombre ;
- panneaux séparés par de fines bordures ;
- typographie monospace dans l’explorateur, l’éditeur et le terminal ;
- syntax highlighting avec accents cyan, bleu et quelques couleurs secondaires ;
- icônes linéaires ;
- onglets de fichiers avec indicateur d’onglet actif ;
- console en bas avec sorties successives ;
- boutons d’action bleus et états de survol/focus visibles.

Le thème clair doit être une véritable variante travaillée, avec des contrastes, bordures et couleurs de syntaxe adaptés. Il ne suffit pas d’inverser les couleurs du thème sombre.

### 4.2 Logo et identité

Prévoir un logo SVG simple autour du symbole `</>` ou d’un pictogramme de code, associé au nom **ezjsdev** (nom de travail).

Le même système graphique doit être décliné pour :

- le logo du header ;
- le loader Next.js ;
- le favicon ;
- éventuellement l’icône de l’application.

Le logo animé du loader doit rester léger et respecter `prefers-reduced-motion` : en cas de réduction des animations, afficher une version statique ou une animation très discrète.

### 4.3 Header et footer

Le header doit être intégré à l’esthétique de l’application, et non ajouté comme une barre de site conventionnelle.

Il comprend :

- logo et nom du site ;
- une courte accroche, par exemple « Sites web & applications — React, TypeScript, Node.js » ;
- le sélecteur de langue avec drapeau et code de langue ;
- le bouton de thème clair/sombre/système ;
- sur petit écran, un bouton de menu donnant accès à l’explorateur et aux rubriques.

Le footer prend la forme d’une barre d’état ou d’une zone discrète en bas de l’interface. Il donne accès au plan du site, aux mentions légales, à la confidentialité, aux cookies et aux informations de contact.

Ne pas afficher de fausse barre d’état de téléphone (heure, batterie, réseau) : ces éléments présents dans une maquette de présentation ne font pas partie de l’interface réelle du site.

---

## 5. Structure de navigation et pages

La navigation principale est présentée sous forme d’une arborescence de fichiers. Cliquer sur un élément ouvre la page correspondante dans un onglet.

Arborescence fonctionnelle proposée :

```text
EZJSDEV/
├── Accueil/
│   └── page.tsx
├── A-propos/
│   ├── page.tsx
│   └── contenu.md
├── Services/
│   ├── page.tsx
│   └── services.json
├── Projets/
│   ├── page.tsx
│   └── data.json
├── Nos-Outils-SEO/
│   ├── page.tsx
│   └── config.json
├── Contact/
│   └── page.tsx
├── Plan-du-site/
│   └── page.tsx
├── Mentions-legales/
│   └── page.tsx
├── Confidentialite/
│   └── page.tsx
└── Cookies/
    └── page.tsx
```

Cette arborescence est une représentation d’interface. Elle ne doit pas imposer de créer un fichier physique distinct pour chaque élément si le routeur et l’architecture du boilerplate prévoient une organisation différente.

### 5.1 Accueil

L’accueil est le point d’entrée principal. Il doit contenir :

- une présentation immédiate du profil et du positionnement ;
- les expertises principales ;
- un accès à la démonstration interactive ;
- un aperçu des projets ;
- un accès simple à la page Contact.

L’écran d’accueil desktop reprend la disposition de la maquette : explorateur à gauche, onglets et contenu d’éditeur au centre, aperçu à droite lorsque la largeur le permet, terminal en partie basse.

### 5.2 À propos

Présenter le parcours, l’approche de travail, les expertises et les éléments factuels du CV. La page peut apparaître sous forme de fichier Markdown rendu dans l’éditeur, avec titres, listes et encadré de synthèse.

### 5.3 Services

Présenter des offres compréhensibles, sans inventer de spécialités non confirmées :

1. Expertise et développement React / TypeScript.
2. Développement full-stack Node.js.
3. Architecture, refonte et évolution d’applications web.
4. Lead technique, accompagnement et mentoring.
5. Performance, qualité, tests et CI/CD.
6. Conseil sur les fondations techniques d’un produit SaaS ou d’une application web.

Les prestations de création de sites vitrines, de landing pages et d’optimisation SEO peuvent être ajoutées après validation du périmètre commercial réel.

### 5.4 Projets

Présenter les projets sous forme de liste ou de fichiers de données. Pour chaque réalisation publiée :

- nom public ou intitulé anonymisé ;
- contexte et objectif ;
- rôle exact de Yoann ;
- contribution réalisée ;
- technologies réellement utilisées ;
- résultat uniquement lorsqu’il est documenté ;
- lien ou visuel uniquement si sa publication est autorisée.

Le projet **Axons** peut être présenté comme un projet actuel / démonstrateur, avec un lien vers [https://axons-preview.netlify.app/fr](https://axons-preview.netlify.app/fr), après vérification que cette URL reste celle à utiliser.

La réalisation **myKeople** est un cas intéressant à valoriser grâce aux informations du CV (plateforme SaaS RH, plus de 16 000 utilisateurs, 93 % de participation), sous réserve que la publication de ces informations soit toujours autorisée.

### 5.5 Nos outils SEO

Cette rubrique figure dans la maquette et doit être conservée dans l’arborescence. Le périmètre fonctionnel précis des outils n’étant pas fourni, ne pas inventer de fonctionnalités ou de résultats SEO.

Au lancement, la page peut présenter uniquement les outils effectivement disponibles, avec leur objectif, leurs entrées, leurs résultats et leurs limites. Les outils non développés ne doivent pas apparaître comme opérationnels.

### 5.6 Contact

Le moyen de contact principal est le profil LinkedIn :

[https://www.linkedin.com/in/yoann-barbier-89ba1810](https://www.linkedin.com/in/yoann-barbier-89ba1810)

Le CV mentionne également l’adresse `gwivvo@hotmail.fr`. Elle peut être proposée comme moyen de contact secondaire, sous forme de lien `mailto:` si le commanditaire confirme qu’elle doit être publiée sur le site.

Ne pas ajouter de numéro de téléphone non fourni. Un formulaire de contact nécessitant une API, du stockage ou un service tiers n’est pas nécessaire pour la première version.

### 5.7 Pages réglementaires

Prévoir les pages :

- Plan du site ;
- Mentions légales ;
- Politique de confidentialité ;
- Politique relative aux cookies et gestion des préférences.

Les coordonnées de l’éditeur, l’hébergeur, les responsables de traitement, les durées de conservation et les coordonnées de contact juridique devront être confirmés avant publication. Ne pas inventer de mentions légales.

---

## 6. Comportement de l’explorateur, des onglets et de l’éditeur

### 6.1 Explorateur

- Afficher une arborescence de dossiers et de fichiers.
- Permettre de développer et réduire les dossiers.
- Signaler visuellement l’élément sélectionné.
- Ouvrir la page associée lorsqu’un fichier est sélectionné.
- Conserver un état de navigation cohérent entre l’explorateur et les onglets.
- Ne pas présenter de fichiers qui ne correspondent à aucune page ou fonction réelle.

### 6.2 Onglets

- Le clic sur un fichier ouvre son onglet.
- L’onglet actif est visuellement identifiable.
- Les onglets peuvent être fermés lorsque cela a du sens ; l’onglet Accueil peut rester épinglé.
- Les intitulés longs doivent être tronqués proprement et les onglets doivent pouvoir défiler horizontalement sur mobile.
- La navigation navigateur précédent/suivant doit fonctionner.
- Une URL directe doit ouvrir la bonne page et son onglet correspondant.

### 6.3 Zone d’édition

Il s’agit d’une **zone de lecture**, pas d’un éditeur de code destiné à modifier le contenu du site.

- Afficher le contenu de la page avec numéros de ligne lorsque cela sert la mise en scène.
- Utiliser une police monospace et une coloration syntaxique ou Markdown cohérente.
- Conserver une bonne lisibilité et une taille de texte confortable.
- Éviter d’ajouter Monaco ou un éditeur complet si un composant léger suffit.
- Les contenus doivent être réels et issus des données du site, pas des extraits fictifs sans rapport avec la page ouverte.

### 6.4 Aperçu

L’aperçu est un panneau de rendu visuel, pas une seconde navigation indépendante.

- Sur desktop, il peut être affiché à droite de l’éditeur.
- Il doit pouvoir être réduit ou masqué pour laisser davantage de place au contenu.
- Sur mobile, il devient un onglet ou un panneau accessible séparément.
- Pour Axons, présenter une vignette ou un aperçu et un lien explicite vers le site déployé. Ne pas dépendre obligatoirement d’une iframe externe, qui peut être bloquée par les politiques de sécurité du site cible.

### 6.5 Terminal et footer

Le terminal est un panneau inférieur inspiré de VS Code. Il peut afficher les événements de démonstration et les messages de statut.

La barre de statut/footer reste distincte du terminal et ne doit pas réduire excessivement la zone de lecture.

---

## 7. Démonstration « Générer un site SEO »

### 7.1 Objectif de l’interaction

Le bouton principal de la maquette lance une démonstration scénarisée :

1. l’utilisateur clique sur « Générer un site SEO » ;
2. le terminal s’ouvre ou devient visible ;
3. une séquence de commandes et de messages apparaît rapidement ;
4. la séquence se termine par un état de démonstration disponible ;
5. une carte de résultat s’affiche avec une vignette, une URL et un bouton « Ouvrir le site ».

### 7.2 Transparence sur la simulation

La console est une **animation scénarisée côté interface**. Elle ne doit pas prétendre exécuter réellement `npm install`, compiler un nouveau projet ou déclencher un déploiement Netlify à chaque clic si ce n’est pas ce qui se passe réellement.

Présenter la fonctionnalité comme une démonstration ou un aperçu du processus. Le résultat peut pointer vers un projet réellement réalisé, comme Axons. Les métriques affichées (nombre de pages, poids du build, temps de génération, statut du déploiement) doivent provenir d’informations vérifiées du projet ; sinon, les omettre.

Les deux maquettes affichent des tailles de build différentes (2,4 Mo et 3,4 Mo). Ces valeurs ne doivent donc pas être reprises telles quelles.

### 7.3 Intégration éventuelle d’un véritable appel IA

Pour exploiter OpenRouter sans transformer le site en générateur de sites complet, l’hypothèse recommandée est la suivante :

- le bouton lance un scénario préconfiguré ;
- un appel OpenRouter peut générer les textes et métadonnées d’un exemple de site sous forme de données structurées ;
- le panneau d’aperçu affiche ces données dans un gabarit React prédéfini ;
- les étapes de console relatives à l’analyse et à la préparation de l’aperçu sont des messages de démonstration ;
- aucun code arbitraire retourné par l’IA n’est exécuté dans le navigateur ;
- aucun vrai build ni déploiement n’est déclenché par le visiteur.

Cette hypothèse permet d’avoir un véritable appel IA tout en conservant la simplicité du concept. Elle doit être confirmée avant développement. Si le bouton doit être entièrement fictif et ne faire aucun appel à OpenRouter, le quota IA devra concerner une autre fonctionnalité réellement pilotée par l’IA, ou être supprimé de cette démonstration.

### 7.4 États de l’interaction

Prévoir au minimum :

- état initial ;
- chargement / génération ;
- résultat disponible ;
- quota quotidien atteint ;
- erreur OpenRouter ;
- délai de 45 secondes dépassé ;
- réponse invalide ou inutilisable ;
- service temporairement indisponible.

En cas d’erreur, afficher un toast compréhensible et laisser l’utilisateur relancer l’action lorsque le quota le permet.

Respecter `prefers-reduced-motion` : dans ce cas, réduire fortement l’animation et afficher directement les étapes essentielles ou le résultat.

---

## 8. Responsive, zoom et occupation de l’écran

Le site doit occuper l’espace disponible sans créer de débordements horizontaux ni de panneaux illisibles.

### 8.1 Desktop

- Utiliser une disposition de type application plein écran.
- Garder l’explorateur à gauche.
- Afficher l’éditeur au centre et l’aperçu à droite lorsque la largeur le permet.
- Placer le terminal en partie basse, sur une largeur adaptée à la disposition.
- Permettre de réduire certains panneaux pour privilégier l’éditeur ou l’aperçu.

### 8.2 Tablette et mobile

Ne pas simplement réduire proportionnellement la maquette desktop.

- Header compact avec logo, langue, thème et menu.
- Explorateur accessible sous forme de panneau latéral / drawer ; il peut être visible en permanence uniquement sur les écrans suffisamment larges.
- Éditeur occupant la largeur disponible.
- Onglets horizontalement défilants.
- Aperçu et terminal présentés sous forme de panneaux repliables ou d’onglets.
- Terminal repliable, avec une hauteur maximale maîtrisée.
- Carte de résultat adaptée à une colonne : vignette au-dessus ou à côté du texte selon la largeur disponible.
- Bandeau cookies empilé sur petit écran, avec boutons accessibles et non superposés au contenu.

La maquette mobile fournie sert de référence pour conserver l’identité de l’interface, mais il faut éviter de maintenir en permanence deux colonnes étroites sur un smartphone de largeur courante.

### 8.3 Zoom navigateur

Le site doit rester cohérent lorsque le visiteur zoome ou dézoome :

- privilégier CSS Grid/Flexbox, `minmax()`, unités relatives et dimensions fluides ;
- éviter les dimensions fixes exprimées uniquement en pixels pour les grandes zones ;
- autoriser le défilement dans les panneaux lorsque nécessaire ;
- déclencher les variantes responsive en fonction de l’espace CSS réellement disponible ;
- ne pas utiliser de transformation globale artificielle pour inverser le zoom du navigateur.

L’objectif est de préserver la hiérarchie visuelle et l’utilisabilité, pas de neutraliser le zoom natif du navigateur.

---

## 9. Langues et internationalisation

Six langues sont visées à terme : FR, EN, ES, DE, IT et PT. Le premier périmètre comprend uniquement **FR et EN**.

Exigences :

- architecture i18n prévue pour l’ajout ultérieur des quatre autres langues ;
- traductions centralisées dans les fichiers/messages déjà prévus par le boilerplate ;
- aucune chaîne fonctionnelle importante codée en dur dans les composants ;
- routes traduites et URLs cohérentes par langue ;
- métadonnées SEO distinctes par langue ;
- liens `hreflang` et URL canonique adaptés ;
- changement de langue qui conserve autant que possible la page courante ;
- drapeau et code de langue dans le sélecteur.

À la première visite, détecter la langue à partir des préférences du navigateur : français si une préférence française est détectée, anglais dans les autres cas. L’utilisateur doit pouvoir changer manuellement de langue. Son choix explicite devient prioritaire et ne doit pas être écrasé à chaque visite par la détection automatique.

La convention exacte des URLs (préfixe obligatoire ou non pour la langue par défaut) doit suivre la configuration `next-intl` ou l’équivalent déjà présent dans le boilerplate. Ne pas modifier cette convention sans raison technique documentée.

---

## 10. Thème clair / sombre et préférences locales

Trois modes sont à prévoir :

- Système : suit `prefers-color-scheme` ;
- Clair ;
- Sombre.

Comportement :

1. À la première visite, utiliser le thème du système.
2. Si l’utilisateur choisit explicitement un thème, ce choix devient prioritaire.
3. Persister le choix afin d’éviter un flash de thème incorrect au premier rendu.
4. Synchroniser proprement le cookie fonctionnel et le `localStorage` si le boilerplate utilise les deux ; définir une source de vérité claire et éviter les divergences.
5. Le choix doit survivre au changement de page et de langue.

Les préférences d’interface (thème, langue, état des panneaux) peuvent être conservées localement. Ne pas y enregistrer de clé OpenRouter ni de secret.

---

## 11. Loader, feedback et composants d’interface

### 11.1 Loader

- Logo SVG animé lié à l’identité visuelle.
- Utilisation pendant les chargements de navigation ou de contenu qui le nécessitent.
- Animation légère, sans ralentir l’affichage initial.
- Version statique si les animations sont réduites.

### 11.2 Toasts

Les erreurs et informations importantes doivent être visibles sans interrompre toute la navigation.

Prévoir des messages spécifiques pour :

- quota quotidien atteint ;
- erreur de communication avec OpenRouter ;
- expiration du délai de 45 secondes ;
- réponse IA invalide ;
- service indisponible ;
- démonstration terminée.

Les messages doivent indiquer clairement ce que l’utilisateur peut faire ensuite. Éviter les détails techniques ou traces serveur dans l’interface publique.

### 11.3 Chargement d’une requête IA

Pendant un appel :

- afficher un indicateur de chargement visible ;
- désactiver le bouton d’envoi et empêcher les doubles soumissions ;
- empêcher la modification des champs utilisés par la requête, selon le formulaire concerné ;
- restaurer les contrôles après succès ou erreur ;
- ne pas perdre inutilement la saisie en cas d’erreur.

---

## 12. OpenRouter et architecture des appels IA

### 12.1 Appel serveur uniquement

La clé API OpenRouter doit rester exclusivement côté serveur, dans une variable d’environnement Netlify (par exemple `OPENROUTER_API_KEY`). Elle ne doit jamais être exposée dans le bundle navigateur, un fichier public, un dépôt Git ou les logs client.

Le navigateur appelle une route serveur Next.js compatible avec le runtime Netlify. Cette route transmet la requête à OpenRouter, traite la réponse et renvoie au client uniquement les données nécessaires à l’affichage.

### 12.2 Configuration

- Le modèle utilisé doit être configurable côté serveur, sans être figé dans plusieurs composants.
- Prévoir une gestion claire des modèles indisponibles ou des erreurs de fournisseur.
- Ne pas supposer qu’un modèle gratuit restera disponible indéfiniment.
- Limiter la taille des entrées et des réponses selon le cas d’usage retenu.
- Valider les données entrantes et sortantes avec un schéma TypeScript / validation de données.
- Ne jamais exécuter directement du HTML, du JavaScript ou du code source généré par le modèle.

### 12.3 Délai maximal

Le délai maximal attendu pour un appel est de **45 secondes**.

- Déclencher un timeout serveur.
- Interrompre la requête fournisseur lorsque le runtime et le client HTTP le permettent.
- Retourner une erreur structurée au navigateur.
- Afficher un toast et rendre l’action à nouveau disponible.

Le timeout doit être cohérent avec les limites effectives des fonctions Netlify et du runtime Next.js utilisé dans le boilerplate. Cette compatibilité devra être vérifiée pendant l’audit du dépôt et lors d’un déploiement de test.

### 12.4 Données utilisateur et fournisseur tiers

Le visiteur doit être averti que le texte transmis à la fonctionnalité IA est envoyé à OpenRouter et peut être traité par le fournisseur du modèle sélectionné, même lorsque le modèle est gratuit.

Ne pas promettre que les données ne sont jamais conservées ou réutilisées sans vérification des conditions applicables au modèle et au fournisseur. La politique de confidentialité doit expliquer le fonctionnement réel, les données transmises, les prestataires concernés et les éventuelles durées de conservation connues.

Par défaut :

- ne pas demander d’informations personnelles sensibles ;
- ne pas conserver l’historique IA sur un serveur du site ;
- ne pas enregistrer durablement les prompts ou réponses dans le navigateur sans nécessité ;
- informer l’utilisateur avant son premier appel IA que sa saisie quitte son navigateur pour être transmise au service tiers.

---

## 13. Quota quotidien et protection contre les abus

### 13.1 Paramétrage fonctionnel

Le nombre d’appels autorisés par jour doit être configurable : 1, 2 ou 3 appels, selon la valeur retenue.

- Une valeur absente, vide ou égale à 0 signifie que le quota n’est pas affiché et que la fonctionnalité est désactivée ou masquée selon la configuration choisie.
- Le compteur visible indique les utilisations restantes.
- Le jour de remise à zéro doit être calculé côté serveur dans un fuseau défini (par défaut `Europe/Paris`) et non à partir de l’horloge modifiable du navigateur.
- Les erreurs de validation avant appel fournisseur ne doivent pas consommer un appel.
- La règle de consommation d’un appel lors d’une erreur fournisseur doit être documentée et cohérente ; elle ne doit pas dépendre d’un simple rafraîchissement de page.

### 13.2 Limite d’un contrôle exclusivement local

Un compteur stocké uniquement dans `localStorage` ou un cookie modifiable par le navigateur ne constitue pas une protection réelle : le visiteur peut effacer les données, utiliser un autre navigateur ou modifier les valeurs.

Le stockage local peut servir à afficher rapidement un compteur indicatif, mais **la décision d’autoriser ou non un appel doit être prise par la route serveur**.

### 13.3 Contrôle serveur recommandé

Pour appliquer un quota plus robuste sans créer un système de comptes :

- utiliser un identifiant anonyme contrôlé côté serveur ;
- appliquer une limitation de fréquence côté serveur, notamment par adresse IP ou mécanisme équivalent ;
- stocker les compteurs dans un stockage persistant partagé compatible avec le déploiement Netlify ;
- définir une durée de conservation minimale ;
- limiter la taille et la fréquence des requêtes ;
- vérifier l’origine de la requête et valider le payload ;
- retourner un statut distinct lorsque le quota est atteint.

Sans authentification et sans stockage persistant, il est impossible de garantir qu’un visiteur ne contournera jamais le quota. Une limite par IP peut également pénaliser plusieurs personnes derrière une même adresse publique et doit être paramétrée avec prudence. Le choix du mécanisme de stockage et de limitation devra être fait après inspection du boilerplate et des services Netlify disponibles.

### 13.4 Protection anti-bot

Mettre en œuvre des protections côté serveur :

- rate limiting ;
- validation stricte du schéma et de la taille des requêtes ;
- contrôle d’origine / CORS adapté ;
- réponse générique pour les requêtes abusives ;
- mécanisme honeypot si un formulaire s’y prête ;
- challenge anti-robot uniquement si le niveau d’abus le justifie et après analyse de ses implications en matière de données et de consentement.

Ne pas afficher d’icône « bot » dans l’interface de production. Les éléments de diagnostic et de test doivent rester réservés au développement.

### 13.5 Reset développeur

- Afficher un bouton de remise à zéro uniquement en environnement local de développement.
- Le reset doit passer par un mécanisme serveur protégé par l’environnement, et non par une simple modification du compteur client.
- Ne pas déployer l’endpoint de reset en production ; à défaut, il doit répondre systématiquement par une erreur non révélatrice et ne modifier aucun compteur.
- Ne pas considérer le simple masquage visuel du bouton comme une protection suffisante.

---

## 14. Cookies, stockage local et conformité

### 14.1 Règle générale

La présence d’un site web ne déclenche pas, à elle seule, une obligation générale d’afficher une bannière « Accepter / Refuser ». L’obligation de consentement préalable vise les cookies et autres traceurs qui ne sont pas strictement nécessaires au service demandé, notamment certains traceurs publicitaires et de mesure d’audience.

Si le site utilise des traceurs soumis au consentement, le visiteur doit pouvoir accepter ou refuser aussi facilement. La CNIL indique notamment qu’un bouton « Tout refuser » présenté au même niveau que « Tout accepter » constitue une modalité claire. Le consentement doit pouvoir être retiré facilement à tout moment.

Référence de travail : FAQ CNIL sur les cookies et autres traceurs, mise à jour du 29 avril 2026 :  
https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ

### 14.2 Bandeau de consentement

Si des traceurs non essentiels sont effectivement intégrés (par exemple un réseau publicitaire ou un outil de mesure nécessitant un consentement), afficher un bandeau avec :

- une information concise sur les finalités ;
- un bouton « Tout refuser » ;
- un bouton « Tout accepter » ;
- un accès « Personnaliser » si plusieurs finalités sont proposées ;
- un lien vers la politique relative aux cookies.

Les boutons d’acceptation et de refus doivent être accessibles au même niveau et présenter une simplicité comparable. Aucun traceur soumis au consentement ne doit être activé avant le choix positif de l’utilisateur. L’absence de choix ne vaut pas acceptation.

Le bandeau doit être adapté au mobile et ne pas rendre le site inutilisable. Le refus ne doit pas bloquer l’accès au portfolio.

### 14.3 Gestion ultérieure du choix

Un lien « Gérer mes cookies » doit rester disponible dans le footer ou dans une zone facilement accessible. Le visiteur doit pouvoir retirer ou modifier son consentement à tout moment.

La CNIL présente une conservation des choix pendant six mois comme une bonne pratique générale, à adapter au contexte ; ce n’est pas à présenter comme une durée légale universelle imposée dans tous les cas.

### 14.4 Préférences fonctionnelles et `localStorage`

Ne pas confondre les préférences fonctionnelles et les traceurs publicitaires.

- Thème et langue : conserver les choix nécessaires au fonctionnement et à la personnalisation demandée par le visiteur, avec une information adaptée.
- Consentement : conserver le choix exprimé afin de ne pas solliciter l’utilisateur à chaque page.
- Quota : ne pas supposer que `localStorage` suffit juridiquement ou techniquement à sécuriser le compteur ; qualifier précisément son usage et privilégier le contrôle serveur.
- Publicité / audience : ne pas activer les traceurs concernés avant le consentement requis.

Le fait d’utiliser `localStorage` plutôt qu’un cookie ne doit pas être considéré automatiquement comme une exemption aux règles relatives aux opérations de lecture ou d’écriture sur le terminal. Les finalités et le fonctionnement exacts devront être vérifiés avant publication.

### 14.5 Publicité

Les emplacements publicitaires visibles dans une maquette ou prévus pour une évolution future doivent rester masqués tant qu’aucun fournisseur n’est réellement intégré. En cas d’intégration publicitaire, vérifier les cookies et traitements du fournisseur, bloquer les traceurs soumis au consentement avant accord et mettre à jour les pages de confidentialité et cookies.

Si aucune publicité ni mesure d’audience soumise au consentement n’est activée lors du lancement, ne pas simuler une bannière de consentement uniquement pour donner l’impression d’une conformité. Une information claire sur les stockages réellement utilisés reste nécessaire.

---

## 15. Référencement naturel et métadonnées

Le site doit être indexable et proprement structuré :

- titre et description spécifiques à chaque page et à chaque langue ;
- une hiérarchie de titres correcte ;
- URL lisibles et stables ;
- URL canonique ;
- balises `hreflang` pour les langues disponibles ;
- sitemap XML ;
- `robots.txt` ;
- Open Graph et cartes sociales ;
- données structurées adaptées au profil professionnel si elles sont exactes ;
- liens internes entre services, projets, profil et contact.

Ne pas créer de pages SEO dupliquées uniquement pour multiplier les mots-clés. Ne pas publier de statistiques de trafic, de positions Google ou de gains SEO sans données mesurées.

---

## 16. Architecture technique et règles de réalisation

### 16.1 Socle à respecter

- Node.js : `v24.14.0` dans l’environnement de développement visé.
- Next.js : version du boilerplate validé, sans mise à jour arbitraire.
- React et TypeScript : versions et configuration déjà retenues dans le boilerplate.
- Material UI pour les composants d’interface, selon la convention du projet.
- OpenRouter pour les appels IA côté serveur.
- Déploiement Netlify avec rendu SSR et routes serveur compatibles.

### 16.2 Principe de réutilisation du boilerplate

Avant de coder :

1. examiner `package.json`, les scripts et les versions réellement installées ;
2. examiner la structure `app/`, les layouts, les routes et le middleware/proxy ;
3. identifier la stratégie i18n et les URLs déjà en place ;
4. examiner le thème Material UI et les composants génériques ;
5. identifier la route OpenRouter existante et le traitement des erreurs ;
6. examiner `netlify.toml`, les paramètres SSR et les variables d’environnement attendues ;
7. lancer les scripts de vérification existants et établir un état initial du dépôt.

Ne pas renommer, déplacer ou réécrire massivement le code simplement pour faire correspondre le projet à une arborescence théorique de cette spécification.

### 16.3 Isolation de Material UI

Respecter la convention d’architecture prévue pour isoler les dépendances d’interface : les imports et références `@mui/*` doivent rester dans le dossier d’adaptation Material UI prévu par le boilerplate (notamment `/components/ui/material` si cette convention est bien celle du dépôt validé).

Les pages et composants métier doivent consommer des composants génériques de l’application plutôt que dépendre directement de Material UI. Cela doit permettre de remplacer ultérieurement cette implémentation par une autre bibliothèque avec un périmètre de modifications limité.

### 16.4 Netlify et routes serveur

- Ne pas ajouter de serveur Node permanent séparé.
- Utiliser les mécanismes Next.js supportés par le runtime Netlify.
- Garder les appels OpenRouter dans les routes serveur.
- Vérifier le fonctionnement des routes après déploiement, pas uniquement en local.
- Ne pas supposer qu’un comportement SSR local sera identique sur Netlify sans test.
- Garder les secrets dans les variables d’environnement Netlify et les exclure du dépôt.

### 16.5 Tests et qualité

Réutiliser les outils de tests déjà présents dans le boilerplate. Le périmètre de validation doit couvrir :

- tests unitaires des fonctions de quota, de formatage et de validation ;
- tests des composants interactifs essentiels ;
- tests de navigation entre routes et langues ;
- tests Playwright des parcours principaux sur desktop et mobile si Playwright est disponible dans le socle ;
- vérification des thèmes clair et sombre ;
- vérification du bandeau cookies et du retrait du consentement ;
- vérification de la route OpenRouter avec succès, erreur, quota atteint et timeout ;
- build de production et déploiement de prévisualisation Netlify.

Ne pas annoncer un test réussi sans l’avoir réellement exécuté. Rapporter explicitement les commandes lancées, les résultats et les éventuels tests non exécutés.

---

## 17. Sécurité, confidentialité et robustesse

- Clé OpenRouter exclusivement côté serveur.
- Validation de toutes les entrées et sorties IA.
- Aucune exécution de code produit par le modèle.
- Limitation du débit et du volume des requêtes.
- Erreurs publiques sans stack trace ni secret.
- Logs serveur sans prompt complet ni donnée personnelle inutile.
- Absence de stockage serveur des contenus soumis, sauf décision explicite et documentée.
- Liens externes clairement identifiés et ouverts de manière sûre.
- Pages légales alignées sur les prestataires réellement utilisés.
- Dépendances maintenues à partir du socle approuvé, sans ajout opportuniste.

Le site doit rester fonctionnel si OpenRouter est indisponible : les pages de présentation, le portfolio et les liens de contact ne dépendent pas de l’IA.

---

## 18. Accessibilité et expérience utilisateur

- Navigation utilisable au clavier.
- Indicateur de focus visible.
- Contraste suffisant dans les deux thèmes.
- Libellés accessibles pour les boutons icon-only.
- Zones tactiles adaptées au mobile.
- Structure sémantique des pages malgré l’apparence d’un IDE.
- Annonces accessibles pour les états de chargement et les erreurs.
- Respect de `prefers-reduced-motion`.
- Ne pas utiliser uniquement la couleur pour signaler un état.
- Éviter les petites tailles de texte dans les panneaux et le terminal.

L’arborescence et les onglets doivent rester compréhensibles pour les lecteurs d’écran et ne pas constituer l’unique moyen d’accéder aux pages : des liens de navigation réels doivent exister.

---

## 19. Critères d’acceptation

La première version est considérée comme livrable lorsque les points suivants sont vérifiés :

### Navigation et interface

- Le site adopte l’identité visuelle des maquettes desktop et mobile.
- Les dossiers de l’explorateur s’ouvrent et se replient.
- La sélection d’un fichier ouvre la page correspondante dans un onglet.
- La navigation directe par URL et les boutons précédent/suivant fonctionnent.
- Le contenu s’adapte aux largeurs desktop, tablette et mobile sans débordement horizontal non souhaité.
- Les panneaux éditeur, aperçu et terminal sont utilisables et repliables selon le support.

### Contenu

- Le profil et les expériences correspondent au CV transmis.
- Les réalisations et chiffres publiés sont vérifiés.
- Aucun client, logo ou détail confidentiel n’est publié sans validation.
- Les pages Services, Projets, Contact et pages légales sont accessibles.
- Les contenus français et anglais sont présents pour le périmètre de lancement.

### Thème et préférences

- Le thème système est appliqué lors de la première visite.
- Un choix manuel de thème est conservé.
- Le changement de langue fonctionne et respecte l’URL.
- Les préférences ne provoquent pas de flash visuel important au chargement.

### Démonstration et IA

- Le bouton de démonstration lance la séquence de terminal.
- Le résultat final est affiché sans prétendre qu’un nouveau déploiement réel a eu lieu.
- Les métriques présentées sont vérifiées ou absentes.
- La clé OpenRouter n’est jamais visible côté navigateur.
- Un appel ne peut pas être envoyé plusieurs fois par double clic.
- Le timeout de 45 secondes est géré.
- Les erreurs produisent un toast exploitable.
- Le quota est vérifié côté serveur si une protection réelle est annoncée.
- Le reset est disponible en développement uniquement et ne peut pas modifier le quota de production.

### Cookies et confidentialité

- Les traceurs soumis au consentement sont bloqués avant accord.
- Refuser est aussi simple qu’accepter lorsque le consentement est requis.
- Le choix peut être modifié ou retiré depuis toutes les pages.
- Les pages de confidentialité et cookies décrivent les traitements réellement activés.

### Livraison

- Le projet passe les vérifications prévues par le boilerplate.
- Le build de production est réalisé sans erreur.
- Un déploiement de prévisualisation Netlify est testé.
- Les routes serveur et l’appel OpenRouter sont testés sur l’environnement déployé.
- Les éventuelles limites connues sont documentées.

---

## 20. Plan de réalisation recommandé

### Étape 0 — Audit du boilerplate

Cartographier la structure, les versions, les composants, i18n, les routes, la configuration Netlify et la route OpenRouter. Fournir un court état des lieux avant toute modification.

### Étape 1 — Shell de l’application

Mettre en place le cadre visuel : header, explorateur, onglets, éditeur, aperçu, terminal, barre d’état/footer et responsive. Réutiliser les composants déjà disponibles.

### Étape 2 — Navigation et contenus

Créer les pages, connecter les entrées de l’explorateur aux routes réelles et intégrer le contenu professionnel validé.

### Étape 3 — Langues et préférences

Intégrer FR/EN, détection initiale, sélection manuelle, thème système/clair/sombre et persistance des préférences.

### Étape 4 — Démonstration et IA

Construire l’animation du terminal, la carte de résultat et, après validation du cas d’usage, l’appel OpenRouter avec timeout, toasts, quota et protections serveur.

### Étape 5 — Pages légales, SEO et validation

Intégrer les pages réglementaires sur la base des informations réelles, configurer les métadonnées, vérifier l’accessibilité, exécuter les tests et réaliser le déploiement Netlify de validation.

---

## 21. Instructions destinées à l’assistant de développement qui recevra le dépôt GitHub

Le dépôt GitHub sera transmis avec ce document. L’assistant chargé du développement devra respecter les règles suivantes :

1. Commencer par lire le dépôt et cette spécification avant de proposer une architecture.
2. Produire un inventaire succinct des composants, routes, fonctions IA et configurations Netlify déjà disponibles.
3. Réutiliser le code existant dès que possible. Ne pas reconstruire le boilerplate et ne pas remplacer des dépendances sans justification.
4. Ne pas modifier les versions de Node, Next.js, React, TypeScript ou Material UI sans expliquer le besoin et vérifier la compatibilité Netlify.
5. Ne pas casser la stratégie i18n ou les URLs déjà en place.
6. Conserver l’isolation de Material UI prévue par le projet.
7. Ne jamais exposer de secret OpenRouter dans le code client ou dans Git.
8. Ne pas simuler une réussite de build ou de déploiement qui n’a pas réellement eu lieu.
9. Ne pas ajouter de contenu professionnel, client, résultat, chiffre ou témoignage non fourni ou non validé.
10. Après chaque étape significative, exécuter les contrôles appropriés et rapporter les résultats réels.
11. Fournir le contenu complet des fichiers modifiés ou créés lorsqu’un compte rendu de code est demandé ; ne pas remplacer le code par des mentions telles que « le reste est inchangé ».
12. Limiter les modifications au périmètre de la spécification et signaler explicitement les points bloqués par une information manquante.

---

## 22. Points à confirmer avant la réalisation

Les éléments suivants ne bloquent pas la rédaction de la spécification, mais devront être validés avant ou pendant l’audit du dépôt :

1. **Nom et identité :** ezjsdev est-il le nom définitif ? Le domaine public est-il déjà choisi ?
2. **Accroche :** conserver « Sites web & SEO boostés par l’IA » ou privilégier une formulation davantage centrée sur le développement full-stack et le lead technique ?
3. **Démonstration :** le bouton « Générer un site SEO » doit-il effectuer un véritable appel OpenRouter pour générer des contenus structurés, ou déclencher uniquement une animation préenregistrée ?
4. **Quota :** choisir 1, 2 ou 3 appels par jour et confirmer si le quota concerne uniquement la démo de la page d’accueil ou d’autres outils IA.
5. **Stockage anti-abus :** valider le niveau de protection souhaité et le stockage persistant minimal nécessaire pour le compteur serveur.
6. **Publicité et analytics :** préciser si un fournisseur publicitaire ou une solution de mesure d’audience sera installé au lancement. À défaut, ne pas activer de slots ni de traceurs correspondants.
7. **SEO :** détailler les prestations réellement proposées et les outils qui seront disponibles dès la mise en ligne.
8. **Portfolio :** confirmer les projets, noms de clients, logos, captures et résultats dont la publication est autorisée.
9. **Contact :** confirmer la publication de l’adresse e-mail du CV en complément du lien LinkedIn.
10. **Mentions légales :** fournir les informations exactes de l’éditeur et de l’hébergeur à afficher.

---

## 23. Références

- CV LinkedIn de Yoann Barbier fourni avec la demande (4 pages) — source des expériences, dates, technologies et résultats professionnels.
- Maquette desktop : « Interface VS Code sombre avec aperçu ezjsdev » — source principale de la disposition desktop et de l’identité visuelle.
- Maquette mobile : « Interface mobile d’éditeur web sombre en français » — source de la déclinaison mobile et du header compact.
- Projet Axons communiqué par le commanditaire : https://axons-preview.netlify.app/fr
- CNIL, « Questions-réponses sur les lignes directrices modificatives et la recommandation cookies et autres traceurs », mise à jour du 29 avril 2026 : https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ

