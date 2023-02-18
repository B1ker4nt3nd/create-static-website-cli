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
  const appName = answer.trim().toLowerCase().replace(/\s+/g, '-');
  if (!/^[a-z0-9-_]+$/.test(appName)) {
    console.error(
      `Invalid package name: "${appName}". The name must be lowercase and one word, and may contain hyphens and underscores only.`
    );
    process.exit(1);
  }

  const folderName = appName;

  exec(
    `git clone https://github.com/B1ker4nt3nd/webpack-init.git ${folderName}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`Git clone successful`);

      // Read the existing package.json file
      const packageJsonPath = `${folderName}/package.json`;
      const packageJsonString = fs.readFileSync(packageJsonPath);
      const packageJson = JSON.parse(packageJsonString);

      // Update the "name" property
      packageJson.name = appName;

      // Write the updated object back to the file
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('package.json successfully updated');

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
});
