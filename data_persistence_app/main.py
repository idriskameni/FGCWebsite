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

def is_integer(n):
    try:
        int(n)
        return True
    except ValueError:
        return False

# Function to insert data into PostgreSQL
def insert_into_db(record, cursor):

    insert_query = """
    INSERT INTO input.train_positions 
    (
        timestamp, 
        year,
        month,
        day,
        hour,
        minute,
        second,
        weekday,
        linia, 
        trip_id, 
        dir,
        en_hora,
        latitude, 
        longitude
    ) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """

    try:
        timestamp = int(record['timestamp']) / 1000  # Convert to seconds
        dt = datetime.fromtimestamp(timestamp)
        formatted_timestamp = dt.strftime("%Y-%m-%d %H:%M:%S")
    except (ValueError, OverflowError, OSError) as e:
        print(f"Error with timestamp {record['timestamp']}: {e}")
        return  # or handle the error as needed

    # Extract fields from record, using `None` for missing or null values
    linia = record.get('lin')
    trip_id = record.get('id')
    dir = record.get('dir')
    en_hora = int(record.get('en_hora', False) == "True")
    tipus_unitat = record.get('tipus_unitat')
    latitude = record['geo_point_2d']['lat']
    longitude = record['geo_point_2d']['lon']

    cursor.execute(
        insert_query, 
        (
            formatted_timestamp,
            dt.year,
            dt.month,
            dt.day,
            dt.hour,
            dt.minute,
            dt.second,
            dt.weekday(),
            linia,
            trip_id,
            dir,
            en_hora,
            latitude, 
            longitude
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