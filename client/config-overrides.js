/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/rules-of-hooks */
const { addWebpackAlias, useBabelRc, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    ["@components"]: path.resolve(__dirname, "./src/components"),
    ["@context"]: path.resolve(__dirname, "./src/context"),
    ["@pages"]: path.resolve(__dirname, "./src/pages"),
    ["@utils"]: path.resolve(__dirname, "./src/utils"),
  })
);
