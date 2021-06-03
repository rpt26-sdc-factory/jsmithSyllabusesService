require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/postgres/index.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  // console.log('GET / courseNumber: ', req.params.courseNumber);
  res.sendFile(path.resolve('./public/index.html'));
});

// hoursToComplete is processed by the app;
// divided by 60 to get the displayed hoursToComplete
// so technically this is minutesToComplete...
app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', req.params.courseNumber);
  db.getHoursToComplete(req.params.courseNumber, (err, responseData) => {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log('responseData for getHoursToComplete: ', responseData);
      res.status(202);
      res.send(responseData);
    }
  });
});

// READ
app.get('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('GET /api/syllabus courseNumber: ', req.params.courseNumber);
  db.getSyllabus(req.params.courseNumber, (err, responseData) => {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log('responseData for getSyllabus: ', responseData);
      res.status(202);
      res.send(responseData);
    }
  });
});

// CREATE
app.post('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('POST /api/syllabus courseNumber: ', req.params.courseNumber);
  db.insertSyllabus(req.params.courseNumber, req.body, (err, success) => {
    if (err) {
      res.sendStatus(405);
    } else {
      console.log('success for insertSyllabus: ', success);
      res.sendStatus(201);
    }
  })
});

// UPDATE
app.put('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('PUT /api/syllabus courseNumber: ', req.params.courseNumber);
  db.updateEntry(req.params.courseNumber, req.body, (err, success) => {
    if (err) {
      res.sendStatus(405);
    } else {
      console.log('success for updateEntry: ', success);
      res.sendStatus(202)
    }
  });
});

// DELETE
app.delete('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('DELETE /api/syllabus courseNumber: ', req.params.courseNumber);
  db.deleteEntry(req.params.courseNumber, (err, success) => {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log('success for deleteEntry: ', success);
      res.sendStatus(202);
    }
  });
});

if (process.env.NODE_ENV.trim() !== 'test') {
  app.listen(port, () => {
    console.log(`Syllabus service listening at http://localhost:${port}`);
  });
}

module.exports.app = app;
module.exports.port = port;