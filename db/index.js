const mongoose = require('mongoose');

// commented out SyllabusModel and modeled directly inside of file because otherwise tests won't run;
// tries to make two connections to mongodb
// put the difference between lines 7 and 9 / 10 inside of an if/else block related to which enviornment is being run ???

// const SyllabusModel = require('./data/syllabusesModel');

const syllabusesSchema = require('./data/syllabusesSchema.js');
const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

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
      cb(null, syllabusData);
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
        console.log('sucessfully deleted record inside of database', success);
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
      console.error(err);
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
      cb(null, success);
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