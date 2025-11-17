import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Point to the actual translations directory used in this project.
    // The plugin expects a path here; set it to the existing file so Next can load the config.
    createMessagesDeclaration: "./src/translations/fr.json",
  },
});

const nextConfig = {
  // output: "export",
  // webpack: (config, { isServer }) => {
  //   config.resolve.alias.canvas = false;
  //   return config;
  // },
};

export default withNextIntl(nextConfig);
