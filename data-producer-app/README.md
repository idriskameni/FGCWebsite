D:\kafka_2.13-3.6.0\bin\windows\zookeeper-server-start.bat D:\kafka_2.13-3.6.0\config\zookeeper.properties
D:\kafka_2.13-3.6.0\bin\windows\kafka-server-start.bat  D:\kafka_2.13-3.6.0\config\server.properties

.\bin\windows\kafka-topics.bat --create --topic train-positions --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
