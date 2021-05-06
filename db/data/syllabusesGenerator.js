const faker = require('faker');
const fs = require('fs');

// const generateSyllabuses = (numEntriesCreated) => {
//   let syllabuses = [];

//   //creates syllabuses for each of the 100 courses
//   for (let id = 1; id <= numEntriesCreated; id++) {
//     var numberOfWeeks = Math.ceil(Math.random() * 4);
//     let hoursToCompleteCourse = 0;
//     let weeks = [];
//     let starters = [
//       'Basics of',
//       'Steps to',
//       'Ethics of',
//       'Skills for',
//       'What is',
//       'Building',
//       'Types of'
//     ];

//     //creates 1 to 4 weeks per course
//     for (let weekNumber = 1; weekNumber <= numberOfWeeks; weekNumber++) {
//       let hoursToCompleteWeek = 0;
//       let lessons = [];
//       let lessonsThisWeek = Math.ceil(Math.random() * 2);



//       //creates 1 to 3 lessons per week
//       for (let lesson = 0; lesson <= lessonsThisWeek; lesson++) {
//         let starter = starters[Math.floor(Math.random() * starters.length)];
//         let lessonTitle = starter;
//         let lessonDescription = faker.lorem.paragraph();
//         let numberOfFakeWords = Math.ceil(Math.random() * 4);
//         let numberOfVideos = Math.ceil(Math.random() * 2);
//         let videos = [];
//         let videosSeconds = 0;
//         let videosLength = 0; //in minutes
//         let numberOfReadings = Math.ceil(Math.random() * 3);
//         let readings = [];
//         let readingsLength = 0; //in minutes
//         let numberOfExercises = Math.ceil(Math.random() * 4);
//         let exercises = [];
//         let exercisesLength = 0; //in minutes
//         let minutesToComplete = 0;
//         let hoursToCompleteLesson;

//         //create lessonTitle
//         for (let i = 0; i <= numberOfFakeWords; i++) {
//           lessonTitle = lessonTitle.concat(' ', faker.random.word());
//         }

//         //creates 1 to 3 videos per week
//         for (let videoIndex = 0; videoIndex <= numberOfVideos; videoIndex++) {
//           let videoTitle = faker.company.catchPhraseAdjective();
//           videoTitle = videoTitle.charAt(0).toUpperCase() + videoTitle.slice(1).concat(' ', faker.hacker.verb(), ' ', faker.hacker.noun());

//           let video = {
//             videoIndex,
//             videoTitle,
//             videoLengthMinutes: Math.ceil(Math.random() * 90),
//             videoLengthSeconds: Math.ceil(Math.random() * 58)
//           };
//           videos.push(video);
//           videosSeconds += video.videoLengthSeconds;
//           videosLength += video.videoLengthMinutes;
//         }
//         videosLength += (videosSeconds -= videosSeconds % 60) / 60;

//         //creates 1 to 4 readings per week
//         for (let readingIndex = 0; readingIndex <= numberOfReadings; readingIndex++) {
//           let readingLengthMinutes = Math.ceil(Math.random() * 75);
//           let readingTitle = '';
//           for (let i = 0; i <= numberOfFakeWords; i++) {
//             readingTitle = readingTitle.concat(faker.random.word(), ' ');
//           }
//           readingTitle = readingTitle.trimEnd();
//           let reading = {
//             readingIndex,
//             readingTitle,
//             readingLengthMinutes
//           };
//           readings.push(reading);
//           readingsLength += readingLengthMinutes;
//         }

//         //creates 1 to 5 exercises per week
//         for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
//           let starterIndex = Math.floor(Math.random() * starters.length);
//           let exerciseTitle = starters[starterIndex].concat(' ', faker.hacker.verb(), ' ', faker.hacker.adjective(), ' ', faker.hacker.noun());
//           let exerciseLengthMinutes = Math.ceil(Math.random() * 75);
//           let exercise = {
//             exerciseIndex,
//             exerciseTitle,
//             exerciseLengthMinutes
//           };
//           exercises.push(exercise);
//           exercisesLength += exerciseLengthMinutes;
//         }

//         //calculate times
//         minutesToComplete += videosLength;
//         minutesToComplete += readingsLength;
//         minutesToComplete += exercisesLength;
//         if (minutesToComplete % 60 < 30) {
//           minutesToComplete -= minutesToComplete % 60;
//         } else {
//           minutesToComplete += minutesToComplete % 60;
//         }
//         hoursToCompleteLesson = Math.floor(minutesToComplete / 60);
//         hoursToCompleteWeek += hoursToCompleteLesson;

