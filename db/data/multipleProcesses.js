const syllabusesGenerator = require('./syllabusesGenerator');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({sendHeaders: false});

// const childProcess = require('child_process');
// path is not relative to location of file ???
// const exec = childProcess.exec(`node db/data/syllabusesGenerator.js 0 5`, function(err, stdout, stderr) {
//   console.log('success: ', stdout);
// });

function generateCVS(writer, encoding, callback) {
  var records = 10000000;
  var id = 0;
  initiate();
  function initiate() {
    var bufferNotFull = true;
    do {
      records -= 1;
      id += 1;
      var syllabus = JSON.stringify(syllabusesGenerator.generateSyllabus(id));
      if (records === 0) {
        writer.write({id, syllabus});
        callback();
      } else {
        bufferNotFull = writer.write({id, syllabus});
      }
    } while (records > 0 && bufferNotFull);
    if (records > 0) {
      writer.once('drain', initiate);
    }
  }
}

console.log('CSV GENERATION SCRIPT:');
let fileName = 'syllabi-data-10million';
writer.pipe(fs.createWriteStream(`${fileName}.csv`, {flags: 'a'}));
var start = new Date().getTime();
generateCVS(writer, 'utf8', () => {
  writer.end();
  var end = new Date().getTime();
  console.log(`The elapsed time was: "${end - start}"`);
});