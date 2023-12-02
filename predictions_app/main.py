import time
from sklearn.preprocessing import MinMaxScaler, LabelEncoder

from predictions_app.get_data import get_data
from predictions_app.prepare_training_input import prepare_training_input
from predictions_app.create_load_model import create_load_model
from predictions_app.train_model import train_model
from predictions_app.prepare_prediction_input import prepare_prediction_input


def get_predictions(id, minutes):

    current_epoch = int(time.time())
    model_path = 'models/model.h5'
    linia_encoder = LabelEncoder()
    trip_id_encoder = LabelEncoder()
    geo_scaler = MinMaxScaler()
    time_scaler = MinMaxScaler()

    # Get the data
    print('Getting the data...')
    data = get_data()

    # Prepare the data
    print('Preparing data...')
    X_train, X_test, y_train, y_test = prepare_training_input(data, linia_encoder, trip_id_encoder, geo_scaler, time_scaler)

    # Train the model
    print('Training the model...')
    train_model(X_train, y_train, X_test, y_test, model_path, input_shape=(X_train.shape[1], X_train.shape[2]))

    # Load the model
    model = create_load_model(model_path, input_shape=(X_train.shape[1], X_train.shape[2]))

    # Prepare the prediction input
    X_new_sequence = prepare_prediction_input(current_epoch + minutes * 60, 'S1', id, linia_encoder, trip_id_encoder, time_scaler)

    # Load the model and make the prediction
    predicted_coordinates = model.predict(X_new_sequence)

    # Inverse transform the predicted coordinates if they were scaled
    predicted_coordinates = geo_scaler.inverse_transform(predicted_coordinates)

    # Predict the next location
    latitude = predicted_coordinates[0][0]
    longitude = predicted_coordinates[0][1]

    print('Predicted locations: ')
    print(latitude, longitude)

    result = {
        "id": id,
        "latitude":  float(latitude),
        "longitude":  float(longitude),
        "minutes": minutes
    }

    return result


if __name__ == "__main__":
    get_predictions(1, 5)