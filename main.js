
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const notifier = require("node-notifier");
const path = require('path');

const isDev = !app.isPackaged;

//const axios = require("axios");

const log4js = require("log4js");




const socketIOClient = require("socket.io-client");

const ENDPOINT = "http://192.168.1.218:5000";

const sk = socketIOClient(ENDPOINT);

log4js.configure({
  appenders: {
    everything: { type: "dateFile", filename: "./logs/all-the-logs.log" },
  },
  categories: {
    default: { appenders: ["everything"], level: "trace" },
  },
});

const logger = log4js.getLogger("all-the-logs");

logger.trace("\n\n\n\n\n\n\n");

logger.trace("Entering OTDR testing");




sk.on("onFailure", (data) => {
  console.log("onFailure");
  // console.log("data :", data);
  console.log("timeFailed: ", data.time);

  console.log("lengthFailed: ", data.length);
  ////logger file

  logger.warn(`length of failure: ${data.length}`);

  /////alert in the desktop:
if(Number(data.length)===0){
  notifier.notify({
    title: "OTDR Faliure",
    message: `no fiber`,
    icon: path.join(__dirname, 'images/failure.png'), // Absolute path (doesn't work on balloons)
  });
}
else{
   notifier.notify({
    title: "OTDR Faliure",
    message: `fiber break at : ${data.length}`,
    icon: path.join(__dirname, 'images/failure.png'), // Absolute path (doesn't work on balloons)
  }); 
}


  notifier.on('click', function (notifierObject, options, event) {
    // Triggers if `wait: true` and user clicks notification

    // console.log("fail click")
    sk.emit("muteVolume");
  
    
  });
  
});




sk.on("onSuccess", (data) => {
  console.log("onSuccess");
  // console.log("data :", data);

  console.log("timeSuccess: ", data.time);

  console.log("lengtSuccess: ", data.length);
  ////logger file

  logger.info(`length of success: ${data.length}`);

  /////alert in the desktop:

  notifier.notify({
    title: "OTDR Success",
    message: `Length of fiber: ${data.length} meter`,
      wait: true, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds
      icon: path.join(__dirname, 'images/success.png'), // Absolute path (doesn't work on balloons)

  });

});




sk.on("onError", (data) => {
  console.log("onError");
  console.log("data :", data);

  ////logger file

  logger.error(`error in request: ${data}`);


});






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
//   message: 'Hellooooo, there!'
// });


// notifier.on("click", function (notifierObject, options, event) {
// console.log('notifierObject :', notifierObject);
//   // Triggers if `wait: true` and user clicks notification
// });
app.whenReady().then(createWindow)


