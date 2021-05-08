const syllabusesGenerator = require('../db/data/syllabusesGenerator.js');

// previously syllabusData was a .json file; now it is an array of json objects
const syllabusesData = syllabusesGenerator.generateSyllabi(0, 5);

// PREVIOUSLY EXISTING TEST SUITE
describe('syllabusesGenerator outputs data in the proper format', () => {
  test('syllabusesData should be an object with the correct properties', () => {
    expect(typeof syllabusesData).toBe('object');
    expect(typeof syllabusesData[0]).toBe('object');
    expect(typeof syllabusesData[0].id).toBe('number');
    expect(Array.isArray(syllabusesData[0].weeks)).toBe(true);
    expect(typeof syllabusesData[0].weeks[0].weekIndex).toBe('number');
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons)).toBe(true);
    expect(typeof syllabusesData[0].weeks[0].lessons[0].hoursToCompleteLesson).toBe('number');
    expect(typeof syllabusesData[0].weeks[0].lessons[0].lessonTitle).toBe('string');
    expect(typeof syllabusesData[0].weeks[0].lessons[0].lessonDescription).toBe('string');
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].videos)).toBe(true);
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].readings)).toBe(true);
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].exercises)).toBe(true);
    expect(syllabusesData.length).toBe(5);
  });
});

// EXPANDED TEST SUITE
describe('Syllabi', () => {
  it('generates the number of syllabi specified', () => {
    let syllabi = syllabusesGenerator.generateSyllabi(0, 11);
    expect(syllabi.length).toBe(11);
  });
});

describe('Syllabus', () => {
  it('generates a syllabus with id, weeks, and hoursToCompleteCourse', () => {
    let syllabus = syllabusesGenerator.generateSyllabus(1);
    expect(syllabus.id).toBeTruthy();
    expect(syllabus.weeks).toBeTruthy();
    expect(syllabus.hoursToCompleteCourse).toBeTruthy();
  });
  it('has the id specified', () => {
    let syllabus = syllabusesGenerator.generateSyllabus(11);
    expect(syllabus.id).toBe(11);
    expect(typeof syllabus.id).toBe('number');
  });
  it('has an array of weeks', () => {
    let syllabus = syllabusesGenerator.generateSyllabus(1);
    let weeksLength = syllabus.weeks.length;
    expect(Array.isArray(syllabus.weeks)).toBeTruthy();
    expect(weeksLength >= 1 && weeksLength <= 2).toBeTruthy();
  });
  it('has a randomly generated number of hours to complete the course', () => {
    let syllabus = syllabusesGenerator.generateSyllabus(1);
    expect(typeof syllabus.hoursToCompleteCourse).toBe('number');
    expect(syllabus.hoursToCompleteCourse >= 1 && syllabus.hoursToCompleteCourse <= 500).toBeTruthy();
  });
});

describe('Weeks', () => {
  it('generates the number of weeks specified', () => {
    let weeks = syllabusesGenerator.generateWeeks(7);
    expect(weeks.length).toBe(7);
  });
});

describe('Week', () => {
  it('has an index, an array of lessons, and a random completion time', () => {
    let week = syllabusesGenerator.generateWeek(1);
    expect(week.weekIndex).toBeTruthy();
    expect(week.lessons).toBeTruthy();
    expect(week.hoursToCompleteWeek).toBeTruthy();
  });

  it('has the index specified', () => {
    let week = syllabusesGenerator.generateWeek(21);
    expect(week.weekIndex).toBe(21);
    expect(typeof week.weekIndex).toBe('number');
  });

  it('has an array of lessons', () => {
    let week = syllabusesGenerator.generateWeek(1);
    expect(Array.isArray(week.lessons)).toBeTruthy();
    expect(week.lessons.length).toBe(1);
  });

  it('has a randomly generated number of hours to complete the week', () => {
    let week = syllabusesGenerator.generateWeek(1);
    expect(typeof week.hoursToCompleteWeek).toBe('number');
    expect(week.hoursToCompleteWeek >= 1 && week.hoursToCompleteWeek <= 100);
  });
});

describe('Lessons', () => {
  it('generates the number of lessons specified', () => {
    let lessons = syllabusesGenerator.generateLessons(3);
    expect(lessons.length).toBe(3);
  });
});

