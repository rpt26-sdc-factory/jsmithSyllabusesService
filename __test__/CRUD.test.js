import 'regenerator-runtime/runtime';

const supertest = require('supertest');
const mongoose = require('mongoose');

const server = require('../server/index.js');
const database = require('../db/index.js');

const syllabusesSchema = require('../db/data/syllabusesSchema.js');
const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

const databaseName = 'testSyllabi';
const request = supertest(server.app);
const serverUrl = `/api/syllabus/`;

const sampleData = require('../db/data/ONLY5syllabuses.json');

beforeAll(async () => {
  const databaseUrl = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(databaseUrl, {useNewUrlParser: true});
});

beforeEach(async () => {
  await SyllabusModel.insertMany(sampleData);
});

afterEach(async () => {
  await SyllabusModel.deleteMany();
});

// CREATE
describe('Create', () =>  {
  it('should create a new record inside of the database', async done => {
    await database.insertEntry(6, sixEntry, async (err, success) => {
      if (err) {
        throw new Error('did not successfully insert new record into database');
      } else {
        let docCount = await SyllabusModel.find({id: {$gt: 0}});
        expect(docCount.length).toBe(6);
      }
      done();
    });
  });

  it('server should handle post requests', async done => {
    let response = await request.post(serverUrl + '6').send(sixEntry);
    expect(response.statusCode).toBe(201);
    done();
  });

  it('server should return error (post unsuccessful) if courseNumber already exists', async done=> {
    let response = await request.post(serverUrl + '2').send(secondEntry);
    expect(response.statusCode).toBe(405);
    done();
  });
});

// READ
describe('Read', () => {
  it('should query for an existing record inside of the database', async done => {
    await database.syllabus(1, async (err, success) => {
      if (err) {
        throw new Error('did not successfully query the database for an existing record');
      } else {
        expect(success.id).toBe(1);
        expect(success.weeks.length).toBe(4);
        expect(success.hoursToCompleteCourse).toBe(46);
      }
      done();
    })
  });

  it('should return an error if record doesn\'t exist', async done => {
    await database.syllabus(85, (err, success) => {
      expect(success).toBeFalsy();
      expect(err).toBeTruthy();
    });
    done();
  });

  it('should only return hoursToComplete for that route', async done => {
    await database.hoursToComplete(5, (err, success) => {
      if (err) {
        throw new Error('did not successfully query the database for an existing record\'s hoursToCompleteCourse');
      } else {
        expect(success.hoursToCompleteCourse).toBe(13);
      }
      done();
    })
  });

  it('server should return the data if request\'s courseNumber exists', async done => {
    let response = await request.get(serverUrl + '1');
    expect(response.body.hoursToCompleteCourse).toBe(46);
    expect(response.statusCode).toBe(202);
    done();
  });

  it('server should return an error if courseNumber doesn\'t exist', async done => {
    let response = await request.get(serverUrl + '99');
    expect(response.statusCode).toBe(404);
    done();
  });
});

// UPDATE
describe('Update', () => {
  it('should return an error if record doesn\'t exist and therefore can\'t be updated', async done => {
    await database.updateEntry(66, {hoursToCompleteCourse: 45}, (err, success) => {
      expect(err).toBeTruthy();
      expect(success).toBeFalsy();
      done();
    })
  });

  it('should update value inside of database', async done => {
    await database.updateEntry(5, {hoursToCompleteCourse: 466}, async (err, success) => {
      if (err) {
        throw new Error('did not successfully update the record');
      } else {
        let record = await SyllabusModel.findOne({id: 5});
        expect(record.hoursToCompleteCourse).toBe(466);
      }
      done();
    })
  });

  it('server should update entry', async done => {
    let response = await request.put(serverUrl + '2').send({hoursToCompleteCourse: 1212});
    expect(response.statusCode).toBe(202);
    let record = await SyllabusModel.findOne({id: 2});
    expect(record.hoursToCompleteCourse).toBe(1212);
    done();
  });

  it('should should NOT update entry if it does not exist', async done => {
    let response = await request.put(serverUrl + '98').send({});
    expect(response.statusCode).toBe(405);
    done();
  });

});

