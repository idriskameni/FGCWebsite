from flask import Flask, jsonify
from flask_cors import CORS
from kafka import KafkaConsumer
from threading import Thread, Lock
import json

app = Flask(__name__)
CORS(app)

records_lock = Lock()

# Dictionary to store the latest record for each ID
latest_records = {}

def consume_kafka_messages():

    global latest_records

    consumer = KafkaConsumer(
        'train-positions',
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='my-group',
        value_deserializer=lambda m: json.loads(m.decode('ascii'))
    )

    for message in consumer:

        record = message.value
        train_id = record['id']
        timestamp = record['timestamp']

        # Acquire the lock before updating the dictionary
        with records_lock:
            # If this is the latest record for this ID, update the latest_records dictionary
            if train_id not in latest_records or timestamp > latest_records[train_id]['timestamp']:
                latest_records[train_id] = record


# Run the Kafka consumer in a separate thread
consumer_thread = Thread(target=consume_kafka_messages, daemon=True)
consumer_thread.start()

@app.route('/latest-positions', methods=['GET'])
def get_latest_positions():

    global latest_records

    # Acquire the lock before reading the dictionary
    with records_lock:
        # Make a copy of the dictionary to avoid returning the live reference
        latest_positions_copy = list(latest_records.values())
        
    # Return a list of all latest positions outside of the lock
    return jsonify(latest_positions_copy)


if __name__ == '__main__':
    app.run(debug=True)
