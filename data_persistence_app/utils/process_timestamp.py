from datetime import datetime

def process_timestamp(record):
    """
    Processes and formats the timestamp from a given record.

    This function extracts the timestamp from the 'record' dictionary, converts it to a datetime object,
    and formats it into a standard string format. It handles any errors that may occur during this process,
    such as invalid or missing timestamp data.

    Parameters:
    record (dict): A dictionary containing a 'timestamp' key. The timestamp should be in milliseconds.

    Returns:
    tuple: A tuple containing the formatted timestamp string and the datetime object.
           Returns (None, None) if an error occurs during processing.

    Example Usage:
    formatted_timestamp, dt_object = process_timestamp(record)

    Notes:
    - The function expects 'timestamp' in milliseconds and will convert it to seconds for datetime processing.
    - If 'timestamp' is missing, invalid, or causes an error during conversion, the function will catch the exception
      and return (None, None).
    """
    try:
        timestamp = int(record['timestamp']) / 1000  # Convert to seconds
        dt = datetime.fromtimestamp(timestamp)
        formatted_timestamp = dt.strftime("%Y-%m-%d %H:%M:%S")
        return formatted_timestamp, dt
    except (ValueError, OverflowError, OSError) as e:
        print(f"Error with timestamp {record['timestamp']}: {e}")
        return None, None  # Return None if there's an error
