# ZOOKEEPER-KAFKA-SERVERS
D:\kafka_2.13-3.6.0\bin\windows\zookeeper-server-start.bat D:\kafka_2.13-3.6.0\config\zookeeper.properties
-----
C:\kafka_2.12-3.6.0\bin\windows\zookeeper-server-start.bat C:\kafka_2.12-3.6.0\config\zookeeper.properties
-----
D:\kafka_2.13-3.6.0\bin\windows\kafka-server-start.bat  D:\kafka_2.13-3.6.0\config\server.properties
-----
C:\kafka_2.12-3.6.0\bin\windows\kafka-server-start.bat  C:\kafka_2.12-3.6.0\config\server.properties
-----

.\bin\windows\kafka-topics.bat --create --topic train-positions --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

# KAFKA-APP
cd .\kafka-app\
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

# FLASK-APP
cd .\flask-app\
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

# REACT-APP
cd .\react-app\
npm install
npm start