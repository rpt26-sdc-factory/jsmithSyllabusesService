const { Pool, Client } = require('pg');

// the default port for PostgreSQL databases is 5432
const pool = new Pool({
  user: 'kimberly',
  host: 'localhost',
  database: 'sdc',
  port: '5432'
});

// C : create
const insertSyllabus = (courseNumber, entry, cb) => {


};

// R: read
const getHoursToComplete = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('error while attempting to get hours to complete course from PostgreSQL database: ', err);
      cb(err, null);
    } else {
      let hoursToCompleteCourseData = result.rows[0].syllabus.hoursToCompleteCourse;
      cb(null, hoursToCompleteCourseData);
    }
    pool.end();
  });
};

const getSyllabus = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('error while attempting to get syllabus from PostgreSQL database: ', err);
      cb(err, null);
    } else {
      let syllabusData = result.rows[0].syllabus;
      cb(null, syllabusData);
    }
    pool.end();
  });
};

// U: update
const updateSyllabus = (courseNumber, edits, cb) => {


};

// D: delete
const deleteSyllabus = (courseNumber, cb) => {

};

module.exports.insertSyllabus = insertSyllabus;
module.exports.getHoursToComplete = getHoursToComplete;
module.exports.getSyllabus = getSyllabus;
module.exports.updateSyllabus = updateSyllabus;
module.exports.deleteSyllabus = deleteSyllabus;