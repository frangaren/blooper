// https://medium.com/litslink/how-to-create-google-chrome-extension-using-react-js-5c9e343323ff

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"),
                        paths.appIndexJs
                    ].filter(Boolean),
                    background: "./src/background.ts",
                    content: "./src/content.ts",
                },
                output: {
                    ...webpackConfig.output,
                    filename: "static/js/[name].js",
                },
                optimization: {
                    ...webpackConfig.optimization,
                    minimize: false,
                    runtimeChunk: false,
                }
            }
        },
    }
}
