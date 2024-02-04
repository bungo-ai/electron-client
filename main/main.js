const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const { OSInfo } = require('./utils/osinfo');

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }

  // Getting the OS info when the page loads
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('get-os-release', OSInfo.get());
  });
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

// Makes sure that for MacOS, we create a new window if all windows are closed
// As this is the default behavior 
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});