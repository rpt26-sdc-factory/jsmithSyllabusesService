# Project Name

> Ingenuity

## Related Projects

  - https://github.com/Ingenuity-rpt26/shane-service-about
  - https://github.com/Ingenuity-rpt26/vinayService1
  - https://github.com/Ingenuity-rpt26/jsmithSyllabusesService
  - https://github.com/Ingenuity-rpt26/Grant--Service_1
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/shane-service-summary
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/jsmithImages
  - https://github.com/Ingenuity-rpt26/jsmithInstructorsService

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
>npm install

Ensure database is running and URL and proxy are correct in ./.env



> npm run seed


## Requirements

Syllabuses relies on Images and Reviews services for data.

Ensure URL's and ports are correct in ./client/components/initial/state.js

> npm run build (as necessary)

## Development

Each course has a syllabus.  Each syllabus has one or more weeks.  Each week has one or more lessons.  Each lesson has one or more videos, readings, and exercises.

<h3>Component Flow:</h3>

-> Syllabus
* -> Header -> Rating

* -> Weeks =>  Week

* * -> WeekTitle

* * => Lesson

* * * -> LessonHeader

* * * -> LessonTitle

* * * -> LessonOverview;

* * * -> Videos => Video

* * * -> Readings => Reading

* * * -> Exercises => Exercise


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

