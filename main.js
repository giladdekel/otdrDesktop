
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const notifier = require("node-notifier");
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'OTDR Notifiation', body: message}).show();
})

// String
// notifier.notify('Message');

// // Object
// notifier.notify({
//   title: 'My notification',
//   message: 'Hello, there!'
// });


// notifier.on("click", function (notifierObject, options, event) {
// console.log('notifierObject :', notifierObject);
//   // Triggers if `wait: true` and user clicks notification
// });
app.whenReady().then(createWindow)
