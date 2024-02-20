const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
// var winax = require("winax");
let winClaims;
let winTasks;
function createClaimWindow(debugTools = false) {
  winClaims = new BrowserWindow({
    title: "Claims Management",
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadFile("index.html");
  winClaims.loadURL("http://localhost:5180/claims/list").then(
    () => {
      debugTools && winClaims.webContents.openDevTools();
    },
    () => {
      console.log("Window is ready");
    }
  );
}

function createTaskWindow(debugTools = false) {
  console.log("Creating Task Window ");
  winTasks = new BrowserWindow({
    title: "Task Management",
    width: 800,
    height: 600,
    x: 801,
    y: 0,

    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadFile("index.html");
  winTasks.loadURL("http://localhost:5181/tasks/list").then(
    () => {
      debugTools && winTasks.webContents.openDevTools();
    },
    () => {
      console.log("Window is ready");
    }
  );
}

let debugTools = true;

app.whenReady().then(() => {
  createClaimWindow(debugTools);
  createTaskWindow(debugTools);
});

ipcMain.on("toChangeClaim", (event, args) => {
  console.log("Got it " + JSON.stringify(args, null, 2));
  // var con = new winax.Object("Outlook.Application");
  // var mail = con.CreateItem(0);
  winClaims.webContents.send("fromChangeClaim", args);

  // fs.readFile("C:/data/scm/electron-omni/README.md", (error, data) => {
  //   // Do something with file contents
  //   let responseObj = {
  //     error: error,
  //     data: data.toString(),
  //   };

  //   // Send result back to renderer process
  //   setInterval(() => {
  //     winClaims.webContents.send("changeClaim", responseObj);
  //   }, 2000);
  // });
});

ipcMain;
