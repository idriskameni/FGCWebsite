import time
import numpy as np
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler, LabelEncoder

from predictions_app.get_classes import get_classes
from predictions_app.get_data import get_data
from predictions_app.prepare_training_input import prepare_training_input
from predictions_app.create_load_model import create_load_model
from predictions_app.train_model import train_model
from predictions_app.prepare_prediction_input import prepare_prediction_input
from predictions_app.update_config import update_config


def get_predictions(linia, dir, en_hora, id, minutes):

    current_epoch = int(time.time())
    model_path = f'models/model_{linia}.h5'
    trip_id_encoder = LabelEncoder()
    time_scaler = MinMaxScaler()

    # Get classes
    print('Getting classes...')
    classes_dict = get_classes(linia)
    print('There are {} classes.'.format(len(classes_dict)))

    # Get the data
    print('Getting the data...')
    data, max_time_stamp = get_data(linia)

    # Prepare the data
    print('Preparing data...')
    X_train, X_test, y_train, y_test = prepare_training_input(data, classes_dict, trip_id_encoder, time_scaler)

    # Create or load the model
    model = create_load_model(input_shape=(X_train.shape[1], X_train.shape[2]), num_classes=len(classes_dict))

    # Train the model
    print('Training the model...')
    model = train_model(model, X_train, y_train, X_test, y_test)

    # Prepare the prediction input
    X_new_sequence = prepare_prediction_input(current_epoch + minutes * 60, dir, en_hora, id, trip_id_encoder, time_scaler)

    # Load the model and make the prediction
    predicted_probabilities = model.predict(X_new_sequence)
    max_value_index = np.argmax(predicted_probabilities.flatten())

    classes_dict_inverted = {v: k for k, v in classes_dict.items()}
    predicted_coordinates = classes_dict_inverted.get(max_value_index, None)

    # Predict the next location
    latitude = predicted_coordinates[1]
    longitude = predicted_coordinates[0]

    """
    update_config(
        linia,
        datetime.fromtimestamp(current_epoch).strftime('%Y-%m-%d %H:%M:%S'), 
        max_time_stamp,
        id, 
        minutes,
        latitude, 
        longitude
    )
    """

    result = {
        "id": id,
        "latitude":  float(latitude),
        "longitude":  float(longitude),
        "time": datetime.fromtimestamp(current_epoch + minutes * 60).strftime("%Y-%m-%d %H:%M:%S")
    }

    return result


if __name__ == "__main__":
    get_predictions("S1", 1, 5)