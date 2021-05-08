const mongoose = require('mongoose');
const syllabusesData = require('./syllabuses.json');
const syllabusesModel = require('./syllabusesModel');
const syllabusesSchema = require('./syllabusesSchema');

let syllabusesInsert = () => {

  syllabusesModel.insertMany(syllabusesData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('syllabusesInsert success');
    }
    mongoose.connection.close();
  });
};

module.exports = syllabusesInsert;