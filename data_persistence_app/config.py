import json

# Kafka Configuration
KAFKA_TOPIC = 'train-positions'  # The name of the Kafka topic to consume from.
KAFKA_BOOTSTRAP_SERVERS = ['localhost:9092']  # List of Kafka broker addresses.
KAFKA_AUTO_OFFSET_RESET = 'latest'  # Where to start reading messages ('latest' or 'earliest').
KAFKA_ENABLE_AUTO_COMMIT = True  # If True, offsets are committed automatically.
KAFKA_GROUP_ID = 'persistence-group'  # The consumer group ID for Kafka consumers.
KAFKA_VALUE_DESERIALIZER = lambda m: json.loads(m.decode('ascii'))  # Function to deserialize the messages received from Kafka.

# PostgreSQL Configuration
POSTGRES_DATABASE = 'fgc'  # The name of the database to connect to.
POSTGRES_USER = 'postgres'  # Username for the PostgreSQL database.
POSTGRES_PASSWORD = 'devdesktoppass'  # Password for the PostgreSQL database.
POSTGRES_HOST = 'localhost'  # Host where the PostgreSQL server is running.
POSTGRES_PORT = '5432'  # Port on which the PostgreSQL server is listening.
