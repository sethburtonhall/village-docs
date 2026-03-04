// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Village Docs",
      components: {
        LastUpdated: "./src/components/CustomLastUpdated.astro",
      },
      customCss: [
        "./src/styles/custom.css",
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
            { label: "Introduction", slug: "start-here/introduction" },
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
            { label: "Feedback & Support", slug: "guides/feedback-support" },
            // { label: "What's Coming", slug: "guides/whats-coming" },
          ],
        },
      ],
    }),
  ],
});
