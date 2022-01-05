// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  root: "src",
  plugins: [
      "@snowpack/plugin-svelte",
      "@snowpack/plugin-typescript",
  ],
};
