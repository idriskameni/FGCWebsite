from kafka import KafkaConsumer
import json
import psycopg2

# Kafka setup
consumer = KafkaConsumer(
    'train-positions',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='persistence-group',
    value_deserializer=lambda m: json.loads(m.decode('ascii'))
)

# Database setup
connection = psycopg2.connect(dbname='fgc', user='postgres', password='devdesktoppass', host='localhost', port='5432')
cursor = connection.cursor()

# Function to insert data into PostgreSQL
def insert_into_db(record):

    insert_query = """
    INSERT INTO train_data (id, longitude, latitude, lin, timestamp) 
    VALUES (%s, %s, %s, %s, %s)
    ON CONFLICT (id) DO UPDATE SET 
    longitude = EXCLUDED.longitude, 
    latitude = EXCLUDED.latitude,
    lin = EXCLUDED.lin,
    timestamp = EXCLUDED.timestamp;
    """
    cursor.execute(insert_query, (record['id'], record['lon'], record['lat'], record['route_id'], record['timestamp']))
    connection.commit()

def persist_messages():

    for message in consumer:

        record = message.value
        insert_into_db(record)

# Close database connection
cursor.close()
connection.close()

while(True):
    for message in consumer:

        id = message.value['id']
        lin = message.value['lin']
        lon = message.value['geo_point_2d'][0]
        lat = message.value['geo_point_2d'][1]
        dir = message.value['dir']
        origen = message.value['origen']
        desti = message.value['desti']
        properes_parades = message.value['properes_parades']
        estacionat_a = message.value['estacionat_a']
        en_hora = message.value['en_hora']
        tipus_unitat = message.value['tipus_unitat']
        ut = message.value['ut']
        ocupacio_mi_percent = message.value['ocupacio_mi_percent']
        ocupacio_mi_tram = message.value['ocupacio_mi_tram']
        ocupacio_ri_percent = message.value['ocupacio_ri_percent']
        ocupacio_ri_tram = message.value['ocupacio_ri_tram']
        ocupacio_m1_tram = message.value['ocupacio_m1_tram']
        ocupacio_m1_percent = message.value['ocupacio_m1_percent']
        ocupacio_m2_percent = message.value['ocupacio_m2_percent']
        ocupacio_m2_tram = message.value['ocupacio_m2_tram']

        insert_into_db(
            (
                id, lin, lon, lat, dir, origen, desti, properes_parades, 
                estacionat_a, en_hora, tipus_unitat, ut, ocupacio_mi_percent,
                ocupacio_mi_tram, ocupacio_ri_percent, ocupacio_ri_tram, ocupacio_m1_tram, 
                ocupacio_m1_percent, ocupacio_m2_percent, ocupacio_m2_tram
            )
        )