const mongoose = require('mongoose');

// commented out SyllabusModel and modeled directly inside of file because otherwise tests won't run;
// tries to make two connections to mongodb

// const SyllabusModel = require('./data/syllabusesModel');

const syllabusesSchema = require('./data/syllabusesSchema.js');
const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

const hoursToComplete = (courseNumber, cb) => {
  SyllabusModel.findOne({ id: courseNumber })
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

const syllabus = (courseNumber, cb) => {
  const options = {id: courseNumber};
  SyllabusModel.findOne(options)
    .then((syllabusData) => {
      cb(syllabusData);
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
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

  // !!! make sure that courseNumber not already inside of database
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
  const filter = {id: courseNumber};
  // !!! make sure that courseNumber exists before trying to put

  // {new: true} means that document returned is the document after the edits have been applied
  // Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated (but successful)
  SyllabusModel.findOneAndUpdate(filter, edits, {new: true})
    .then((success) => {
      cb(null, success);
    })
    .catch((err) => {
      console.error(err);
      cb(err, null);
    })

};

module.exports.hoursToComplete = hoursToComplete;
module.exports.syllabus = syllabus;
module.exports.deleteEntry = deleteEntry;
module.exports.insertEntry = insertEntry;
module.exports.updateEntry = updateEntry;