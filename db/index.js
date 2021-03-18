const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/syllabuses', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Syllabus service db connection opened');
});

const syllabusSchema = new mongoose.Schema({
  id: Number,
  weeks: [{
    weekNumber: Number,
    hoursToCompleteWeek: Number,
    title: String,
    description: String,
    videos: [{
      videoIndex: Number,
      videoTitle: String,
      videoLengthMinutes: Number,
      videoLengthSeconds: Number
    }],
    videosLength: Number,
    readings: [{
      readingIndex: Number,
      readingTitle: String,
      readingLengthMinutes: Number
    }],
    readingsLength: Number,
    exercises: [{
      exerciseIndex: Number,
      exerciseTitle: String,
      exerciseLengthMinutes: String
    }],
    exercisesLength: Number
  }]
});

const Syllabuses = mongoose.model('syllabuses', syllabusSchema);

module.exports.hoursToComplete = (courseNumber, cb) => {
  Syllabuses.findOne({ id: courseNumber })
    .then((syllabusData) => {
      let hoursToCompleteCourse = syllabusData.toObject().hoursToCompleteCourse;
      cb({ hoursToCompleteCourse });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};

module.exports.syllabus = (courseNumber, cb) => {
  const options = {id: courseNumber};
  Syllabuses.findOne(options)
    .then((syllabusData) => {
      cb(syllabusData);
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};



