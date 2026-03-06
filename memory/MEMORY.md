# Village Docs - Project Memory

## Project Overview
Documentation site for Village (group event management platform). URL: https://docs.usevillage.app/
Built with Astro + Starlight + React + Tailwind v4.

## Tech Stack
- Astro v5.18.0 + Starlight v0.37.6 (docs theme)
- React v19.2.4 + @astrojs/react
- Tailwind CSS v4.2.1 via @tailwindcss/vite plugin
- Framer Motion (motion v12.35.0)
- shadcn/ui + radix-ui v1.4.3
- Nunito font (@fontsource/nunito)
- Pagefind (search), @astrojs/sitemap

## Key Files
- `astro.config.mjs` - Main config (Starlight, sidebar, plugins)
- `src/styles/global.css` - CSS layers, theme, animations
- `src/styles/custom.css` - Brand colors, Nunito font, card styles
- `src/components/` - CustomHero, CustomPageTitle, CustomLastUpdated, ColorSwatchGrid + ui/ React components
- `src/content/docs/` - 11 MDX files (start-here/, guides/)

## Brand Colors
- Primary green: #16A34A

## Content Structure
- Start Here: introduction, getting-started, account-plans, private-beta
- Guides: creating-events, form-builder, publishing-sharing, managing-signups, email-notifications, feedback-support

## Known Issues / Fixed
- button.tsx used `import { Slot } from "radix-ui"` + `Slot.Root` — fixed to `import { Slot } from "@radix-ui/react-slot"` + `Slot` directly

## User Preferences
- Awaiting further requests after initial audit
