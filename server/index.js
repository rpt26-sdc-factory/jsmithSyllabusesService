const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./jsmithSyllabusesService/public'));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  // console.log('GET / courseNumber: ', req.params.courseNumber);
  res.sendFile(path.resolve('./jsmithSyllabusesService/public/index.html'));
});

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', req.params.courseNumber);
  db.hoursToComplete(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

// READ
app.get('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('GET /api/syllabus courseNumber: ', req.params.courseNumber);
  db.syllabus(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

// CREATE
app.post('/api/syllabus/:courseNumber', (req, res) => {
  console.log('POST /api/syllabus courseNumber: ', req.params.courseNumber);
});

// UPDATE
app.put('/api/syllabus/:courseNumber', (req, res) => {
  console.log('PUT /api/syllabus courseNumber: ', req.params.courseNumber);
});

// DELETE
app.delete('/api/syllabus/:courseNumber', (req, res) => {
  console.log('DELETE /api/syllabus courseNumber: ', req.params.courseNumber);
  db.deleteEntry(req.params.courseNumber, (err, success) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(202);
    }
  });
});

app.listen(port, () => {
  console.log(`Syllabus service listening at http://localhost:${port}`);
});
