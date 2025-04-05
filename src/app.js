/* eslint-disable no-console */
const fsp = require('fs/promises');
const path = require('path');

async function main() {
  const oldPath = process.argv[2];
  let newPath = process.argv[3];

  try {
    const destStat = await fsp.stat(newPath);

    if (destStat.isDirectory()) {
      const filename = path.basename(oldPath);

      newPath = path.join(newPath, filename);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(error);
    }
  }

  if (oldPath !== newPath) {
    try {
      await fsp.rename(oldPath, newPath);
    } catch (error) {
      console.error(error);
    }
  }
}

main();
