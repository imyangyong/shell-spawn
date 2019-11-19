'use strict';

const util = require('util');
const { spawn } = require('child_process');
const execFile = util.promisify(require('child_process').execFile);

function execCommand(command, options) {
  if (Array.isArray(command)) {
    command = command.join(';')
  }
  const shell = process.platform === 'win32' ? {cmd: 'cmd', arg: '/C'} : {cmd: 'sh', arg: '-c'};
  
  let child;
  
  try {
    child = spawn(shell.cmd, [shell.arg, command], options);
  } catch (e) {
    return Promise.reject(e);
  }
  
  return new Promise((resolve, reject) => {
    let output = '';
    
    function toStdErr(data) {
      output += data;
      if (options.verbose) {
        console.warn('shell-spawn: error: ' + data.toString());
      }
    }
    
    function toStdOut(data) {
      output += data;
      if (options.verbose) {
        console.log('shell-spawn: output: ' + data.toString());
      }
    }
    
    child.stdout.on('data', toStdOut);
    child.stderr.on('data', toStdErr);
    child.on('error', reject);
    child.on('close', function (code) {
      if (code === 0) {
        resolve(output);
      } else {
        if (options.verbose) {
          console.warn(command + ' exited with exit code ' + code);
        }
        reject(new Error(output));
      }
    });
  });
}

async function execShellFile(filePath) {
  try {
    var res = await execFile(filePath, []);
  } catch (e) {
    return Promise.reject(e);
  }
  const {error, stdout, stderr} = res;
  return new Promise((resolve, reject) => {
    if (error || stderr) {
      reject(error || stderr);
    }
    resolve(stdout);
  })
}

function shellSpawn(commandOrFilePath = '', options = {}) {
  if (options.verbose) {
    console.log('shell-spawn: about to spawn ' + commandOrFilePath);
  }
  
  options = Object.assign({env: process.env, cwd: process.cwd()}, options);
  
  if (options.file) {
    return execShellFile(commandOrFilePath)
  } else {
    return execCommand(commandOrFilePath, options)
  }
};

module.exports = shellSpawn;
module.exports.shellSpawn = shellSpawn;
