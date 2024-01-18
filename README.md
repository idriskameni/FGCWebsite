# FGC Website

Repositori de la part pràctica del **Treball de Final de Màster** anomenat **Analítiques de streaming per al seguiment dels
ferrocarrils catalans en temps real: una perspectiva de
codi obert**, realitzat per l'estudiant **Adrián Alonso Gonzalo**, tutoritzat pel professor **Rafael Luque Ocaña** del **Màster Universitari de Ciència de Dades** de la **Universitat Oberta de Catalunya (UOC)**.

## Com fer correr la web

1. Instal·la Apache Kafka al teu ordinador i crea un topic anomenat `train-positions` amb la comanda `C:\kafka_2.12-3.6.0\bin\windows\kafka-topics.bat --create --topic train-positions --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1` 
2. Instal·la Zookeper al teu ordinador.
3. Instal·la PostgreSQL al teu ordinador amb una base de dades anomenada `fgc` i amb l'usuari, contrasenya, schema i taula específicats al treball i al codi.
4. Comença el servidor de Zookeper executant al CMD: `C:\kafka_2.12-3.6.0\bin\windows\zookeeper-server-start.bat C:\kafka_2.12-3.6.0\config\zookeeper.properties`
5. Comença el servidor de Kafka executant al CMD:
`C:\kafka_2.12-3.6.0\bin\windows\kafka-server-start.bat  C:\kafka_2.12-3.6.0\config\server.properties`
6. Executa el fitxer `run_data_producer_app.bat`.
7. Executa el fitxer `run_data_persistence_app.bat`.
8. Executa el fitxer `run_web_back_end.bat`.
8. Executa el fitxer `run_web_front_end.bat`.

## License

Troba la llicència sota la que es distribueix aquest repositori a `LICENSE.txt`