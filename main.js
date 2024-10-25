const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const sqlite3 = require('sqlite3').verbose();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Obtener la ruta del directorio de datos del usuario
const dbPath = path.join(app.getPath('userData'), 'database.db');
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al abrir la base de datos", err);
  } else {
    console.log("Base de datos creada en:", dbPath);
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})