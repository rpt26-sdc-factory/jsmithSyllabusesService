DROP DATABASE IF EXISTS SDC;
CREATE DATABASE SDC;

\c sdc;

CREATE TABLE syllabi (
  id integer PRIMARY KEY,
  syllabus jsonb
);

\copy syllabi FROM 'syllabi-data-10million.csv' WITH (FORMAT csv, HEADER);