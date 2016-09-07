# electron-hero-browser
Small electron app to browse marvel heroes.

This is just a small exercise to learn about writing javascript and electron applications.

It is based on a [tutorial](https://www.sitepoint.com/desktop-node-apps-with-electron/?utm_source=nodeweekly&utm_medium=email) on sitepoint.

An Electron project requires three files:

- index.html: The web page rendered by default.
- main.js: Starts the app and creates a browser window to render HTML.
- package.json: Lists the application dependencies, meta data and files needed.

In order to build and package this application, both electron-prebuilt and electron-packager need to be installed. I installed mine at the global level because of their size.

To package the application run npm run-script package.

I have only configured the packager for mac osx because I'm like that.