describe('Lesson', () => {
  it('contains an index, title, length, description, videos, readings, exercises, and their respective lengths', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(lesson.lessonIndex).toBeTruthy();
    expect(lesson.hoursToCompleteLesson).toBeTruthy();
    expect(lesson.lessonTitle).toBeTruthy();
    expect(lesson.lessonDescription).toBeTruthy();
    expect(lesson.videos).toBeTruthy();
    expect(lesson.videosLength).toBeTruthy();
    expect(lesson.readings).toBeTruthy();
    expect(lesson.readingsLength).toBeTruthy();
    expect(lesson.exercises).toBeTruthy();
    expect(lesson.exercisesLength).toBeTruthy();
  });

  it('contains the index specified', () => {
    let lesson = syllabusesGenerator.generateLesson(33);
    expect(typeof lesson.lessonIndex).toBe('number');
    expect(lesson.lessonIndex).toBe(33);
  });

  it('has a title with one to four words', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    let title = lesson.lessonTitle;
    let titleLength = title.split(' ').length;
    expect(titleLength >= 1 && titleLength <= 4).toBeTruthy();
    expect(typeof title).toBe('string');
  });

  it('has a random duration', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(typeof lesson.hoursToCompleteLesson).toBe('number');
    expect(lesson.hoursToCompleteLesson >= 1 && lesson.hoursToCompleteLesson <= 10).toBeTruthy();
  });

  it('has a random duration for videos', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(typeof lesson.videosLength).toBe('number');
    expect(lesson.videosLength >= 1 && lesson.videosLength <= 60).toBeTruthy();
  });

  it('has a random duration for readings', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(typeof lesson.readingsLength).toBe('number');
    expect(lesson.readingsLength >= 1 && lesson.readingsLength <= 60).toBeTruthy();
  });

  it('has a random duration for exercises', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(typeof lesson.exercisesLength).toBe('number');
    expect(lesson.exercisesLength >= 1 && lesson.exercisesLength <= 60).toBeTruthy();
  });

  it('has a random duration for exercises', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(typeof lesson.exercisesLength).toBe('number');
    expect(lesson.exercisesLength >= 1 && lesson.exercisesLength <= 60).toBeTruthy();
  });

  it('has an array of videos containing one video', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(Array.isArray(lesson.videos)).toBeTruthy();
    expect(lesson.videos.length).toBe(1);
  });

  it('has an array of readings containing one reading', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(Array.isArray(lesson.readings)).toBeTruthy();
    expect(lesson.readings.length).toBe(1);
  });

  it('has an array of exercises containing one exercise', () => {
    let lesson = syllabusesGenerator.generateLesson(1);
    expect(Array.isArray(lesson.exercises)).toBeTruthy();
    expect(lesson.exercises.length).toBe(1);
  });
});

describe('Videos', () => {
  it('generates the number of videos specified', () => {
    let videos = syllabusesGenerator.generateVideos(2);
    expect(videos.length).toBe(2);
  });
});

describe('Video', () => {
  it('contains an index, title, and two lengths (min and seconds)', () => {
    let video = syllabusesGenerator.generateVideo(1);
    expect(video.videoIndex).toBeTruthy();
    expect(video.videoTitle).toBeTruthy();
    expect(video.videoLengthMinutes).toBeTruthy();
    expect(video.videoLengthSeconds).toBeTruthy();
  });

  it('contains the videoIndex specified', () => {
    let video = syllabusesGenerator.generateVideo(666);
    expect(typeof video.videoIndex).toBe('number');
    expect(video.videoIndex).toBe(666);
  });

  it('has a title with three words', () => {
    let video = syllabusesGenerator.generateVideo(1);
    let title = video.videoTitle;
    let titleLength = title.split(' ').length;
    expect(titleLength).toBe(3);
    expect(typeof title).toBe('string');
  });

  it('has a random seconds duration', () => {
    let video = syllabusesGenerator.generateVideo(1);
    expect(typeof video.videoLengthSeconds).toBe('number');
    expect(video.videoLengthSeconds >= 1 && video.videoLengthSeconds <= 59).toBeTruthy();
  });

  it('has a random minutes duration', () => {
    let video = syllabusesGenerator.generateVideo(1);
    expect(typeof video.videoLengthMinutes).toBe('number');
    expect(video.videoLengthMinutes >= 1 && video.videoLengthMinutes <= 90).toBeTruthy();
  });
});

describe('Readings', () => {
  it('generates the number of readings specified', () => {
    let readings = syllabusesGenerator.generateReadings(10);
    expect(readings.length).toBe(10);
  });
});

describe('Reading', () => {
  it('contains an index, title, and length', () => {
    let reading = syllabusesGenerator.generateReading(1);
    expect(reading.readingIndex).toBeTruthy();
    expect(reading.readingTitle).toBeTruthy();
    expect(reading.readingLengthMinutes).toBeTruthy();
  });

  it('contains the readingIndex specified', () => {
    let reading = syllabusesGenerator.generateReading(198);
    expect(typeof reading.readingIndex).toBe('number');
    expect(reading.readingIndex).toBe(198);
  });

  it('has a title with between one and four words', () => {
    let reading = syllabusesGenerator.generateReading(1);
    let title = reading.readingTitle;
    let titleLength = title.split(' ').length;
    expect(titleLength >= 1 && titleLength <= 4).toBeTruthy();
    expect(typeof title).toBe('string');
  });

  it('has a random duration', () => {
    let reading = syllabusesGenerator.generateReading(1);
    expect(typeof reading.readingLengthMinutes).toBe('number');
    expect(reading.readingLengthMinutes >= 1 && reading.readingLengthMinutes <= 75).toBeTruthy();
  });
});

describe('Exercises', () => {
  it('generates the number of exercises specified', () => {
    let exercises = syllabusesGenerator.generateExercises(4);
    expect(exercises.length).toBe(4);
  });
});

describe('Exercise', () => {
  it('contains an index, title, and length', () => {
    let exercise = syllabusesGenerator.generateExercise(1);
    expect(exercise.exerciseIndex).toBeTruthy();
    expect(exercise.exerciseTitle).toBeTruthy();
    expect(exercise.exerciseLengthMinutes).toBeTruthy();
  });

  it('contains the exerciseIndex specified', () => {
    let exercise = syllabusesGenerator.generateExercise(56);
    expect(typeof exercise.exerciseIndex).toBe('number');
    expect(exercise.exerciseIndex).toBe(56);
  });

  it('has a title', () => {
    let exercise = syllabusesGenerator.generateExercise(1);
    let title = exercise.exerciseTitle;
    expect(typeof title).toBe('string');
  });

  it('has a random duration', () => {
    let exercise = syllabusesGenerator.generateExercise(1);
    expect(typeof exercise.exerciseLengthMinutes).toBe('number');
    expect(exercise.exerciseLengthMinutes >= 1 && exercise.exerciseLengthMinutes <= 75).toBeTruthy();
  });
});