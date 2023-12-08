from kafka import KafkaConsumer
from config import *
from db_operations import insert_into_db

def setup_consumer():
    """
    Initializes and returns a KafkaConsumer instance configured with settings from 'config.py'.

    Returns:
        KafkaConsumer: A Kafka consumer object configured to consume messages from a specified Kafka topic.
    """
    return KafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        auto_offset_reset=KAFKA_AUTO_OFFSET_RESET,
        enable_auto_commit=KAFKA_ENABLE_AUTO_COMMIT,
        group_id=KAFKA_GROUP_ID,
        value_deserializer=KAFKA_VALUE_DESERIALIZER
    )

def process_messages(consumer, connection, sql_query):
    """
    Processes messages from a KafkaConsumer instance and inserts them into the database.

    Iterates over messages from the Kafka consumer, processes each message, and inserts the data into
    the database using the provided SQL query. If an exception occurs during insertion, a rollback is performed.

    Parameters:
        consumer (KafkaConsumer): The KafkaConsumer instance for consuming messages.
        connection (psycopg2.connection): A connection object to the PostgreSQL database.
        sql_query (str): SQL query string used for inserting the records into the database.
    """
    for message in consumer:
        with connection.cursor() as cursor:
            try:
                record = message.value
                record['timestamp'] = message.timestamp
                insert_into_db(record, cursor, sql_query)

                # Commit the transaction after successful insertion
                connection.commit()  
            except Exception as e:
                print(f"Exception while inserting record into DB: {e}")

                # Rollback the transaction in case of an exception
                connection.rollback() 
