/** @type {import('next').NextConfig} */
const { withFederatedSidecar } = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;

module.exports = withFederatedSidecar({
  name: "shell",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./shell": "./pages/index.tsx",
    "./store": "./lib/store.ts",
    "./nav": "./components/nav.tsx",
    "./Counter": "./components/Counter.tsx",
    "./pages-map": "./pages-map.ts",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.experiments = { topLevelAwait: true };

    config.module.rules.push({
      test: /_app.tsx/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {
        shell: false,
        pdp: false,
      });
    } else {
      config.output.publicPath = "auto";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            shell: "shell",
            pdp: "pdp",
          },
          shared: {
            "@module-federation/nextjs-mf/lib/noop": {
              eager: false,
            },
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
          },
        })
      );
    }
    return config;
  },
});
