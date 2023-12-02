import time
import requests
import ast
import psycopg2
from datetime import datetime


# Function to read SQL query from file
def read_sql_query(file_path):
    with open(file_path, 'r') as file:
        return file.read()
    

# Function to format and execute the SQL query
def execute_query(query, values, db_params):
    try:
        # Establish a database connection
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()

        # Format the query with the provided values
        formatted_query = query.format(*values)

        # Execute the query
        cur.execute(formatted_query)
        conn.commit()

        print("Query executed successfully")
    except Exception as e:
        print("An error occurred:", e)
    finally:
        cur.close()
        conn.close()


# Function to get data from FGC API
def get_data():

    url = "https://fgc.opendatasoft.com/api/explore/v2.1/catalog/datasets/posicionament-dels-trens/records?limit=100"
    response = requests.get(url)

    # Get current timestamp
    current_timestamp = datetime.now()

    # Format the timestamp as a string in the format PostgreSQL expects
    formatted_timestamp = current_timestamp.strftime('%Y-%m-%d %H:%M:%S')
    
    data = response.json()  # Assuming the data is in JSON format
    results = []

    for element in data.get('results'):

        json_element = ast.literal_eval(str(element))
        print(json_element)

        row = (
            formatted_timestamp,
            json_element.get('lin'),
            json_element.get('id'),
            json_element.get('geo_point_2d').get('lat'),
            json_element.get('geo_point_2d').get('lon')
        )

        results.append(row)
    
    return results


if __name__ == '__main__':

    # Replace these with your actual database connection details
    db_params = {
        "dbname": "fgc",
        "user": "postgres",
        "password": "devdesktoppass",
        "host": "localhost",
        "port": "5432"
    }

    # Path to your SQL file
    sql_file_path = 'queries/insert_train_positions.sql'

    # Read the query from the file
    query_template = read_sql_query(sql_file_path)

    while(True):

        results = get_data()

        for row in results:

            # Execute the query with the values
            execute_query(query_template, row, db_params)

        time.sleep(5)