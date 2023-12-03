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


def get_predictions(linia, id, minutes):

    current_epoch = int(time.time())
    model_path = f'models/model_{linia}.h5'
    linia_encoder = LabelEncoder()
    trip_id_encoder = LabelEncoder()
    time_scaler = MinMaxScaler()

    # Get classes
    print('Getting classes...')
    classes_dict = get_classes(linia)
    print('There are {} classes.'.format(len(classes_dict)))

    # Get the data
    print('Getting the data...')
    data = get_data(linia)

    # Prepare the data
    print('Preparing data...')
    X_train, X_test, y_train, y_test = prepare_training_input(data, classes_dict, linia_encoder, trip_id_encoder, time_scaler)

    # Train the model
    print('Training the model...')
    train_model(X_train, y_train, X_test, y_test, model_path, input_shape=(X_train.shape[1], X_train.shape[2]), num_classes=len(classes_dict))

    # Load the model
    model = create_load_model(model_path, input_shape=(X_train.shape[1], X_train.shape[2]), num_classes=len(classes_dict))

    # Prepare the prediction input
    X_new_sequence = prepare_prediction_input(current_epoch + minutes * 60, linia, id, linia_encoder, trip_id_encoder, time_scaler)

    # Load the model and make the prediction
    predicted_probabilities = model.predict(X_new_sequence)
    max_value_index = np.argmax(predicted_probabilities.flatten())

    print(max_value_index)

    classes_dict_inverted = {v: k for k, v in classes_dict.items()}
    predicted_coordinates = classes_dict_inverted.get(max_value_index, None)

    print(predicted_coordinates)

    # Predict the next location
    latitude = predicted_coordinates[1]
    longitude = predicted_coordinates[0]

    print('Predicted locations: ')
    print(latitude, longitude)

    result = {
        "id": id,
        "latitude":  float(latitude),
        "longitude":  float(longitude),
        "time": datetime.fromtimestamp(current_epoch + minutes * 60).strftime("%Y-%m-%d %H:%M:%S")
    }

    return result


if __name__ == "__main__":
    get_predictions("S1", 1, 5)