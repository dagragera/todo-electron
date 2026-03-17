// src/index.js (main)
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs/promises");

let mainWindow;

function getTodosFile() {
  return path.join(app.getPath("userData"), "todos.json");
}

async function readTodos() {
  try {
    const raw = await fs.readFile(getTodosFile(), "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeTodos(todos) {
  await fs.mkdir(app.getPath("userData"), { recursive: true });
  await fs.writeFile(getTodosFile(), JSON.stringify(todos, null, 2), "utf-8");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  // IPC
  ipcMain.handle("todos:load", async () => await readTodos());
  ipcMain.handle("todos:save", async (_evt, todos) => {
    if (!Array.isArray(todos)) return false;
    await writeTodos(todos);
    return true;
  });
  ipcMain.handle("todos:path", async () => getTodosFile());

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
