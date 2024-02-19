const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    title: "Claims Management",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadFile("index.html");
  win.loadURL("http://localhost:5173/claims/list").then(
    () => {
      win.webContents.openDevTools();
      win.webContents.on("did-start-navigation", (event, url) => {
        console.log("Navigated to: " + url);
        event.preventDefault();
      });
      win.webContents.on("did-finish-load", () => {});
      win.webContents.on("found-in-page", (result) => {
        console.log("Found in page: " + JSON.stringify(result, null, 2));
      });

      win.webContents.executeJavaScript("alert('told you so');");
      setInterval(() => {
        console.log("Sending ping");
        win.webContents.findInPage("claim");
        win.webContents.emit("message", "whoooooooh!");

        // send("message", "whoooooooh!");
      }, 2000);
    },
    () => {
      console.log("Window is ready");
    }
  );
}

app.whenReady().then(createWindow);

ipcMain.on("toMain", (event, args) => {
  console.log("Got it");
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});