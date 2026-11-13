# ezjsdev

Site de la micro-entreprise de Yoann Barbier, développeur full-stack indépendant à Nantes (React, TypeScript,
Node.js). Portfolio présenté comme un environnement de développement inspiré de VS Code, avec les articles et
pense-bêtes techniques écrits depuis 2013.

Site en ligne : https://ezjsdev.netlify.app

## Ce que contient le site

- **Interface IDE** : explorateur de fichiers relié aux pages, onglets synchronisés avec l'URL, zone de lecture avec
  numéros de ligne, aperçu et terminal repliables, barre d'état ; drawer et panneaux empilés sur mobile.
- **Identité** : logo `</>`, thèmes sombre (bleu nuit, accents cyan) et clair, six langues (français à la racine, puis
  `en`, `es`, `de`, `it`, `pt`).
- **Articles** : 15 articles d'archives (2013-2015 : Node.js, Angular, Stylus, TopCoder TCO…), avec coloration du code
  au rendu serveur.
- **Pense-bêtes** : 14 aide-mémoire techniques (2013-2017), une deuxième collection Markdown.
- **À venir** : les pages À propos, Services, Projets et Contact, et la démonstration « Générer un site SEO » (simulée,
  sans appel IA).

La spécification de référence est [`specs/specification-site-ezjsdev-v0.2.md`](specs/specification-site-ezjsdev-v0.2.md) ;
les maquettes du site sont dans [`mockups/ezjsdev/`](mockups/ezjsdev/).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Material UI 9 derrière une API neutre · `next-intl` 4 ·
Vitest, Playwright, Storybook 10 · Netlify.

**Version : ezjsdev 0.1.0, basé sur Axons [v0.9.0](https://github.com/YoannB/axons/tree/v0.9.0).**

ezjsdev est construit sur le boilerplate [Axons](https://github.com/YoannB/axons) : l'architecture, les conventions et
la documentation technique viennent de là. `AGENTS.md` et `docs/` sont la documentation (en anglais) d'Axons pour les
agents de code ; ils ne sont pas spécifiques à ezjsdev.

## Démarrage rapide

Prérequis : Node.js 24+ et npm.

```bash
git clone https://github.com/YoannB/ezjsdev.git
```

```bash
cd ezjsdev
```

```bash
npm ci
```

Créer ensuite un `.env.local` (jamais commité) à partir de [`.env.example`](.env.example), avec les valeurs d'ezjsdev
du tableau ci-dessous, puis :

```bash
npm run dev
```

Et ouvrir http://localhost:3000.

## Variables d'environnement

Référence complète et commentée : [`.env.example`](.env.example). Valeurs d'ezjsdev (en local comme sur Netlify) :

| Variable                     | Valeur ezjsdev                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `fr` : le français est servi à la racine. **Indispensable** : les liens internes des contenus en dépendent. |
| `NEXT_PUBLIC_LOCALES`        | `fr,en,es,de,it,pt` (ou vide = les six).                                                                    |
| `NEXT_PUBLIC_SITE_URL`       | URL publique du site (canonical, hreflang, sitemap).                                                        |
| `NEXT_PUBLIC_AI_DAILY_LIMIT` | `0` : ezjsdev ne fait aucun appel IA.                                                                       |
| `OPENROUTER_API_KEY`         | **Ne pas définir** (IA coupée).                                                                             |
| `NEXT_PUBLIC_ADS_ENABLED`    | `false`.                                                                                                    |
| `NEXT_PUBLIC_GTM_ID`         | Vide : pas de mesure d'audience, donc pas de bandeau cookies.                                               |
| `LEGAL_*`                    | Informations éditeur des mentions légales (serveur uniquement) ; jamais de vraies valeurs dans le dépôt.    |

## Où vit le code propre à ezjsdev

Un site dérivé d'Axons ne modifie que `site/` et ajoute ses propres fichiers (voir `docs/architecture.md` →
_Deriving a site_).

| Emplacement                                                           | Contenu                                                                 |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`site/config.ts`](site/config.ts)                                    | Nom, routes traduites, navigation, collection des pense-bêtes, palette. |
| `site/messages/<locale>.json`                                         | Textes propres à ezjsdev dans les six langues.                          |
| `site/theme.css`, `site/logo.tsx`, `site/icon.svg`                    | Jetons de couleur, logo `</>` et favicon.                               |
| `site/shell.tsx`, `site/home.tsx`, `site/explorer.ts`, `site/ide.css` | Cadre IDE, accueil et arborescence de l'explorateur.                    |
| `components/site/`                                                    | Composants de l'interface IDE et de l'accueil.                          |
| `content/articles/`, `content/reminders/`                             | Articles et pense-bêtes (un dossier par entrée, un fichier par langue). |
| `public/articles/`, `public/reminders/`                               | Images des contenus.                                                    |
| `app/[locale]/reminders/`                                             | Les deux pages de la collection des pense-bêtes.                        |
| `tests/e2e/reminders.spec.ts`, `tests/e2e/ide-shell.spec.ts`          | Tests e2e des pense-bêtes et de l'interface IDE.                        |

