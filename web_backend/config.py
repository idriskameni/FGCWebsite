import json

# Kafka Configuration
KAFKA_TOPIC = 'train-positions'  # The name of the Kafka topic to consume from.
KAFKA_BOOTSTRAP_SERVERS = ['localhost:9092']  # List of Kafka broker addresses.
KAFKA_AUTO_OFFSET_RESET = 'latest'  # Where to start reading messages ('latest' or 'earliest').
KAFKA_ENABLE_AUTO_COMMIT = True  # If True, offsets are committed automatically.
KAFKA_GROUP_ID = 'web-backend-group'  # The consumer group ID for Kafka consumers.
KAFKA_VALUE_DESERIALIZER = lambda m: json.loads(m.decode('utf-8'))  # Function to deserialize the messages received from Kafka.
