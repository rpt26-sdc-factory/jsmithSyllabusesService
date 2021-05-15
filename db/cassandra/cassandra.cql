-- MUST SWITCH FROM JAVA 11 TO 8
-- export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_271`
-- cassandra -f
-- cqlsh
-- SOURCE '/Users/kimberly/Documents/galvanize/kim-syllabi-service/db/cassandra/cassandra.cql'

DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE sdc;

CREATE TABLE syllabi (
  id int PRIMARY KEY,
  syllabus text,
);

COPY syllabi (id, syllabus) FROM '/Users/kimberly/Documents/galvanize/kim-syllabi-service/syllabi-data-pipeSeparator-10million.csv' WITH DELIMITER='|' AND HEADER=TRUE;