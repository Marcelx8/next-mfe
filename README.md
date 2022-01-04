# next-mfe

This example is a work-in-progress and just for practicing the Module Federation usage in Next.js, based on the `nextjs` example in the module-federation-examples code in this repository: [module-federation/module-federation-examples](https://github.com/module-federation/module-federation-examples/tree/master/nextjs).

This example will only work with the `@module-federation/nextjs-mf` plugin, which is **not free**.

The repo is a workspace that contains 3 Next.js apps (*please excuse the naming - to be changed*):
- Shell (Home)
- PDP
- Orders

The workspace also contains another directory called `module-interpreter` (personal name choice) - based on the `shared` folder in the above mentioned example code. I use `yarn link` to temporarily link the module. Link this to the 3 Next.js apps before running them.

If you bought a license for this plugin, then install the plugin to each of the above mentioned Next.js apps.

Run `yarn` or `npm install` in the root directory (workspace), as well as the sub-folders (seperate apps).

When everything is installed, run `yarn dev` in the workspace directory to start up all 3 apps.
