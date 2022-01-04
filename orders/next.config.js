/** @type {import('next').NextConfig} */
const { withFederatedSidecar, federationLoader } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;
let merge = require('webpack-merge');

module.exports = withFederatedSidecar({
  name: "orders",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./orders": "./pages/orders",
    "./pages-map": "./pages-map.ts",
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    const { webpack, isServer } = options;

    config.experiments = { topLevelAwait: true };
    config.output.publicPath = "auto";
    config.module.rules.push({
      test: /_app.tsx/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js",
    });

    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {
        shell: false,
        pdp: false,
        orders: false,
      });
    } else {
      config.output.publicPath = "auto";
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            shell: "shell",
            pdp: "pdp",
            orders: "orders",
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

    return merge.merge(config, {
      entry() {
        return config.entry().then((entry) => {
          return entry;
        });
      },
    });
  },
});