// DELETE
describe('Delete', () => {

  it('should delete record from the database', async done => {
    await database.deleteEntry(1, async (err, success) => {
      if (err) {
        throw new Error('did not successfully delete record');
      } else {
        let record = await SyllabusModel.findOne({id: 1});
        expect(record).toBeFalsy();
      }
      done();
    });
  });

  it('should delete nothing from the database if no record matching the id exists', async done => {
    await database.deleteEntry(562, (err, success) => {
      expect(success).toBeFalsy();
      expect(err).toBeTruthy();
      done();
    });
  });

  it('server should return success code if record matching id is successfully deleted', async done => {
    let response = await request.delete(serverUrl + '2');
    expect(response.status).toBe(202);
    let docCount = await SyllabusModel.find({id: {$gt: 0}});
    expect(docCount.length).toBe(4);
    done();
  });

  it('server should return error code if record doesn\'t match id', async done => {
    let response = await request.delete(serverUrl + '888');
    expect(response.status).toBe(404);
    done();
  });

});


const secondEntry = {
  "id": 2,
  "weeks": [
    {
      "weekNumber": 1,
      "lessons": [
        {
          "hoursToCompleteLesson": 6,
          "lessonTitle": "What is overriding SMS Washington",
          "lessonDescription": "Dolor vero ducimus tempore doloribus sit quasi. Aut quod quo dolorem numquam voluptatum est ab. Commodi doloribus vero doloribus et. Maxime a sit possimus ut voluptatem rerum consequatur. Et quo mollitia at sed nobis ex aliquam eligendi. Natus asperiores magnam laudantium ipsa asperiores.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Expanded synthesize pixel",
              "videoLengthMinutes": 9,
              "videoLengthSeconds": 17
            },
            {
              "videoIndex": 1,
              "videoTitle": "Proactive override capacitor",
              "videoLengthMinutes": 85,
              "videoLengthSeconds": 57
            },
            {
              "videoIndex": 2,
              "videoTitle": "Distributed calculate monitor",
              "videoLengthMinutes": 18,
              "videoLengthSeconds": 26
            }
          ],
          "videosLength": 113,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "Steel Paradigm Namibia",
              "readingLengthMinutes": 38
            },
            {
              "readingIndex": 1,
              "readingTitle": "Colorado non-volatile 24",
              "readingLengthMinutes": 5
            }
          ],
          "readingsLength": 43,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "Building transmit primary monitor",
              "exerciseLengthMinutes": 47
            },
            {
              "exerciseIndex": 1,
              "exerciseTitle": "Skills for navigate 1080p pixel",
              "exerciseLengthMinutes": 74
            },
            {
              "exerciseIndex": 2,
              "exerciseTitle": "Types of connect wireless protocol",
              "exerciseLengthMinutes": 61
            },
            {
              "exerciseIndex": 3,
              "exerciseTitle": "Ethics of quantify primary driver",
              "exerciseLengthMinutes": 37
            }
          ],
          "exercisesLength": 219
        },
        {
          "hoursToCompleteLesson": 4,
          "lessonTitle": "Basics of IB Alaska Mill Moldova grey",
          "lessonDescription": "Consequatur labore a dolorum. Eum sunt tempore odio ullam. Nostrum quidem error eligendi est delectus doloremque culpa libero. Aspernatur saepe velit nihil optio dicta aut saepe.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Synergistic parse transmitter",
              "videoLengthMinutes": 83,
              "videoLengthSeconds": 3
            },
            {
              "videoIndex": 1,
              "videoTitle": "Profit-focused program feed",
              "videoLengthMinutes": 5,
              "videoLengthSeconds": 43
            }
          ],
          "videosLength": 88,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "engineer West Avon Devolved mobile",
              "readingLengthMinutes": 44
            },
            {
              "readingIndex": 1,
              "readingTitle": "Music backing Concrete drive Valley",
              "readingLengthMinutes": 5
            },
            {
              "readingIndex": 2,
              "readingTitle": "Canyon Wooden Forest Beauty Plastic",
              "readingLengthMinutes": 18
            }
          ],
          "readingsLength": 67,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "What is compress auxiliary hard drive",
              "exerciseLengthMinutes": 8
            },
            {
              "exerciseIndex": 1,
              "exerciseTitle": "What is synthesize mobile matrix",
              "exerciseLengthMinutes": 71
            },
            {
              "exerciseIndex": 2,
              "exerciseTitle": "Building bypass optical program",
              "exerciseLengthMinutes": 10
            },
            {
              "exerciseIndex": 3,
              "exerciseTitle": "What is connect mobile capacitor",
              "exerciseLengthMinutes": 4
            }
          ],
          "exercisesLength": 93
        }
      ]
    }
  ],
  "hoursToCompleteCourse": 10
};

