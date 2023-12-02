from kafka import KafkaConsumer
import json
import threading


# Kafka setup
kafka_topic = 'train-positions'
kafka_server = 'localhost:9092'  # Change as per your Kafka server address
consumer = KafkaConsumer(
    kafka_topic,
    bootstrap_servers=[kafka_server],
    auto_offset_reset='latest',
    enable_auto_commit=True,
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Global lock for thread safety
lock = threading.Lock()

def get_positions():
    global positions
    for message in consumer:
        with lock:
            data = message.value
            positions[data['id']] = data
            positions[data['id']]['timestamp'] = message.timestamp