-- brew services start postgresql
-- psql postgres
-- \i /Users/kimberly/Documents/galvanize/kim-syllabi-service/db/postgres/postgresBenchmark.sql

\c sdc

\timing on
-- ran each of the queries separately
SELECT syllabus FROM syllabi WHERE id = 9000000;

SELECT syllabus FROM syllabi WHERE id = 8200000;