const sixEntry = {
  "id": 6,
  "weeks": [
    {
      "weekNumber": 1,
      "lessons": [
        {
          "hoursToCompleteLesson": 4,
          "lessonTitle": "Basics of Associate pixel",
          "lessonDescription": "Qui enim et expedita ut in unde quae. Ut voluptatem sint expedita facere et quisquam quidem. Illo corporis corporis veniam. Deserunt reiciendis perferendis sunt quas veniam minus nulla. Eos omnis et pariatur sunt ipsa numquam. Et ducimus ut et.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Total transmit pixel",
              "videoLengthMinutes": 5,
              "videoLengthSeconds": 10
            },
            {
              "videoIndex": 1,
              "videoTitle": "Quality-focused input panel",
              "videoLengthMinutes": 25,
              "videoLengthSeconds": 19
            },
            {
              "videoIndex": 2,
              "videoTitle": "Face to face copy circuit",
              "videoLengthMinutes": 76,
              "videoLengthSeconds": 37
            }
          ],
          "videosLength": 107,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "PNG Networked",
              "readingLengthMinutes": 48
            },
            {
              "readingIndex": 1,
              "readingTitle": "connecting invoice",
              "readingLengthMinutes": 31
            }
          ],
          "readingsLength": 79,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "Types of generate open-source monitor",
              "exerciseLengthMinutes": 43
            }
          ],
          "exercisesLength": 43
        },
        {
          "hoursToCompleteLesson": 6,
          "lessonTitle": "Types of Nicaragua Bacon standardization",
          "lessonDescription": "Voluptatum qui iusto. Pariatur aliquam recusandae aliquam qui mollitia at. Beatae in non asperiores quia iste possimus facilis. Expedita iusto aut. Sunt reprehenderit et.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Centralized bypass panel",
              "videoLengthMinutes": 78,
              "videoLengthSeconds": 16
            },
            {
              "videoIndex": 1,
              "videoTitle": "Fundamental input array",
              "videoLengthMinutes": 2,
              "videoLengthSeconds": 39
            }
          ],
          "videosLength": 80,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "Borders pink Prairie",
              "readingLengthMinutes": 11
            },
            {
              "readingIndex": 1,
              "readingTitle": "International Multi-channelled salmon",
              "readingLengthMinutes": 47
            },
            {
              "readingIndex": 2,
              "readingTitle": "override transmit SSL",
              "readingLengthMinutes": 39
            },
            {
              "readingIndex": 3,
              "readingTitle": "Program methodical multi-byte",
              "readingLengthMinutes": 35
            }
          ],
          "readingsLength": 132,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "Types of transmit digital feed",
              "exerciseLengthMinutes": 52
            },
            {
              "exerciseIndex": 1,
              "exerciseTitle": "Steps to parse redundant array",
              "exerciseLengthMinutes": 46
            },
            {
              "exerciseIndex": 2,
              "exerciseTitle": "Basics of copy bluetooth microchip",
              "exerciseLengthMinutes": 28
            }
          ],
          "exercisesLength": 126
        }
      ]
    }
  ],
  "hoursToCompleteCourse": 100
};

