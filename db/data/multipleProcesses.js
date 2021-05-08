// const { spawn } = require('child_process');
const childProcess = require('child_process');

// path is not relative to location of file ?
let childNum = 0;
const exec = childProcess.exec(`node db/data/syllabusesGenerator.js 1 5`, function(err, stdout, stderr) {
  console.log('success: ', stdout);
});