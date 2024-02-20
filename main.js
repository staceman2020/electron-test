const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
// var winax = require("winax");
let winClaims;
function createWindow() {
  winClaims = new BrowserWindow({
    title: "Claims Management",
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadFile("index.html");
  winClaims.loadURL("http://localhost:5180/claims/list").then(
    () => {
      winClaims.webContents.openDevTools();
      // win.webContents.on("did-start-navigation", (event, url) => {
      //   console.log("Navigated to: " + url);
      //   event.preventDefault();
      // });
      // win.webContents.on("did-finish-load", () => {});
      // win.webContents.on("found-in-page", (result) => {
      //   console.log("Found in page: " + JSON.stringify(result, null, 2));
      // });

      // win.webContents.executeJavaScript("alert('told you so');");
      // setInterval(() => {
      //   console.log("Sending ping");
      //   win.webContents.findInPage("claim");
      //   win.webContents.emit("message", "whoooooooh!");

      //   // send("message", "whoooooooh!");
      // }, 2000);
    },
    () => {
      console.log("Window is ready");
    }
  );
}

app.whenReady().then(createWindow);

ipcMain.on("toMain", (event, args) => {
  console.log("Got it " + JSON.stringify(args, null, 2));
  // var con = new winax.Object("Outlook.Application");
  // var mail = con.CreateItem(0);

  fs.readFile("C:/data/scm/electron-omni/README.md", (error, data) => {
    // Do something with file contents
    let responseObj = {
      error: error,
      data: data.toString(),
    };

    // Send result back to renderer process
    setInterval(() => {
      winClaims.webContents.send("fromMain", responseObj);
    }, 2000);
  });
});

ipcMain;
