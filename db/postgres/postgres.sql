-- brew services start postgresql
-- psql postgres
-- \i /Users/kimberly/Documents/galvanize/kim-syllabi-service/db/postgres/postgres.sql

DROP DATABASE IF EXISTS SDC;
CREATE DATABASE SDC;

\c sdc;

CREATE TABLE syllabi (
  id integer PRIMARY KEY,
  syllabus jsonb
);

\copy syllabi FROM '/Users/kimberly/Documents/galvanize/kim-syllabi-service/syllabi-data-10million.csv' WITH (FORMAT csv, HEADER);