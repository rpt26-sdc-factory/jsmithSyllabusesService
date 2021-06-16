require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const mcache = require('memory-cache');
const db = require('../db/postgres/index.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());

const cacheOperation = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
      next();
    }
  }
};

app.get('/loader', () => {
  // have an array of possible values

  // need a visual that shows the cache "warming up"

});

app.use(`/loaderio-c9d5a17d3777c205e1f0c5453b4f4e18.txt`, express.static(path.join(__dirname, `./loaderio-c9d5a17d3777c205e1f0c5453b4f4e18.txt`)));

app.get('/:courseNumber', cacheOperation(120), (req, res) => {
  // console.log('GET / courseNumber: ', req.params.courseNumber);
  res.sendFile(path.resolve('./public/index.html'));
});

// hoursToComplete is processed by the app;
// divided by 60 to get the displayed hoursToComplete
// so technically this is minutesToComplete...
app.get('/api/hoursToComplete/:courseNumber', cacheOperation(120),(req, res) => {
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
app.get('/api/syllabus/:courseNumber', cacheOperation(120), (req, res) => {
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

// if (process.env.NODE_ENV.trim() !== 'test') {
  app.listen(port, () => {
    console.log(`Syllabus service listening at http://localhost:${port}`);
  });
// }

module.exports.app = app;
module.exports.port = port;
