-- MUST SWITCH FROM JAVA 11 to 8
-- export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_271`
-- cassandra -f
-- cqlsh
-- SOURCE '/Users/kimberly/Documents/galvanize/kim-syllabi-service/db/cassandra/benchmarkCassandra.cql'

USE sdc;

tracing on;
SELECT * FROM syllabi WHERE id=9000000;
SELECT * FROM syllabi WHERE id=8200000;
tracing off;