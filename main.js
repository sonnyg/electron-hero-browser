'use strict';

const electron = require('electron');
const app = electron.app;   // module to control application life
const BrowserWindow = electron.BrowserWindow; // modeul to create native browser window
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
