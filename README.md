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

cd .\data_producer_app\
python -m venv venv
venv\Scripts\activate
python.exe -m pip install --upgrade pip 
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

-----

# DATA_PERSISTENCE_APP

-----

cd .\data_persistence_app\
python -m venv venv
venv\Scripts\activate
python.exe -m pip install --upgrade pip 
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

-----

# PREDICTIONS_APP

-----

cd .\predictions_app\
python -m venv venv
venv\Scripts\activate
python.exe -m pip install --upgrade pip 
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

-----

# WEB-BACKEND

-----

cd .\web_backend\
python -m venv venv
venv\Scripts\activate
python.exe -m pip install --upgrade pip 
pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

-----

# WEB-FRONTEND

-----

cd .\web_frontend\
npm install
npm start

-----

# CLEAN ZOOKEEPER/KAFKA

-----

https://stackoverflow.com/questions/51644409/kafka-broker-fails-because-all-log-dirs-have-failed

rmdir /s /q C:\tmp\kafka-logs
rmdir /s /q C:\tmp\zookeeper