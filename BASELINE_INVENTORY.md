# Baseline Inventory

- Repository: local folder `forma-website-design-main/forma-website-design-main`; no `.git` directory or Git remote is configured.
- Branch: unavailable (not a Git checkout).
- Framework: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Lucide icons.
- Install/run: `pnpm install`; `pnpm dev`; production build: `pnpm build`.
- Deployment target stated by owner: Vercel. Project README refers to a Vercel/v0 project but no repository URL is configured locally.
- Routes: `/`, `/intro-preview`, `/work/north`, `/work/noir`, `/work/project-03` (Aura), `/work/project-04` (Meridian).
- Main page applications/sections: navigation, opening sequence, hero, intro, services, pricing, benefits, process, portfolio, about, FAQ, contact, footer.
- Assets: `public/work/*` contains Noir, North, Aura, and Meridian concept imagery; shared placeholder images/icons are in `public/`.
- Background and motion: CSS monochrome grid and rotating/floating rings in the hero; a 72-particle snowfall component behind the site (reduced to 38 on small screens); animated opening sequence with session skip; scroll/reveal/parallax effects. No background video or wallpaper media files were found in the project inventory.
- Protected behavior: retain the current opening sequence, snowfall, monochrome grid/rings, reduced-motion handling, project concept imagery, and demo labels unless an approved contract item changes them.
- Third-party integrations: `@vercel/analytics/next` loads in production in the baseline. No form backend is configured; the existing contact form only shows a local success state. No secret environment-variable names were found in the inspected source.
- Baseline screenshots: not captured; the existing project could not be run because the installed dependency files return Windows access denied, and pnpm aborted its automatic dependency-folder cleanup without a terminal.
- Known baseline issues relevant to personalization: site uses generic positioning and includes pricing/services not confirmed by Marco; contact form is not backed by a server; social channels were marked as coming soon despite a supplied Instagram profile; `next.config.mjs` originally bypassed TypeScript build errors (the bypass is now removed).
