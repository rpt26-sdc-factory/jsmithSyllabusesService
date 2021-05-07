const faker = require('faker');
const fs = require('fs');


// BENCHMARKING START
let bulkGenerationAndInsertion = [10, 100, 1000, 10000];
console.log('BENCHMARKING CURRENT GENERATION SCRIPT:');
for (let num of bulkGenerationAndInsertion) {
  var start = new Date().getTime();
  generateSyllabi(0, num);
  var end = new Date().getTime();
  console.log(`For num of ${num} the elapsed time was: "${end - start}"`);
}
// BENCHMARKING END


function generateSyllabi(startIndex, numSyllabiToCreate) {
  let syllabi = [];
  let endIndex = startIndex + numSyllabiToCreate;
  for (let id = startIndex; id < endIndex; id++) {
    syllabi.push(generateSyllabus.call(null, id));
  }
  return syllabi;
}

function generateSyllabus(id) {
  let numberOfWeeks = Math.ceil(Math.random() * 4);
  let hoursToCompleteCourse = Math.floor(Math.random() * (500)) + 1;
  let weeks = generateWeeks(numberOfWeeks);
  let syllabus = {
    id,
    weeks,
    hoursToCompleteCourse
  };
  return syllabus;
}

function generateWeeks(numberOfWeeks) {
  let weeks = [];
  for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    weeks.push(generateWeek.call(null, weekIndex));
  }
  return weeks;
}

function generateWeek(weekIndex) {
  let numberOfLessonsThisWeek = Math.ceil(Math.random() * 2);
  let hoursToCompleteWeek = Math.floor(Math.random() * (100)) + 1;
  let lessons = generateLessons(numberOfLessonsThisWeek);

  let week = {
    weekIndex,
    lessons,
    hoursToCompleteWeek
  }

  return week;
}

function generateLessons(numberOfLessonsThisWeek) {
  let lessons = [];
  // let starters = [
  //   'Basics of',
  //   'Steps to',
  //   'Ethics of',
  //   'Skills for',
  //   'What is',
  //   'Building',
  //   'Types of'
  // ];
  for (let lessonIndex = 0; lessonIndex <= numberOfLessonsThisWeek; lessonIndex++) {
    lessons.push(generateLesson.call(null, lessonIndex));
  }
  return lessons;
}

function generateLesson(lessonIndex) {
  // let promises = [];
  let hoursToCompleteLesson = 0;

  let lessonDescription = faker.lorem.paragraph();
  let numberOfFakeWords = Math.ceil(Math.random() * 4);

  //create lessonTitle
  let lessonTitle = faker.random.words(numberOfFakeWords);

  let numberOfVideos = Math.ceil(Math.random() * 2);
  let numberOfReadings = Math.ceil(Math.random() * 3);
  let numberOfExercises = Math.ceil(Math.random() * 4);

  let videosSeconds = Math.floor(Math.random() * (60));
  let videosLength = Math.floor(Math.random() * (60)); //in minutes
  let readingsLength = Math.floor(Math.random() * (60)); //in minutes
  let exercisesLength = Math.floor(Math.random() * (60)); //in minutes

  // VIDEOS
  let videos = generateVideos.call(null, numberOfVideos);

  // READINGS
  let readings = generateReadings.call(null, numberOfReadings);

  // EXERCISES
  let exercises = generateExercises.call(null, numberOfExercises);



  let lesson = {
    lessonIndex,
    hoursToCompleteLesson,
    lessonTitle,
    lessonDescription,
    videos,
    videosLength,
    readings,
    readingsLength,
    exercises,
    exercisesLength
  }

  return lesson;

  // return Promise.resolve(lesson);
}

function generateVideos(numberOfVideos) {
  let videos = [];
  for (let videoIndex = 0; videoIndex < numberOfVideos; videoIndex++) {
    videos.push(generateVideo.call(null, videoIndex));
  }
  return videos;
}

function generateVideo(videoIndex) {
  let videoTitle = faker.company.catchPhraseAdjective() + ' ' + faker.hacker.verb() + ' ' + faker.hacker.noun();

  let video = {
    videoIndex,
    videoTitle,
    videoLengthMinutes: Math.ceil(Math.random() * 90),
    videoLengthSeconds: Math.ceil(Math.random() * 58)
  };

  return video;
}

function generateReadings(numberOfReadings) {
  let readings = [];
  for (let readingIndex = 0; readingIndex < numberOfReadings; readingIndex++) {
    readings.push(generateReading.call(null, readingIndex));
  }
  return readings;
}

function generateReading(readingIndex) {
  let readingLengthMinutes = Math.ceil(Math.random() * 75);
  let numberOfFakeWords = Math.ceil(Math.random() * 4);

  let readingTitle = faker.random.words(numberOfFakeWords);

  // for (let i = 0; i <= numberOfFakeWords; i++) {
  //   readingTitle = readingTitle.concat(faker.random.word(), ' ');
  // }
  // readingTitle = readingTitle.trimEnd();

  let reading = {
    readingIndex,
    readingTitle,
    readingLengthMinutes
  };
  return reading;
}

function generateExercises(numberOfExercises) {
  let exercises = [];
  // let starters = [
  //   'Basics of',
  //   'Steps to',
  //   'Ethics of',
  //   'Skills for',
  //   'What is',
  //   'Building',
  //   'Types of'
  // ];

  for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
    exercises.push(generateExercise.call(null, exerciseIndex));
  }
  return exercises;
};

function generateExercise(exerciseIndex) {
  // let starterIndex = Math.floor(Math.random() * starters.length);
  let exerciseTitle = faker.company.catchPhraseDescriptor() + ' ' + faker.hacker.verb() + ' ' + faker.hacker.adjective() + ' ' + faker.hacker.noun();
  let exerciseLengthMinutes = Math.ceil(Math.random() * 75);
  let exercise = {
    exerciseIndex,
    exerciseTitle,
    exerciseLengthMinutes
  };
  return exercise;
}

// CONSOLE TESTING

// let startingIndex = Number.parseInt(process.argv[2]);
// let numOfEntries = Number.parseInt(process.argv[3]);

// console.log(JSON.stringify(generateSyllabi(startingIndex, numOfEntries)));