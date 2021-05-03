const mongoose = require('mongoose');

// SyllabusModel needs to be declared ahead of time else tests error because undefined variable
// ideally, should be a constant but alas...
var SyllabusModel;

if (process.env.NODE_ENV.trim() !== 'test') {
  SyllabusModel = require('./data/syllabusesModel');
} else {
  // if these lines of code are run inside of the test enviornment two connections to mongodb are attempted which causes failures
  const syllabusesSchema = require('./data/syllabusesSchema.js');
  SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);
}

const hoursToComplete = (courseNumber, cb) => {
  SyllabusModel.findOne({ id: courseNumber })
    .then((syllabusData) => {
      let hoursToCompleteCourse = syllabusData.toObject().hoursToCompleteCourse;
      cb(null, { hoursToCompleteCourse });
    })
    .catch((err) => {
      cb(err, null);
    });
};

const syllabus = (courseNumber, cb) => {
  const options = {id: courseNumber};
  SyllabusModel.findOne(options)
    .then((syllabusData) => {
      if (!syllabusData) {
        cb('syllabusData is null', null);
      } else {
        cb(null, syllabusData);
      }
    })
    .catch((err) => {
      cb(err, null);
    });
};

const deleteEntry = (courseNumber, cb) => {
  const options = {id: courseNumber};
  SyllabusModel.deleteOne(options)
    .then((success) => {
      if (success.deletedCount === 0) {
        cb('record not located and therefore not delete');
      } else {
        cb(null, success);
      }
    })
    .catch((err) => {
      console.error(err);
      cb(err);
    });
};

const insertEntry = (courseNumber, entry, cb) => {

  // id is now a unique field so if duplicate entries attempted, error will be thrown
  SyllabusModel.create(entry)
    .then((success) => {
      cb(null, success);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const updateEntry = (courseNumber, edits, cb) => {
  // id is now a unique field so if duplicate entries attempted, error will be thrown
  const filter = {id: courseNumber};

  // {new: true} means that document returned is the document after the edits have been applied
  // Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated (but successful)
  SyllabusModel.findOneAndUpdate(filter, edits, {new: true})
    .then((success) => {
      if (!success) {
        cb('success is null', null);
      } else {
        cb(null, success);
      }

    })
    .catch((err) => {
      cb(err, null);
    })
};

module.exports.hoursToComplete = hoursToComplete;
module.exports.syllabus = syllabus;
module.exports.deleteEntry = deleteEntry;
module.exports.insertEntry = insertEntry;
module.exports.updateEntry = updateEntry;