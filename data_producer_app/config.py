import json

# Kafka Producer Configuration
KAFKA_TOPIC = 'train-positions'  # Kafka topic for messages.
BOOTSTRAP_SERVERS = ['localhost:9092']  # Addresses of Kafka brokers.
VALUE_SERIALIZER = lambda m: json.dumps(m).encode('ascii')  # Serialize messages to JSON.
