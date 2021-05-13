const faker = require('faker/locale/en');
const fs = require('fs');

// BENCHMARKING START
// let bulkGenerationAndInsertion = [10, 100, 1000, 10000];
// let bulkGenerationAndInsertion = [500000];
// console.log('BENCHMARKING CURRENT GENERATION SCRIPT:');
// for (let num of bulkGenerationAndInsertion) {
//   var start = new Date().getTime();
//   var syllabi = generateSyllabi(0, num);
//   var end = new Date().getTime();
//   console.log(`For num of ${num} the elapsed time was: "${end - start}"`);
// }
// BENCHMARKING END

// CONSOLE TESTING
// let startingIndex = Number.parseInt(process.argv[2]);
// let numOfEntries = Number.parseInt(process.argv[3]);
// console.log(JSON.stringify(generateSyllabi(startingIndex, numOfEntries)));


function generateSyllabi(startIndex, numSyllabiToCreate) {
  let syllabi = [];
  let endIndex = startIndex + numSyllabiToCreate;
  for (let id = startIndex; id < endIndex; id++) {
    syllabi.push(generateSyllabus(id));
  }
  return syllabi;
}

function generateSyllabus(id) {
  // 1 or 2 weeks will be created
  let numberOfWeeks = Math.floor(Math.random() * 2 + 1);
  let syllabus = {
    id: id,
    weeks: generateWeeks(numberOfWeeks),
    hoursToCompleteCourse: Math.floor(Math.random() * 500 + 1)
  };
  return syllabus;
}

function generateWeeks(numberOfWeeks) {
  let weeks = [];
  for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    weeks.push(generateWeek(weekIndex));
  }
  return weeks;
}

function generateWeek(weekIndex) {
  // need to remove the number of secondary records in order to generate 10 million primary records in under 30 minutes
  // let numberOfLessonsThisWeek = Math.floor(Math.random() * 2 + 1);

  let week = {
    weekIndex: weekIndex,
    lessons: generateLessons(1),
    hoursToCompleteWeek: Math.floor(Math.random() * 100 + 1)
  }

  return week;
}

function generateLessons(numberOfLessonsThisWeek) {
  let lessons = [];

  for (let lessonIndex = 0; lessonIndex < numberOfLessonsThisWeek; lessonIndex++) {
    lessons.push(generateLesson(lessonIndex));
  }
  return lessons;
}

function generateLesson(lessonIndex) {
  // 1 to 4 fake words
  let numberOfFakeWords = Math.floor(Math.random() * 4 + 1);

  // let numberOfVideos = Math.floor(Math.random() * 2 + 1);
  // let numberOfReadings = Math.floor(Math.random() * 3 + 1);
  // let numberOfExercises = Math.floor(Math.random() * 4 + 1);

  let lesson = {
    lessonIndex: lessonIndex,
    hoursToCompleteLesson: Math.floor(Math.random() * 10 + 1),
    lessonTitle: faker.random.words(numberOfFakeWords),
    lessonDescription: faker.lorem.paragraph(),
    videos: generateVideos(1),
    videosLength: Math.floor(Math.random() * 60 + 1),
    readings: generateReadings(1),
    readingsLength: Math.floor(Math.random() * 60 + 1),
    exercises: generateExercises(1),
    exercisesLength: Math.floor(Math.random() * 60 + 1)
  }

  return lesson;
}

function generateVideos(numberOfVideos) {
  let videos = [];
  for (let videoIndex = 0; videoIndex < numberOfVideos; videoIndex++) {
    videos.push(generateVideo(videoIndex));
  }
  return videos;
}

function generateVideo(videoIndex) {
  let video = {
    videoIndex: videoIndex,
    videoTitle: faker.company.catchPhraseAdjective() + ' ' + faker.hacker.verb() + ' ' + faker.hacker.noun(),
    videoLengthMinutes: Math.floor(Math.random() * 90 + 1),
    videoLengthSeconds: Math.floor(Math.random() * 59 + 1)
  };

  return video;
}

function generateReadings(numberOfReadings) {
  let readings = [];
  for (let readingIndex = 0; readingIndex < numberOfReadings; readingIndex++) {
    readings.push(generateReading(readingIndex));
  }
  return readings;
}

function generateReading(readingIndex) {
  let numberOfFakeWords = Math.floor(Math.random() * 4 + 1);

  let reading = {
    readingIndex: readingIndex,
    readingTitle: faker.random.words(numberOfFakeWords),
    readingLengthMinutes: Math.floor(Math.random() * 75 + 1)
  };
  return reading;
}

function generateExercises(numberOfExercises) {
  let exercises = [];

  for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
    exercises.push(generateExercise(exerciseIndex));
  }
  return exercises;
};

function generateExercise(exerciseIndex) {
  let exercise = {
    exerciseIndex: exerciseIndex,
    exerciseTitle: faker.company.catchPhraseDescriptor() + ' ' + faker.hacker.verb() + ' ' + faker.hacker.adjective() + ' ' + faker.hacker.noun(),
    exerciseLengthMinutes:  Math.floor(Math.random() * 75 + 1)
  };
  return exercise;
}

module.exports = {
  generateExercise,
  generateExercises,
  generateReading,
  generateReadings,
  generateVideo,
  generateVideos,
  generateLesson,
  generateLessons,
  generateWeek,
  generateWeeks,
  generateSyllabus,
  generateSyllabi
}