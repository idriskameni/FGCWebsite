from kafka import KafkaProducer
import json
import time
import requests
from datetime import datetime

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda m: json.dumps(m).encode('ascii')
)

# Dictionary to keep track of the last positions for each train ID
last_positions = {}

def get_train_positions():

    response = requests.get("https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?select=id%2C%20geo_point_2d%2C%20lin&limit=60")

    if response.status_code != 200:

        return []
    
    response_data = response.json()
    results = response_data.get('results')

    return [(r.get('id'), r.get('geo_point_2d').get('lon'), r.get('geo_point_2d').get('lat'), r.get('lin')) for r in results]

def positions_have_changed(id, lon, lat):

    global last_positions

    if id not in last_positions:

        return True
    
    # print(f'Checking: {lon}-{last_positions[id][0]}, {lat}-{last_positions[id][1]} for id={id}')
    
    last_lon, last_lat = last_positions[id]

    return last_lon != lon or last_lat != lat

def produce_messages():

    api_results = get_train_positions()
    
    i = 0

    for result in api_results:

        train_id, lon, lat, lin = result

        if positions_have_changed(train_id, lon, lat):

            timestamp = datetime.utcnow().isoformat()  # ISO 8601 format UTC timestamp

            data = {
                'id': train_id,
                'lon': lon,
                'lat': lat,
                'route_id': lin,
                'timestamp': timestamp
            }

            producer.send('train-positions', value=data)

            last_positions[train_id] = (lon, lat)  # Update the last known position

            i += 1

    producer.flush()  # Ensure all messages are sent

    print(f'{i} messages sent to Kafka topic')
    print('-------------------------------------------------')

while True:
    produce_messages()
    time.sleep(5)  # Send a message every 5 seconds
