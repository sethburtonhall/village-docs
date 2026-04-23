// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// validates all links in Vercel builds, skips local
// https://starlight-links-validator.vercel.app/guides/conditional-validation
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoom from "starlight-image-zoom";
import starlightHeadingBadges from "starlight-heading-badges";
import { passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.usevillage.app/",
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      title: "Village Docs",
      plugins: [
        starlightImageZoom(),
        starlightHeadingBadges(),
        ...(process.env.CHECK_LINKS ? [starlightLinksValidator()] : []),
      ],
      // Disable the default 404 page so we can use our custom one
      // disable404Route: true,
      components: {
        Hero: "./src/components/CustomHero.astro",
        LastUpdated: "./src/components/CustomLastUpdated.astro",
        PageTitle: "./src/components/CustomPageTitle.astro",
        Sidebar: "./src/components/CustomSidebar.astro",
      },
      customCss: [
        "./src/styles/global.css",
        "@fontsource/nunito/400.css",
        "@fontsource/nunito/600.css",
        "@fontsource/nunito/700.css",
        "@fontsource/nunito/900.css",
      ],
      // social: {
      //   github: "https://github.com/withastro/starlight",
      // },
      logo: {
        src: "./src/assets/icon_green.png",
        alt: "Village Logo",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            {
              label: "Introduction",
              slug: "start-here/introduction",
            },
            { label: "Getting Started", slug: "start-here/getting-started" },
            { label: "Your Account & Plan", slug: "start-here/account-plans" },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Creating Events", slug: "guides/creating-events" },
            {
              label: "Form Builder",
              slug: "guides/form-builder",
            },
            {
              label: "Publishing & Sharing Events",
              slug: "guides/publishing-sharing",
            },
            { label: "Managing Sign-Ups", slug: "guides/managing-signups" },
            {
              label: "Email Notifications",
              slug: "guides/email-notifications",
            },
            {
              label: "Feedback & Support",
              slug: "guides/feedback-support",
            },
          ],
        },
        {
          label: "Village Live",
          items: [
            { label: "Overview", slug: "village-live/overview" },
            {
              label: "Running Your Event",
              slug: "village-live/mission-control",
            },
            {
              label: "Attendee Experience",
              slug: "village-live/attendee-experience",
            },
          ],
        },
      ],
    }),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