## Contrôle qualité

À lancer avant toute PR (c'est aussi ce que la CI exécute sur les PR vers `main`) :

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test && npm run build && npm run test:e2e && npm run storybook:build
```

Plus `npm audit`. Le formatage est géré par Prettier (`npm run format`).

Sous Windows, si le build échoue avec `ERR_SWC_NATIVE_CACHE`, définir `SWC_NATIVE_BINDING_CACHE` vers un dossier
accessible au seul utilisateur (par exemple `C:\Users\<vous>\.cache\swc-native`). Les tests e2e d'Axons supposent
l'environnement de la CI (voir le bloc `env` de `.github/workflows/ci.yml`) ; en local, lancer `npm run build` puis
`CI=1 npm run test:e2e` avec ces variables.

## Récupérer les mises à jour d'Axons

Le dépôt Axons est le remote `upstream`. Ses tags sont rangés localement sous `axons/` (`axons/v0.8.0`) pour ne jamais
se mélanger à ceux d'ezjsdev. Configuration, une seule fois par clone :

```bash
git remote add upstream https://github.com/YoannB/axons.git
```

```bash
git config remote.upstream.tagOpt --no-tags
```

```bash
git config --add remote.upstream.fetch "+refs/tags/*:refs/tags/axons/*"
```

Mise à jour, sur une branche dédiée :

```bash
git fetch upstream
```

```bash
git merge --no-ff -m "chore: merge Axons vX.Y.Z" axons/vX.Y.Z
```

En cas de conflit :

- garder la version ezjsdev de `site/**` (en y ajoutant les nouveaux champs exigés par Axons), de ce `README.md` et de
  la `version` de `package.json` / `package-lock.json` ;
- reprendre la version Axons de tout autre fichier, puis reporter dans `site/` ce qui doit l'être.

Puis mettre à jour la ligne « basé sur Axons » en tête de ce README, relancer le contrôle qualité complet et ouvrir la
PR. La PR se merge avec un **merge commit**, jamais en squash : l'historique d'Axons doit rester un ancêtre de `main`.

## Versions et tags

Les tags d'ezjsdev suivent leur propre numérotation (`v1.0.0`…), à partir de la première version publiée du site, et
sont annotés avec la version d'Axons utilisée (par exemple « ezjsdev 1.0.0 — basé sur Axons v0.8.0 »). Une version se
publie après le merge de sa PR, tag par tag : `git push origin vX.Y.Z`. Ne jamais lancer `git push --tags`, qui
publierait aussi les tags `axons/*` locaux.

## Licence

Construit sur Axons, distribué sous licence **GNU AGPL v3.0** : voir [`LICENSE`](LICENSE).
