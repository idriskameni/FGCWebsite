import datetime
import numpy as np


def prepare_prediction_input(current_epoch, minutes, dir, en_hora, id, trip_id_encoder):

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
