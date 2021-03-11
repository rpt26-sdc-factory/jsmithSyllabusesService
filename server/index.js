const express = require('express');
const db = require('../db/index.js');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  db.hoursToComplete(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.get('/api/syllabus/:courseNumber', (req, res) => {
  db.syllabus(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.listen(port, () => {
  console.log(`Syllabuses service listening at http://localhost:${port}`);
});