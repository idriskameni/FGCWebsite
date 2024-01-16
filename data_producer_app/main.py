import time
import browser_cookie3
from kafka_producer import create_producer, send_messages
from train_data_fetcher import get_train_positions
from config import KAFKA_TOPIC

def main():
    """
    Main function to continuously fetch and send train data to a Kafka topic.

    Retrieves cookies for domain authentication, initializes a Kafka producer, 
    and enters an infinite loop to fetch train position data and send it to the 
    specified Kafka topic at regular intervals.

    The process repeats every 15 seconds.
    """
    # Retrieve cookies for domain authentication
    cookies = browser_cookie3.edge(domain_name='.opendatasoft.com')

    # Initialize a Kafka producer
    producer = create_producer()

    while True:
        # Fetch train data from the data source
        train_data = get_train_positions(cookies)

        # Send the fetched train data to the Kafka topic
        send_messages(producer, KAFKA_TOPIC, train_data)

        # Wait for 10 seconds before the next data fetch
        time.sleep(10)

# Entry point for the script
if __name__ == "__main__":
    main()
