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
  pool.query(`INSERT INTO syllabi (id, syllabus) VALUES (${courseNumber}, '${JSON.stringify(entry)}')`, (err, result) => {
    if (err) {
      console.log('error inside of insertSyllabus');
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

// GET | R: read
const getHoursToComplete = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    // if (result.rows[0] === undefined) {
    if (result === undefined) {
      console.log('record doesn\'t exist');
      cb('record doesn\'t exist', null);
    } else if (err) {
      console.log('error inside of getHoursToComplete');
      cb(err, null);
    } else {
      let hoursToCompleteCourseData = result.rows[0].syllabus.hoursToCompleteCourse;
      cb(null, hoursToCompleteCourseData);
    }
  });
};

const getSyllabus = (courseNumber, cb) => {
  pool.query(`SELECT syllabus FROM syllabi WHERE id = ${courseNumber}`, (err, result) => {
    // if (result.rows[0] === undefined) {
    if (result === undefined) {
      cb('record doesn\'t exist', null);
    } else if (err) {
      console.log('error inside of getSyllabus');
      cb(err, null);
    } else {
      let syllabusData = result.rows[0].syllabus;
      cb(null, syllabusData);
    }
  });
};

// PUT | U: update
const updateSyllabus = (courseNumber, edits, cb) => {
  pool.query(`UPDATE syllabi SET syllabus = '${JSON.stringify(edits)}' WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('error inside of updateSyllabus');
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

// DELETE | D: delete
const deleteSyllabus = (courseNumber, cb) => {
  pool.query(`DELETE from syllabi WHERE id = ${courseNumber}`, (err, result) => {
    if (err) {
      console.log('error inside of deleteSyllabus');
      cb(err, null);
    } else {
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


// either newData (where numbers are wrapped as strings)
// or anotherSample (where numbers are numbers)
// work for inserting / updating the database

let newData = {"id":"800","weeks":[{"lessons":[{"videos":[{"videoIndex":"0","videoTitle":"Weird weirdo test test see if this works","videoLengthMinutes":"34","videoLengthSeconds":"24"}],"readings":[{"readingIndex":"0","readingTitle":"Zimbabwe Metal virtual","readingLengthMinutes":"60"}],"exercises":[{"exerciseIndex":"0","exerciseTitle":"motivating quantify bluetooth feed","exerciseLengthMinutes":"57"}],"lessonIndex":"0","lessonTitle":"Chilean","videosLength":"51","readingsLength":"13","exercisesLength":"10","lessonDescription":"Ipsum porro sequi nemo at at cum quos accusantium vitae. Velit unde nisi et dignissimos. Illo aut voluptates. Ut et velit aliquam neque odit.","hoursToCompleteLesson":"8"}],"weekIndex":"0","hoursToCompleteWeek":"25"},{"lessons":[{"videos":[{"videoIndex":"0","videoTitle":"Exclusive connect monitor","videoLengthMinutes":"58","videoLengthSeconds":"45"}],"readings":[{"readingIndex":"0","readingTitle":"Steel","readingLengthMinutes":"27"}],"exercises":[{"exerciseIndex":"0","exerciseTitle":"local calculate solid state card","exerciseLengthMinutes":"11"}],"lessonIndex":"0","lessonTitle":"turquoise olive Generic","videosLength":"52","readingsLength":"5","exercisesLength":"9","lessonDescription":"Sit id facere voluptatum. Id doloribus neque error suscipit vitae veritatis et. Dolor molestias aut labore. Rerum natus porro asperiores et. Natus velit occaecati.","hoursToCompleteLesson":"3"}],"weekIndex":"1","hoursToCompleteWeek":"93"}],"hoursToCompleteCourse":"33365"};

let anotherSample = {"id":800,"weeks":[{"lessons":[{"videos":[{"videoIndex":0,"videoTitle":"Multi-lateral connect monitor","videoLengthMinutes":81,"videoLengthSeconds":12}],"readings":[{"readingIndex":0,"readingTitle":"Texas XSS transmitting deposit","readingLengthMinutes":66}],"exercises":[{"exerciseIndex":0,"exerciseTitle":"impactful quantify open-source interface","exerciseLengthMinutes":65}],"lessonIndex":0,"lessonTitle":"Pizza","videosLength":48,"readingsLength":44,"exercisesLength":3,"lessonDescription":"Eaque similique voluptatum voluptatibus et sint. Rerum voluptatem ut. Laudantium laborum aut rerum vel non laudantium eligendi dolor. Non qui aspernatur sunt.","hoursToCompleteLesson":8}],"weekIndex":0,"hoursToCompleteWeek":66}],"hoursToCompleteCourse":3333388888};