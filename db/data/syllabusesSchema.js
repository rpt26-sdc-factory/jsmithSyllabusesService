const mongoose = require('mongoose');
const { Schema } = mongoose;

const syllabusSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  weeks: [{
    weekIndex: Number,
    lessons: [{
      lessonIndex: Number,
      hoursToCompleteLesson: Number,
      lessonTitle: String,
      lessonDescription: String,
      videos: [{
        videoIndex: Number,
        videoTitle: String,
        videoLengthMinutes: Number,
        videoLengthSeconds: Number
      }],
      videosLength: Number,
      readings: [{
        readingIndex: Number,
        readingTitle: String,
        readingLengthMinutes: Number
      }],
      readingsLength: Number,
      exercises: [{
        exerciseIndex: Number,
        exerciseTitle: String,
        exerciseLengthMinutes: Number
      }],
      exercisesLength: Number
    }],
    hoursToCompleteWeek: Number
  }],
  hoursToCompleteCourse: Number
});

module.exports = syllabusSchema;