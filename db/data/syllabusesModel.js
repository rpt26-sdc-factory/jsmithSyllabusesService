const mongoose = require('mongoose');
const syllabusesSchema = require('./syllabusesSchema.js');

mongoose.connect('mongodb://127.0.0.1/syllabuses', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'syllabuses connection error'));
db.once('open', () => {
  console.log('syllabusesModel connected to db');
});

const SyllabusesModel = mongoose.model('syllabuses', syllabusesSchema);

module.exports = SyllabusesModel;