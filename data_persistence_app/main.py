from kafka import KafkaConsumer
import json
import psycopg2
from datetime import datetime

# Kafka setup
consumer = KafkaConsumer(
    'train-positions',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='latest',
    enable_auto_commit=True,
    group_id='persistence-group-2',
    value_deserializer=lambda m: json.loads(m.decode('ascii'))
)

# Database setup
connection = psycopg2.connect(dbname='fgc', user='postgres', password='devdesktoppass', host='localhost', port='5432')

# Function to insert data into PostgreSQL
def insert_into_db(record, cursor):

    insert_query = """
    INSERT INTO input.train_positions (timestamp, linia, trip_id, latitude, longitude) 
    VALUES (%s, %s, %s, %s, %s);
    """

    try:
        timestamp = int(record['timestamp']) / 1000  # Convert to seconds
        formatted_timestamp = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S")
    except (ValueError, OverflowError, OSError) as e:
        print(f"Error with timestamp {record['timestamp']}: {e}")
        return  # or handle the error as needed

    cursor.execute(
        insert_query, 
        (
            formatted_timestamp, 
            record['lin'], 
            record['id'], 
            record['geo_point_2d']['lat'], 
            record['geo_point_2d']['lon']
        )
    )

    connection.commit()


def persist_messages(connection):
    for message in consumer:
        try:
            cursor = connection.cursor()
            record = message.value
            record['timestamp'] = message.timestamp
            insert_into_db(record, cursor)
        finally:
            cursor.close()  # Ensure cursor is closed after each message

# Use a try-finally block to ensure connection is closed when done
try:
    while True:
        persist_messages(connection)
finally:
    connection.close()