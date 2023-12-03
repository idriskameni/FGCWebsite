import json
import os
import psycopg2


def get_data(linia):

    result = []

    # Get the path of the current script (website_backend/your_script.py)
    current_script_path = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to config.json in the predictions_app directory
    config_file_path = os.path.join(current_script_path, '..', 'predictions_app', 'config.json')

    # Read config.json and get the latest time stamp
    with open(config_file_path, 'r') as file:
        data = json.load(file)

        if linia in data:
            latest_train_time_stamp = data[linia]['latest_train_time_stamp']
        else:
            latest_train_time_stamp = '2019-01-01 00:00:00'
    

    # Define the query file name
    file_name = "queries/select_train_positions.sql"
    values = (latest_train_time_stamp, linia,)

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

        print(formatted_query)

        # Execute the query
        cur.execute(formatted_query)
        result = cur.fetchall()
        conn.commit()

        # Print a success message
        print('--> Query executed successfully')
        print('--> Number of rows returned: ', len(result))

        print(result[0:5])

    # If an error occurs, print it
    except Exception as e:

        print("--> An error occurred:", e)

    # Close the database connection
    finally:

        cur.close()
        conn.close()
    
    # Process the result to find the maximum timestamp
    max_timestamp = None
    if result:
        # Assuming the timestamp is the first element in each row
        max_timestamp = max(row[0] for row in result)

    print('--> Max timestamp: {0}'.format(max_timestamp))

    return result, max_timestamp.strftime('%Y-%m-%d %H:%M:%S')