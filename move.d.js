const fs = require('fs');

/**
 * * Move components definition file
 */
const componentsPath = './dist/entry/components';
fs.readdirSync(componentsPath).forEach((file) => {
  const oldPath = `${componentsPath}/${file}`;
  const newPath = `./dist/components/${file}`;
  fs.rename(oldPath, newPath, (err) => {
    err && console.log(err);
  });
});

/**
 * * Remove Entry Directory
 */
fs.rmSync('./dist/entry', { recursive: true, force: true });
