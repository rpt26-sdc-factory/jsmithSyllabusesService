# Extended API Endpoints

## Create
returns a status code of 201 if successfully created

## Read
returns a status code of 200 if request received


* GET /api/hoursToComplete/:courseNumber

```
{ hoursToCompleteCourse: Number }
```
* GET /api/syllabus/:courseNumber

```
{
  id: Number,
  weeks: [{
	  weekNumber: Number,
	  lessons: [{
  	  hoursToCompleteLesson: Number,
  	  title: String,
  	  description: String,
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
        exerciseLengthMinutes: String
  	  }],
  	  exercisesLength: Number
	  }]
	}],
	hoursToCompleteCourse: Number
}
```



## Update

## Delete