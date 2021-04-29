const mongoose = require('mongoose');
const SyllabusModel = require('./data/syllabusesModel');

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
    })
};

module.exports.hoursToComplete = hoursToComplete;
module.exports.syllabus = syllabus;
module.exports.deleteEntry = deleteEntry;