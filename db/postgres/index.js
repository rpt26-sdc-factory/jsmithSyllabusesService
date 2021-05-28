const { Pool, Client } = require('pg');

// the default port for PostgreSQL databases is 5432
const pool = new Pool({
  user: 'kimberly',
  host: 'localhost',
  database: 'sdc',
  port: '5432'
});

// POST | C : create
const insertSyllabus = (courseNumber, entry, cb) => {
  pool.query()

};

// GET | R: read
const getHoursToComplete = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (result.rows[0] === undefined) {
      console.log('record doesn\'t exist');
      cb('record doesn\'t exist', err);
    } else if (err) {
      console.log('error while attempting to get hours to complete course from PostgreSQL database: ', err);
      cb(err, null);
    } else {
      let hoursToCompleteCourseData = result.rows[0].syllabus.hoursToCompleteCourse;
      cb(null, hoursToCompleteCourseData);
    }
  });
};

const getSyllabus = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (result.rows[0] === undefined) {
      console.log('record doesn\'t exist');
      cb('record doesn\'t exist', err);
    } else if (err) {
      console.log('error while attempting to get syllabus from PostgreSQL database: ', err);
      cb(err, null);
    } else {
      let syllabusData = result.rows[0].syllabus;
      cb(null, syllabusData);
    }
  });
};

// PUT | U: update
const updateSyllabus = (courseNumber, edits, cb) => {
  // IS THIS RIGHT ???????
  // what if the edits are to more than one attribute of the json object
  pool.query(`UPDATE syllabi SET syllabus = jsonb_set(syllabus, '{name}', '"my-other-name"') WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('error while attempting to update syllabus within PostgreSQL database: ', err);
      cb(err, null);
    } else {
      console.log('result is: ', result);
      cb(null, result);
    }
  });
};

// DELETE | D: delete
const deleteSyllabus = (courseNumber, cb) => {
  pool.query(`DELETE from syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('err while attempting to delete syllabus within PostgresSQL database: ', err);
      cb(err, null);
    } else {
      console.log('result is: ', result);
      cb(null, result);
    }
  });
};

// EXPORTS
module.exports.insertSyllabus = insertSyllabus;
module.exports.getHoursToComplete = getHoursToComplete;
module.exports.getSyllabus = getSyllabus;
module.exports.updateSyllabus = updateSyllabus;
module.exports.deleteSyllabus = deleteSyllabus;

let newData = {"id":800,"weeks":[{"lessons":[{"videos":[{"videoIndex":0,"videoTitle":"Weird weirdo test test see if this works","videoLengthMinutes":34,"videoLengthSeconds":24}],"readings":[{"readingIndex":0,"readingTitle":"Zimbabwe Metal virtual","readingLengthMinutes":60}],"exercises":[{"exerciseIndex":0,"exerciseTitle":"motivating quantify bluetooth feed","exerciseLengthMinutes":57}],"lessonIndex":0,"lessonTitle":"Chilean","videosLength":51,"readingsLength":13,"exercisesLength":10,"lessonDescription":"Ipsum porro sequi nemo at at cum quos accusantium vitae. Velit unde nisi et dignissimos. Illo aut voluptates. Ut et velit aliquam neque odit.","hoursToCompleteLesson":8}],"weekIndex":0,"hoursToCompleteWeek":25},{"lessons":[{"videos":[{"videoIndex":0,"videoTitle":"Exclusive connect monitor","videoLengthMinutes":58,"videoLengthSeconds":45}],"readings":[{"readingIndex":0,"readingTitle":"Steel","readingLengthMinutes":27}],"exercises":[{"exerciseIndex":0,"exerciseTitle":"local calculate solid state card","exerciseLengthMinutes":11}],"lessonIndex":0,"lessonTitle":"turquoise olive Generic","videosLength":52,"readingsLength":5,"exercisesLength":9,"lessonDescription":"Sit id facere voluptatum. Id doloribus neque error suscipit vitae veritatis et. Dolor molestias aut labore. Rerum natus porro asperiores et. Natus velit occaecati.","hoursToCompleteLesson":3}],"weekIndex":1,"hoursToCompleteWeek":93}],"hoursToCompleteCourse":33365};