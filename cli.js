#!/usr/bin/env node
// cli.js

const readline = require('readline');
const exec = require('child_process').exec;
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.on('SIGINT', function () {
  console.log('\nreceived SIGINT, goodbye!');
  process.exit();
});

rl.question('What should be the name of application? ', (answer) => {
  const appName = answer.trim();
  const folderName = appName.replace(/\s/g, '-');

  exec(
    `git clone https://github.com/B1ker4nt3nd/webpack-init.git ${folderName}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`Git clone successful`);
      const packageJson = {
        name: appName,
      };
      fs.writeFile(
        `${folderName}/package.json`,
        JSON.stringify(packageJson, null, 2),
        (err) => {
          if (err) throw err;
          console.log('package.json successfully created');
          exec(`cd ${folderName} && npm install`, (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`Npm install successful`);
            process.exit();
          });
        }
      );
    }
  );
});
