from kafka import KafkaProducer
from config import BOOTSTRAP_SERVERS, VALUE_SERIALIZER

def create_producer():
    """
    Initializes and returns a KafkaProducer instance.

    Utilizes the configuration settings from 'config.py' for the bootstrap servers
    and message serialization method.

    Returns:
        KafkaProducer: A producer instance for sending messages to Kafka.
    """
    return KafkaProducer(
        bootstrap_servers=BOOTSTRAP_SERVERS,
        value_serializer=VALUE_SERIALIZER
    )

def send_messages(producer, topic, messages):
    """
    Sends messages to a specified Kafka topic using a given producer.

    Iterates over a list of messages and sends each to the Kafka topic. After sending
    all messages, flushes the producer to ensure all messages are dispatched.

    Parameters:
        producer (KafkaProducer): The Kafka producer for sending messages.
        topic (str): The Kafka topic to which messages will be sent.
        messages (list): A list of messages to be sent to the topic.
    """
    for message in messages:

        # Send each message to the Kafka topic
        producer.send(topic, value=message)

    # Ensures all asynchronous messages are sent
    producer.flush()
