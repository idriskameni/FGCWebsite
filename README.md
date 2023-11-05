# ZOOKEEPER-KAFKA-SERVERS
D:\kafka_2.13-3.6.0\bin\windows\zookeeper-server-start.bat D:\kafka_2.13-3.6.0\config\zookeeper.properties
D:\kafka_2.13-3.6.0\bin\windows\kafka-server-start.bat  D:\kafka_2.13-3.6.0\config\server.properties

.\bin\windows\kafka-topics.bat --create --topic train-positions --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

# KAFKA-APP
cd .\kafka-app\
venv\Scripts\activate
python producer.py
venv\Scripts\deactivate
cd ..

# FLASK-APP
cd .\flask-app\
venv\Scripts\activate
python app.py
venv\Scripts\deactivate
cd ..

# REACT-APP
cd .\react-app\
npm start