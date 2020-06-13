const {
    override,
    fixBabelImports,
    // addWebpackPlugin,
    adjustStyleLoaders,
    addBabelPlugin,
} = require("customize-cra");
const { loaderByName, getLoader } = require("@craco/craco");
// const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const transformBabelLoader = require("./util/transform_babel_loader");

isEnvProduction = process.env.NODE_ENV !== "production";

function addCustomize() {
    return (webpackConfig) => {
        const lm = getLoader(webpackConfig, loaderByName("babel-loader"));
        const loader = lm.match.loader;
        webpackConfig.module.rules[2].oneOf[1] = transformBabelLoader(loader);
        return webpackConfig;
    };
}

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
    }),
    // addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    adjustStyleLoaders(({ use: [_, css, postcss, resolve, processor] }) => {
        // pre-processor
        if (processor && processor.loader.includes("sass-loader")) {
            processor.options.implementation = require("sass"); // sass-loader
        }
    }),
    addBabelPlugin("@babel/plugin-proposal-optional-chaining"),
    addCustomize()
);
