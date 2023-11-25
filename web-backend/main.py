from flask import Flask, jsonify
from flask_cors import CORS
from kafka import KafkaConsumer
from threading import Thread, Lock
import json
import requests
import ast
import browser_cookie3


# Retrieve cookies
cookies = browser_cookie3.edge(domain_name='.opendatasoft.com')
cookie_dict = {c.name: c.value for c in cookies}

app = Flask(__name__)
CORS(app)

# Dictionary to store the latest record for each ID
latest_records = {}
# Adding a lock for thread-safe operation
records_lock = Lock()

def consume_kafka_messages():    
    
    global latest_records

    consumer = KafkaConsumer(
        'train-positions',
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='web-backend-group',
        value_deserializer=lambda m: json.loads(m.decode('ascii'))
    )

    for message in consumer:
        record = message.value

        # Assume each record has a unique identifier, e.g., 'id'
        record_id = record['id']

        with records_lock:
            latest_records[record_id] = record
            latest_records[record_id]['timestamp'] = message.timestamp


# Run the Kafka consumer in a separate thread
consumer_thread = Thread(target=consume_kafka_messages, daemon=True)
consumer_thread.start()


@app.route('/positions', methods=['GET'])
def get_positions():

    with records_lock:
        # Make a copy of the values to avoid returning the live reference
        latest_positions_copy = list(latest_records.values())

    # Return a list of all latest positions
    return jsonify(latest_positions_copy)


@app.route('/routes', methods=['GET'])
def get_routes():

    url = f'https://dadesobertes.fgc.cat/api/explore/v2.1/catalog/datasets/gtfs_routes/records?limit=100'
    response = requests.get(url, cookies=cookie_dict)

    print(response)

    data = response.json()  # Assuming the data is in JSON format
    result = data.get('results')
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
