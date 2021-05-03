import 'regenerator-runtime/runtime';

const supertest = require('supertest');
const mongoose = require('mongoose');

const syllabusesSchema = require('../db/data/syllabusesSchema.js');
const SyllabusModel = mongoose.model('syllabuses', syllabusesSchema);

// const server = require('../server/index.js');
const database = require('../db/index.js');

// const url = `http://localhost:${server.port}`;
const databaseName = 'testSyllabi';
// const request = supertest(server.app);

const sampleData = require('../db/data/ONLY5syllabuses.json');

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, {useNewUrlParser: true});

});

afterEach(async () => {
  await SyllabusModel.deleteMany();
});

beforeEach(async () => {
  await SyllabusModel.insertMany(sampleData);
})

// it ('should save syllabus to database', async done => {
//   console.log('inside of test');
//   await SyllabusModel.insertMany(sampleData);
//   done();
// });

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
});

// describe('Read', () => {


// });

// describe('Update', () => {


// });
// describe('Delete', () => {

//   // database
//   test('if record matches id, it is deleted from the database', async () => {
//     let operation = databaseOperation.deleteEntry(1, (err, success) => {
//       if (err) {
//         return false;
//       } else {
//         return true;
//       }
//     });
//     expect(operation).toBeTruthy();
//   });

//   // database
//   test('if no records match the id, nothing is deleted from the database', async () => {
//     let operation = databaseOperation.deleteEntry(562, (err, success) => {
//       if (err) {
//         return false;
//       } else {
//         return true;
//       }
//     });
//     expect(operation).toBeFalsy();
//   });

//   // server
//   test('if record matches id, success code attached to response', async done => {
//     let response = await request.delete('/api/syllabus/2');
//     expect(response.status).toBe(202);
//   });

//   // server
//   test('if record doesn\'t match id, error code appears on response', async done => {
//     let response = await request.delete('/api/syllabus/888');
//     expect(response.status).toBe(404);
//   });

//   afterAll(async () => {
//     // add the two entries that were deleted back to the database
//     databaseOperation.insertEntry(1, firstEntry);
//     databaseOperation.insertEntry(2, secondEntry);
//   });

// });


// // VALUES TO BE RESTORED
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
  "hoursToCompleteCourse": 10
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
  "hoursToCompleteCourse": 10
};