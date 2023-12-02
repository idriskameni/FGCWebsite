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

# DATA-PRODUCER-APP

-----

cd .\data-producer-app\
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python main.py
venv\Scripts\deactivate
cd ..

-----

# CLEAN ZOOKEEPER/KAFKA

-----

https://stackoverflow.com/questions/51644409/kafka-broker-fails-because-all-log-dirs-have-failed

rmdir /s /q C:\tmp\kafka-logs
rmdir /s /q C:\tmp\zookeeper

-----
