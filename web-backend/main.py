from flask import Flask, jsonify
from flask_cors import CORS
from kafka import KafkaConsumer
from threading import Thread, Lock
import json
import requests
import ast

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
        group_id='web-backend-group',
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


@app.route('/railway-lines', methods=['GET'])
def get_railway_data():
    url = "https://dadesobertes.fgc.cat/api/explore/v2.1/catalog/datasets/gtfs_routes/records?limit=100"
    response = requests.get(url)
    data = response.json()  # Assuming the data is in JSON format
    result = []
    for element in data.get('results'):
        json_element = ast.literal_eval(str(element))
        result_element = {
            'route_id': json_element.get('route_id'),
            'route_color': json_element.get('route_color'),
            'coordinates': json_element.get('shape').get('geometry').get('coordinates')[0]
        }
        result.append(result_element)
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