//         //bring together elements of a lesson and push to lessons.
//         let lessonSyllabus = {
//           hoursToCompleteLesson,
//           lessonTitle,
//           lessonDescription,
//           videos,
//           videosLength,
//           readings,
//           readingsLength,
//           exercises,
//           exercisesLength
//         };
//         lessons.push(lessonSyllabus);
//       }

//       //bring together all elements of a weekly syllabus and push
//       let weekSyllabus = {
//         weekNumber,
//         lessons
//       };
//       weeks.push(weekSyllabus);
//       hoursToCompleteCourse += hoursToCompleteWeek;
//     }

//     //combines syllabus elements for each course and pushes to syllabuses
//     let syllabus = {
//       id,
//       weeks,
//       hoursToCompleteCourse
//     };
//     syllabuses.push(syllabus);
//   }

//   // fs.writeFileSync('./db/data/syllabuses.json', JSON.stringify(syllabuses, null, '\t'));
//   // const syllabusesInserter = require('./syllabusesInserter.js');
//   // syllabusesInserter();
//   return;
// };

// generateSyllabuses();

// BENCHMARKING START
// let bulkGenerationAndInsertion = [10, 100, 1000, 10000];
// console.log('BENCHMARKING CURRENT GENERATION SCRIPT:');
// for (let num of bulkGenerationAndInsertion) {
//   var start = new Date().getTime();
//   generateSyllabi(0, num);
//   var end = new Date().getTime();
//   console.log(`For num of ${num} the elapsed time was: "${end - start}"`);
// }
// BENCHMARKING END


function generateSyllabi(startIndex, numSyllabiToCreate) {
  let promises = [];
  let endIndex = startIndex + numSyllabiToCreate;
  for (let id = startIndex; id < endIndex; id++) {
    promises.push(generateSyllabus.call(null, id));
  }
  return Promise.all(promises);
}

function generateSyllabus(id) {
  let numberOfWeeks = Math.ceil(Math.random() * 4);
  let hoursToCompleteCourse = Math.floor(Math.random() * (500)) + 1;
  let returnValue = generateWeeks(numberOfWeeks).then(weeks => {
    // for (let week of weeks) {
    //   hoursToCompleteCourse += week.hoursToCompleteWeek;
    // }
  let syllabus = {
    id,
    weeks,
    hoursToCompleteCourse
  };
  return syllabus;
  }).catch(err => console.log('error while generating weeks: ', err));

  return Promise.resolve(returnValue);
}

function generateWeeks(numberOfWeeks) {
  let promises = [];
  for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
    promises.push(generateWeek.call(null, weekIndex));
  }
  return Promise.all(promises);
}

function generateWeek(weekIndex) {
  let numberOfLessonsThisWeek = Math.ceil(Math.random() * 2);
  let hoursToCompleteWeek = Math.floor(Math.random() * (100)) + 1;
  let returnVal = generateLessons(numberOfLessonsThisWeek).then(lessons => {
    // for (let lesson of lessons) {
    //   hoursToCompleteWeek += lesson.hoursToCompleteLesson;
    // }
    let week = {
      weekIndex,
      lessons,
      hoursToCompleteWeek
    }
    return week;
  }).catch(err => console.log('error while generating lessons: ', err));

  return Promise.resolve(returnVal);
}

function generateLessons(numberOfLessonsThisWeek) {
  let promises = [];
  let starters = [
    'Basics of',
    'Steps to',
    'Ethics of',
    'Skills for',
    'What is',
    'Building',
    'Types of'
  ];
  for (let lessonIndex = 0; lessonIndex <= numberOfLessonsThisWeek; lessonIndex++) {
    promises.push(generateLesson.call(null, lessonIndex, starters));
  }
  return Promise.all(promises);
}

