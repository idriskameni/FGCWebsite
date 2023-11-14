from kafka import KafkaProducer
import json
import time
import requests
from datetime import datetime

# Create Kafka producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda m: json.dumps(m).encode('ascii')
)

# Dictionary to keep track of the last positions for each train ID
last_positions = {}


def get_train_positions():

    response = requests.get("https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=100")

    if response.status_code != 200:

        return []
    
    else:

        response_data = response.json()
        results = response_data.get('results')

        return results


def produce_messages():

    response = get_train_positions()

    i = 0

    for result in response:

        producer.send('train-positions', value=result)
        i+=1

    producer.flush()  # Ensure all messages are sent

    print(f'{i} messages sent to Kafka topic')
    print('-------------------------------------------------')

while True:
    produce_messages()
    time.sleep(5)  # Send a message every 5 seconds
