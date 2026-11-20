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
les maquettes du site sont dans [`mockups/`](mockups/).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Material UI 9 derrière une API neutre · `next-intl` 4 ·
Vitest, Playwright, Storybook 10 · Netlify.

**Version : ezjsdev 0.3.0, basé sur Axons [v0.16.0](https://github.com/YoannB/axons/tree/v0.16.0).**

ezjsdev est construit sur le boilerplate [Axons](https://github.com/YoannB/axons) : l'architecture, les conventions et
la documentation technique viennent de là. `AGENTS.md` et `docs/` sont la documentation (en anglais) du moteur pour
les agents de code.

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

| Variable                       | Valeur ezjsdev                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_DEFAULT_LOCALE`   | `fr` : le français est servi à la racine. **Indispensable** : les liens internes des contenus en dépendent. |
| `NEXT_PUBLIC_LOCALES`          | `fr,en,es,de,it,pt` (ou vide = les six).                                                                    |
| `NEXT_PUBLIC_SITE_URL`         | URL publique du site (canonical, hreflang, sitemap).                                                        |
| `NEXT_PUBLIC_AI_DAILY_LIMIT`   | `0` : ezjsdev ne fait aucun appel IA.                                                                       |
| `OPENROUTER_API_KEY`           | **Ne pas définir** (IA coupée).                                                                             |
| `NEXT_PUBLIC_ADS_ENABLED`      | `false`.                                                                                                    |
| `NEXT_PUBLIC_GTM_ID`           | Vide : pas de mesure d'audience (le bandeau cookies n'apparaît que si les commentaires sont actifs).        |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Shortname Disqus ; vide = commentaires désactivés. Seules les entrées non archivées en affichent.           |
| `LEGAL_*`                      | Informations éditeur des mentions légales (serveur uniquement) ; jamais de vraies valeurs dans le dépôt.    |

## Où vit le code propre à ezjsdev

Depuis Axons v0.16.0, il n'y a plus de couche `site/` : ezjsdev est une application Next.js ordinaire, avec **une seule
source par sujet**, modifiée sur place (voir `docs/architecture.md` → _Site identity_).

| Emplacement                                                                  | Contenu                                                                                         |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`constants/site.ts`](constants/site.ts)                                     | Nom, titres, palette MUI, navigation, collections (dont les pense-bêtes), commentaires, splash. |
| [`constants/explorer.ts`](constants/explorer.ts), `preview.ts`, `profile.ts` | Arborescence de l'explorateur, panneau d'aperçu, faits du profil et des projets.                |
| `messages/<locale>.json`                                                     | Tous les textes, dans les six langues (un fichier par langue).                                  |
| [`i18n/pathnames.ts`](i18n/pathnames.ts)                                     | Routes traduites (À propos, Services, Projets, Contact, pense-bêtes…).                          |
| `app/[locale]/layout.tsx`                                                    | Cadre de page : l'interface IDE (`components/site/ide/SiteShell`).                              |
| `components/home/Home.tsx`                                                   | Corps de la page d'accueil.                                                                     |
| `components/ui/Logo.tsx`, `app/icon.svg`                                     | Logo `</>` et favicon.                                                                          |
| `styles/tokens.css`, `styles/ui/logo.css`                                    | Jetons de couleur, reflet du logo.                                                              |
| `styles/layout/ide.css`, `styles/layout/ide-preview.css`                     | Interface IDE et panneau d'aperçu.                                                              |
| `styles/pages/content.css`, `styles/home/demo.css`                           | Pages de contenu et démo « Générer un site ».                                                   |
| `components/og/OgImage.tsx`                                                  | Couleurs des images de partage (`OG_THEME`).                                                    |
| `components/site/`                                                           | Composants de l'interface IDE et de la démo.                                                    |
| `app/[locale]/about/`, `services/`, `projects/`, `contact/`, `reminders/`    | Pages propres à ezjsdev.                                                                        |
| `content/articles/`, `content/reminders/`                                    | Articles et pense-bêtes (un dossier par entrée, un fichier par langue).                         |
| `public/articles/`, `public/reminders/`, `public/demo/`, `public/projects/`  | Images des contenus et captures des projets.                                                    |

## Contrôle qualité

À lancer avant toute PR (c'est aussi ce que la CI exécute sur les PR vers `main`) :

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test && npm run build && npm run test:e2e && npm run storybook:build
```

Plus `npm audit`. Le formatage est géré par Prettier (`npm run format`).

Sous Windows, si le build échoue avec `ERR_SWC_NATIVE_CACHE`, définir `SWC_NATIVE_BINDING_CACHE` vers un dossier
accessible au seul utilisateur (par exemple `C:\Users\<vous>\.cache\swc-native`). Les tests e2e supposent
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

En cas de conflit, le résoudre fichier par fichier, volontairement :

- **identité et contenu d'ezjsdev** (les fichiers du tableau « Où vit le code propre à ezjsdev », les pages, les
  contenus, les tests e2e propres à ezjsdev et ce `README.md`) : garder la version ezjsdev, puis y reporter à la main
  ce que la release ajoute (une nouvelle clé dans chaque `messages/<locale>.json`, une nouvelle constante dans
  `constants/site.ts`…) ;
- **moteur** (tout le reste) : reprendre la version Axons ;
- `package.json` / `package-lock.json` : reprendre la version **Axons** (dépendances, correctifs de sécurité), puis y
  remettre seulement le `name` et la `version` d'ezjsdev ;
- garder la suppression de la démo d'Axons (articles de démo, accueil de démo, `mockups/axons-*`) : `mockups/` ne
  contient que les maquettes d'ezjsdev.

Lire la section MIGRATION des notes de la release (`gh release view vX.Y.Z --repo YoannB/axons`) avant de merger.

Puis mettre à jour la ligne « basé sur Axons » en tête de ce README, relancer le contrôle qualité complet et ouvrir la
PR. La PR se merge avec un **merge commit**, jamais en squash : l'historique d'Axons doit rester un ancêtre de `main`.

## Versions et tags

Les tags d'ezjsdev suivent leur propre numérotation (`v1.0.0`…), à partir de la première version publiée du site, et
sont annotés avec la version d'Axons utilisée (par exemple « ezjsdev 1.0.0 — basé sur Axons v0.8.0 »). Une version se
publie après le merge de sa PR, tag par tag : `git push origin vX.Y.Z`. Ne jamais lancer `git push --tags`, qui
publierait aussi les tags `axons/*` locaux.

## Licence

Construit sur Axons, distribué sous licence **GNU AGPL v3.0** : voir [`LICENSE`](LICENSE).
