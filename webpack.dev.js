const path = require("path");
const commonConfig = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});
