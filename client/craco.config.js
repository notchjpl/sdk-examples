const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: "./",
        aliases: {
          "@components": "./src/components",
          "@context": "./src/context",
          "@pages": "./src/pages",
          "@utils": "./src/utils",
        },
      },
    },
  ],
};
