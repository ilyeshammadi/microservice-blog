const path = require("path");
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(
  withCSS({
    webpack(config, options) {
      config.resolve.alias["@src"] = path.join(__dirname, "src");
      return config;
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  })
);
