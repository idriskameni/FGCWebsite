-----

# ZOOKEEPER-KAFKA-SERVERS

-----

D:\kafka_2.13-3.6.0\bin\windows\zookeeper-server-start.bat D:\kafka_2.13-3.6.0\config\zookeeper.properties
-----
C:\kafka_2.12-3.6.0\bin\windows\zookeeper-server-start.bat C:\kafka_2.12-3.6.0\config\zookeeper.properties
-----
D:\kafka_2.13-3.6.0\bin\windows\kafka-server-start.bat  D:\kafka_2.13-3.6.0\config\server.properties
-----
C:\kafka_2.12-3.6.0\bin\windows\kafka-server-start.bat  C:\kafka_2.12-3.6.0\config\server.properties

-----

.\bin\windows\kafka-topics.bat --create --topic train-positions --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

-----

# DATA_PRODUCER_APP

-----

run_data_producer_app.bat

-----

# DATA_PERSISTENCE_APP

-----

run_data_persistence_app.bat

-----

# WEB_BACK_END

-----

run_web_back_end.bat

-----

# WEB_FRONT_END

-----

run_web_front_end.bat

-----

# CLEAN ZOOKEEPER/KAFKA

-----

https://stackoverflow.com/questions/51644409/kafka-broker-fails-because-all-log-dirs-have-failed

rmdir /s /q C:\tmp\kafka-logs
rmdir /s /q C:\tmp\zookeeper