function generateLesson(lessonIndex, starters) {
  let promises = [];
  let hoursToCompleteLesson = 0;

  let lessonDescription = faker.lorem.paragraph();
  let numberOfFakeWords = Math.ceil(Math.random() * 4);

  //create lessonTitle
  let lessonTitle = starters[Math.floor(Math.random() * starters.length)];
  for (let i = 0; i <= numberOfFakeWords; i++) {
    lessonTitle = lessonTitle.concat(' ', faker.random.word());
  }

  let numberOfVideos = Math.ceil(Math.random() * 2);
  let numberOfReadings = Math.ceil(Math.random() * 3);
  let numberOfExercises = Math.ceil(Math.random() * 4);

  let videosSeconds = Math.floor(Math.random() * (60));
  let videosLength = Math.floor(Math.random() * (60)); //in minutes
  let readingsLength = Math.floor(Math.random() * (60)); //in minutes
  let exercisesLength = Math.floor(Math.random() * (60)); //in minutes

  // VIDEOS
  let videos = [];
  promises.push(generateVideos.call(null, numberOfVideos).then(generated => {
    videos = generated;
    // for (let video of generated) {
    //   videosSeconds += video.videoLengthSeconds;
    //   videosLength += video.videoLengthMinutes;
    // }
    // videosLength += (videosSeconds -= videosSeconds % 60) / 60;
    return Promise.resolve(generated);
  }).catch(err => console.log('err while generating videos: ', err)));

  // READINGS
  let readings = [];
  promises.push(generateReadings.call(null, numberOfReadings).then(generated => {
    readings = generated;
    // for (let reading of generated) {
    //   readingsLength += reading.readingLengthMinutes
    // }
    return Promise.resolve(generated);
  }).catch(err => console.log('error while generating readings: ', err)));

  // EXERCISES
  let exercises = [];
  promises.push(generateExercises.call(null, numberOfExercises).then(generated => {
    exercises = generated;
    // for (let exercise of generated) {
    //   exercisesLength += exercise.exerciseLengthMinutes;
    // }
    return Promise.resolve(generated);
  }).catch(err => console.log('error while generating exercises: ', err)));

  let minutesToComplete = 0;

  return Promise.all(promises).then(() => {
    // minutesToComplete = videosLength + readingsLength + exercisesLength;
    // if (minutesToComplete % 60 < 30) {
    //   minutesToComplete -= minutesToComplete % 60;
    // } else {
    //   minutesToComplete += minutesToComplete % 60;
    // }
    // hoursToCompleteLesson = Math.floor(minutesToComplete / 60);

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
  }).catch(err => console.log('error while making lessons: ', err));


  // return Promise.resolve(lesson);
}

function generateVideos(numberOfVideos) {
  let promises = [];
  for (let videoIndex = 0; videoIndex < numberOfVideos; videoIndex++) {
    promises.push(generateVideo.call(null, videoIndex));
  }
  return Promise.all(promises);
}

function generateVideo(videoIndex) {
  let videoTitle = faker.company.catchPhraseAdjective();
  videoTitle = videoTitle.charAt(0).toUpperCase() + videoTitle.slice(1).concat(' ', faker.hacker.verb(), ' ', faker.hacker.noun());

  let video = {
    videoIndex,
    videoTitle,
    videoLengthMinutes: Math.ceil(Math.random() * 90),
    videoLengthSeconds: Math.ceil(Math.random() * 58)
  };

  return Promise.resolve(video);
}

function generateReadings(numberOfReadings) {
  let promises = [];
  for (let readingIndex = 0; readingIndex < numberOfReadings; readingIndex++) {
    promises.push(generateReading.call(null, readingIndex));
  }
  return Promise.all(promises);
}

function generateReading(readingIndex) {
  let readingLengthMinutes = Math.ceil(Math.random() * 75);
  let numberOfFakeWords = Math.ceil(Math.random() * 4);

  let readingTitle = '';

  for (let i = 0; i <= numberOfFakeWords; i++) {
    readingTitle = readingTitle.concat(faker.random.word(), ' ');
  }
  readingTitle = readingTitle.trimEnd();

  let reading = {
    readingIndex,
    readingTitle,
    readingLengthMinutes
  };
  return Promise.resolve(reading);
}

function generateExercises(numberOfExercises) {
  let promises = [];
  let starters = [
    'Basics of',
    'Steps to',
    'Ethics of',
    'Skills for',
    'What is',
    'Building',
    'Types of'
  ];

  for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
    promises.push(generateExercise.call(null, exerciseIndex, starters));
  }
  return Promise.all(promises);
};

function generateExercise(exerciseIndex, starters) {
  let starterIndex = Math.floor(Math.random() * starters.length);
  let exerciseTitle = starters[starterIndex].concat(' ', faker.hacker.verb(), ' ', faker.hacker.adjective(), ' ', faker.hacker.noun());
  let exerciseLengthMinutes = Math.ceil(Math.random() * 75);
  let exercise = {
    exerciseIndex,
    exerciseTitle,
    exerciseLengthMinutes
  };
  return Promise.resolve(exercise);
}

// CONSOLE TESTING
// generateSyllabi(0, 1).then(results => {
//   console.log(JSON.stringify(results));
// }).catch(err => console.log(err));

let startingIndex = Number.parseInt(process.argv[2]);
let numOfEntries = Number.parseInt(process.argv[3]);

generateSyllabi(startingIndex, numOfEntries).then(results => {
  console.log(JSON.stringify(results));
}).catch(err => {
  console.log(err);
});