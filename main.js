'use strict';

const electron = require('electron');
const app = electron.app;   // module to control application life
const BrowserWindow = electron.BrowserWindow; // module to create native browser window
var mainWindow = null;

// don't close the app if on osx
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// create the main window now that the app module is ready
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // clean up after ourselves
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
