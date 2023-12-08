from kafka import KafkaConsumer
import json
import threading
from config import *

# Kafka setup
consumer = KafkaConsumer(
    KAFKA_TOPIC,
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    auto_offset_reset=KAFKA_AUTO_OFFSET_RESET,
    enable_auto_commit=KAFKA_ENABLE_AUTO_COMMIT,
    group_id=KAFKA_GROUP_ID,
    value_deserializer=KAFKA_VALUE_DESERIALIZER
)

# Shared data structure
positions = {}
lock = threading.Lock()

def get_positions():
    """
    Continuously consumes train position data from Kafka and updates the positions dictionary.

    This function listens to a Kafka topic for incoming train position data and stores it in the 'positions' dictionary.
    It also includes a lock to ensure thread-safe updates to the dictionary.
    """
    for message in consumer:
        with lock:
            data = message.value
            positions[data['id']] = data
            positions[data['id']]['timestamp'] = message.timestamp

# Export positions and lock for other modules
def get_positions_data():
    """
    Get a copy of the current train positions data.

    Returns:
        dict: A copy of the train positions data dictionary.
    """
    with lock:
        return positions.copy()
