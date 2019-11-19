const Menubar = require('menubar');
const { globalShortcut } = require('electron');

const menubar = Menubar({
  preloadWindow: true,
  index: `file://${__dirname}/index.html`,
});

menubar.on('ready', () => {
  console.log('Application is ready');

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