const sevenEntry = {
  "id": 7,
  "weeks": [
    {
      "weekNumber": 1,
      "lessons": [
        {
          "hoursToCompleteLesson": 4,
          "lessonTitle": "Steps to Computer XML Rapids Games",
          "lessonDescription": "Enim aut aut officia et accusamus natus. Vel numquam blanditiis incidunt. Doloremque et eum. Est et placeat soluta ullam enim eaque. Minus est ut recusandae quas. Labore dolor illum aut.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Multi-tiered generate matrix",
              "videoLengthMinutes": 40,
              "videoLengthSeconds": 14
            },
            {
              "videoIndex": 1,
              "videoTitle": "Centralized copy monitor",
              "videoLengthMinutes": 26,
              "videoLengthSeconds": 49
            },
            {
              "videoIndex": 2,
              "videoTitle": "Centralized connect system",
              "videoLengthMinutes": 8,
              "videoLengthSeconds": 32
            }
          ],
          "videosLength": 75,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "orange Consultant viral Cotton",
              "readingLengthMinutes": 38
            },
            {
              "readingIndex": 1,
              "readingTitle": "deposit Identity Electronics grow",
              "readingLengthMinutes": 56
            },
            {
              "readingIndex": 2,
              "readingTitle": "Vermont Composite bricks-and-clicks Samoa",
              "readingLengthMinutes": 4
            }
          ],
          "readingsLength": 98,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "Steps to generate online hard drive",
              "exerciseLengthMinutes": 42
            }
          ],
          "exercisesLength": 42
        },
        {
          "hoursToCompleteLesson": 6,
          "lessonTitle": "Building Industrial Versatile Handmade",
          "lessonDescription": "Eos ab eligendi. Laborum laudantium eaque iure iure porro consequatur omnis quasi consequatur. Amet qui molestias in tenetur nihil unde nulla voluptatem dignissimos. Dolor magnam expedita ducimus quia ut et vel. Dolore aspernatur sunt error minus. A vero in eum ipsum debitis atque soluta.",
          "videos": [
            {
              "videoIndex": 0,
              "videoTitle": "Monitored override panel",
              "videoLengthMinutes": 12,
              "videoLengthSeconds": 52
            },
            {
              "videoIndex": 1,
              "videoTitle": "Realigned reboot program",
              "videoLengthMinutes": 70,
              "videoLengthSeconds": 22
            }
          ],
          "videosLength": 83,
          "readings": [
            {
              "readingIndex": 0,
              "readingTitle": "function deposit Croatia",
              "readingLengthMinutes": 29
            },
            {
              "readingIndex": 1,
              "readingTitle": "payment IB disintermediate",
              "readingLengthMinutes": 11
            },
            {
              "readingIndex": 2,
              "readingTitle": "(E.M.U.-6) Computers superstructure",
              "readingLengthMinutes": 19
            },
            {
              "readingIndex": 3,
              "readingTitle": "monitor Usability Practical",
              "readingLengthMinutes": 30
            }
          ],
          "readingsLength": 89,
          "exercises": [
            {
              "exerciseIndex": 0,
              "exerciseTitle": "Steps to back up haptic driver",
              "exerciseLengthMinutes": 52
            },
            {
              "exerciseIndex": 1,
              "exerciseTitle": "Ethics of compress solid state firewall",
              "exerciseLengthMinutes": 64
            },
            {
              "exerciseIndex": 2,
              "exerciseTitle": "Building parse online card",
              "exerciseLengthMinutes": 67
            }
          ],
          "exercisesLength": 183
        }
      ]
    }
  ],
  "hoursToCompleteCourse": 16
};