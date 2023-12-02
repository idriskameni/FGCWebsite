import json
import os
import psycopg2


def get_data():

    result = []

    # Read config.json and get the latest time stamp
    with open('config.json', 'r') as file:
        data = json.load(file)
        latest_train_time_stamp = data['latest_train_time_stamp']

    # Define the query file name
    file_name = "queries/select_train_positions.sql"
    values = (latest_train_time_stamp,)

    # Define the database connection parameters
    db_params = {
        "dbname": "fgc",
        "user": "postgres",
        "password": "devdesktoppass",
        "host": "localhost",
        "port": "5432"
    }

    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the full file path
    file_path = os.path.join(script_dir, file_name)

    # Read the query from the file
    with open(file_path, 'r') as file:

        # Define the query template
        query_template = file.read()

    # Try to execute the query, if an error occurs, print it
    try:

        # Establish a database connection
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()

        # Format the query with the provided values
        formatted_query = query_template.format(*values)

        # Execute the query
        cur.execute(formatted_query)
        result = cur.fetchall()
        conn.commit()

        # Print a success message
        print("Query executed successfully")

    # If an error occurs, print it
    except Exception as e:

        print("An error occurred:", e)

    # Close the database connection
    finally:

        cur.close()
        conn.close()
    
    # Return the query result
    return result