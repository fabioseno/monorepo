const ZipPlugin = require("zip-webpack-plugin")
const path = require("path")

const config = {
    //what are the entry points to our functions
    entry: {
        express: "./dist/src/infrastructure/http/express.app.js",
        lambda: "./dist/src/infrastructure/serverless/lambda.function.js"
    },
    //how we want the output
    output: {
        filename: "[name]/index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
    },
    target: "node",
    mode: "production",
    optimization: { minimize: false },
}
//finally zip the output directory, ready to deploy
const pluginConfig = {
    plugins: Object.keys(config.entry).map(entryName => {
        return new ZipPlugin({
            path: path.resolve(__dirname, "dist", entryName),
            filename: entryName,
            extension: "zip",
            include: [entryName],
        })
    }),
}

const webpackConfig = Object.assign(config, pluginConfig)
module.exports = webpackConfig