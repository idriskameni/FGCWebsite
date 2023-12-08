import psycopg2
from config import *
from utils.process_timestamp import process_timestamp

def setup_db_connection():
    """
    Establishes a connection to the PostgreSQL database using configuration settings from 'config.py'.

    Returns:
        A new instance of the database connection object.
    """
    return psycopg2.connect(
        dbname=POSTGRES_DATABASE,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_HOST,
        port=POSTGRES_PORT
    )

def insert_into_db(record, cursor, query):
    """
    Inserts a record into the database using the provided cursor and SQL query.

    The function processes the timestamp from the record, formats it, and then executes
    the SQL query to insert the record into the database. 

    Parameters:
        record (dict): The record data to be inserted into the database.
        cursor (psycopg2.cursor): A cursor object used to interact with the PostgreSQL database.
        query (str): The SQL query string used to insert the record into the database.

    Returns:
        None. The function directly executes the insertion command via the cursor.
    """
    # Process the timestamp using the utility function
    formatted_timestamp, dt = process_timestamp(record)
    if formatted_timestamp is None or dt is None:
        return  # Exit the function if timestamp processing failed

    # Extract fields from record, using `None` for missing or null values
    linia = record.get('lin')
    trip_id = record.get('id')
    dir = record.get('dir')
    en_hora = int(record.get('en_hora', False) == "True")
    latitude = record['geo_point_2d']['lat']
    longitude = record['geo_point_2d']['lon']

    # Execute the SQL query to insert the record into the database
    cursor.execute(
        query, 
        (
            formatted_timestamp,
            linia,
            trip_id,
            dir,
            en_hora,
            latitude, 
            longitude
        )
    )
