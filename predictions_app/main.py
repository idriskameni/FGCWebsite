from sklearn.preprocessing import MinMaxScaler, LabelEncoder

from get_data import get_data
from prepare_data import prepare_data
from train_model import train_model


def get_predictions(id, minutes):

    model_path = 'models/model.h5'
    label_encoder = LabelEncoder()
    scaler = MinMaxScaler()

    # Get the data
    print('Getting the data...')
    data = get_data()

    # Prepare the data
    print('Preparing data...')
    X_train, X_test, y_train, y_test = prepare_data(data, label_encoder, scaler)

    # Train the model
    print('Training the model...')
    train_model(X_train, y_train, X_test, y_test, model_path, input_shape=(X_train.shape[1], X_train.shape[2]))

    # Load the model
    # model = load_model(model_path)

    # Make future predictions
    # single_future_point = np.array([[[1700421536.0, 'L7', id]]], dtype='float32')

    # Replicate the data point to create a sequence of length 5
    # X_future = np.repeat(single_future_point, 5, axis=0).reshape(1, 5, 3)
    # predicted_locations = model.predict(X_future)
    # predicted_locations = scaler.inverse_transform(predicted_locations)

    # Predict the next location
    latitude = 10
    longitude = 20

    result = {
        "id": id,
        "latitude": latitude,
        "longitude": longitude,
        "minutes": minutes
    }

    return result


if __name__ == "__main__":
    get_predictions(1, 5)