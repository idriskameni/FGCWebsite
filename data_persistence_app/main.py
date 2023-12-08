from kafka_consumer import setup_consumer, process_messages
from db_operations import setup_db_connection, close_db_connection
from utils.load_sql_query import load_sql_query

def main():
    """
    The main function to set up and run the Kafka consumer.

    This function initializes the Kafka consumer, establishes a connection to the PostgreSQL database,
    loads the SQL query for insertion, and processes the incoming messages. Any exceptions encountered
    during the process are caught and printed. The database connection is ensured to be closed after 
    processing, regardless of success or failure.
    """
    try:
        # Set up Kafka consumer
        consumer = setup_consumer()

        # Establish a connection to the PostgreSQL database
        connection = setup_db_connection()

        # Load the SQL insertion query from a file
        sql_query = load_sql_query('insert_query.sql')
        
        # Process messages received from Kafka
        process_messages(consumer, connection, sql_query)

    except Exception as e:
        # Handle any exceptions that occur during setup or processing
        print(f"Exception while running consumer: {e}")

    finally:
        # Ensure the database connection is closed after processing
        connection.close()

# Entry point for the script
if __name__ == "__main__":
    main()
