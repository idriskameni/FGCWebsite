import datetime
import numpy as np

def prepare_prediction_input(current_epoch, minutes, dir, en_hora, id, trip_id_encoder):
    """
    Prepare input data for making predictions.

    Args:
        current_epoch (int): The current epoch timestamp.
        minutes (int): The number of minutes into the future for the prediction.
        dir (str): The direction of the train ('D' for Direction or 'R' for Return).
        en_hora (str): Indicates if the train is on time ('True') or not ('False').
        id (str): The train ID.
        trip_id_encoder (LabelEncoder): A scikit-learn LabelEncoder for encoding 'trip_id'.

    Returns:
        numpy.ndarray: An array containing the prepared input data.

    This function prepares the input data required for making predictions using a machine learning model.
    It takes the current epoch timestamp, the number of minutes into the future for the prediction,
    the train direction, on-time status, train ID, and a LabelEncoder for encoding 'trip_id'.

    The function performs the following steps:
    1. Calculates the future time in seconds based on the current epoch and provided minutes.
    2. Converts the future time to a datetime object and determines the weekday.
    3. Encodes the 'dir' (direction) as 1 for 'D' and 0 for 'R'.
    4. Encodes the 'en_hora' (on-time status) as 1 for 'True' and 0 for 'False'.
    5. Transforms the 'id' (train ID) using the provided LabelEncoder.
    6. Combines all features into a single numpy array in the same order as the model was trained on.
    7. Returns the prepared input data as a numpy.ndarray.

    Example:
        To prepare input data for a prediction 5 minutes into the future for a train with the
        direction 'D', on-time status 'True', train ID '123', and a given LabelEncoder, call the
        function like this:
        ```
        input_data = prepare_prediction_input(current_epoch, 5, 'D', 'True', '123', trip_id_encoder)
        print(input_data)
        ```
    """
    
    # Calculate future time in seconds
    future_epoch = current_epoch + minutes * 60

    # Convert to datetime object and get the weekday
    future_time = datetime.datetime.fromtimestamp(future_epoch)
    weekday = future_time.weekday()  # Monday is 0, Sunday is 6

    # Encode 'dir'
    dir_encoded = 1 if dir == 'D' else 0

    # Encode 'en_hora'
    en_hora_encoded = 1 if en_hora == 'True' else 0

    # Transform 'id' using the LabelEncoder
    trip_id_encoded = trip_id_encoder.transform([id])[0]

    # Combine all features into a single array
    # The features should be in the same order as the model was trained on
    prediction_input = np.array([[future_epoch, weekday, dir_encoded, en_hora_encoded, trip_id_encoded]])

    return prediction_input
