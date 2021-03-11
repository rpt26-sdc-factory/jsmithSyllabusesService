const mongoose = require('mongoose');
const syllabusesSchema = require('./syllabusesSchema');

mongoose.connect('mongodb://localhost/syllabuses', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connection opened');
});

const Syllabuses = mongoose.model('syllabuses', syllabusesSchema);

module.exports.hoursToComplete = (courseNumber, cb) => {
  Syllabuses.findOne({ id: courseNumber })
    .then((syllabusData) => {
      cb({ hoursToComplete: syllabusData.hoursToCompleteCourse });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};

module.exports.syllabus = (courseNumber, cb) => {
  Syllabuses.findOne({ id: courseNumber })
    .then((syllabusData) => {
      cb(syllabusData);
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};



