# Extended API Endpoints

## Create
returns a status code of 201 if successfully created; returns a status code of 405 if not successfully created

* POST /api/syllabus/:courseNumber
```
req.params.courseNumber // is the id of the entry being created
req.body // is a JSON object containing the data to be inserted into the database
```

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
returns a status code of 202 if database successfully updated; returns a status code of 405 if not successful
* PUT /api/syllabus/:courseNumber
```
req.params.courseNumber // is the id of the entry being updated
req.body // is a JSON object containing the updated information
```

## Delete
returns a status code of 202 if successfully deleted; returns a status code of 404 if not successfully deleted or no such entry with that courseNumber exists in the database
* DELETE /api/syllabus/:courseNumber
```
req.params.courseNumber // is the id of the entry being deleted
```