from flask import Flask, jsonify
from flask_cors import CORS
from kafka import KafkaConsumer
import threading
import json
import requests
import browser_cookie3


# Retrieve cookies
cookies = browser_cookie3.edge(domain_name='.opendatasoft.com')
cookie_dict = {c.name: c.value for c in cookies}

app = Flask(__name__)
CORS(app)

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

# In-memory store for positions
positions = {}

def consume_positions():
    for message in consumer:
        data = message.value
        # Assuming data contains an ID to uniquely identify the position
        positions[data['id']] = data
        positions[data['id']]['timestamp'] = message.timestamp

# Start a background thread for Kafka consumer
threading.Thread(target=consume_positions, daemon=True).start()

@app.route('/positions', methods=['GET'])
def get_positions():

    return jsonify(list(positions.values()))


@app.route('/routes', methods=['GET'])
def get_routes():

    url = f'https://dadesobertes.fgc.cat/api/explore/v2.1/catalog/datasets/gtfs_routes/records?limit=100'
    response = requests.get(url, cookies=cookie_dict)

    print(response)

    data = response.json()  # Assuming the data is in JSON format
    result = data.get('results')
    
    return jsonify(result)


@app.route('/predictions/<string:id>/<int:minutes>', methods=['GET'])
def get_prediction(id, minutes):

    latitude = 41.39775252192201
    longitude = 2.135984600546964

    result = {
        "id": id,
        "latitude": latitude,
        "longitude": longitude,
        "minutes": minutes
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
