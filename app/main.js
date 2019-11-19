const Menubar = require('menubar');
const { globalShortcut, Menu } = require('electron');

const menubar = Menubar({
  preloadWindow: true,
  index: `file://${__dirname}/index.html`,
});

const secondaryMenu = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click() {
      menubar.app.quit();
    },
    accelerator: 'CommandOrControl+Q',
  },
]);

menubar.on('ready', () => {
  console.log('Application is ready');

  menubar.tray.on('right-click', () => {
    menubar.tray.popUpContextMenu(secondaryMenu);
  });

  const createClipping = globalShortcut.register(
    'Shift+CommandOrControl+C',
    () => {
      menubar.window.webContents.send('create-new-clipping');
    },
  );
  const writeClipping = globalShortcut.register('CommandOrControl+@', () => {
    menubar.window.webContents.send('write-to-clipboard');
  });
  const publishClipping = globalShortcut.register(
    'CommandOrControl+Alt+#',
    () => {
      menubar.window.webContents.send('publish-clipping');
    },
  );

  if (!createClipping) {
    console.error('Registration failed', 'createClipping');
  }
  if (!writeClipping) {
    console.error('Registration failed', 'createClipping');
  }
  if (!publishClipping) {
    console.error('Registration failed', 'createClipping');
  }
});
