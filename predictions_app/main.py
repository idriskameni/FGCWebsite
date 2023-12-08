import time
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler, LabelEncoder

from predictions_app.get_classes import get_classes
from predictions_app.get_data import get_data
from predictions_app.prepare_training_input import prepare_training_input
from predictions_app.create_model import create_model
from predictions_app.train_model import train_model
from predictions_app.prepare_prediction_input import prepare_prediction_input

def get_predictions(linia, dir, en_hora, id, minutes):
    """
    Perform predictions for the next location of a train based on historical data and machine learning.

    Args:
        linia (str): The train route ID for which to make predictions.
        dir (int): The direction of the train (1 or 0).
        en_hora (int): Indicates if the train is on time (1) or not (0).
        id (str): The train ID for which to make predictions.
        minutes (int): The number of minutes into the future to make predictions.

    Returns:
        dict: A dictionary containing the predicted location and timestamp.

    This function performs predictions for the next location of a train based on historical data
    and machine learning. It takes the train route ID, direction, on-time status, train ID, and
    the number of minutes into the future to make predictions.

    The function follows these steps:
    1. Obtains a current epoch timestamp.
    2. Retrieves a dictionary of classes representing possible locations.
    3. Retrieves historical data for the train route.
    4. Prepares the training data.
    5. Creates or loads a machine learning model.
    6. Trains the model using the training data.
    7. Prepares the prediction input based on the provided parameters.
    8. Makes a prediction for the next location.
    9. Converts the predicted class back to latitude and longitude.
    10. Returns a dictionary with the predicted location and timestamp.

    Example:
        To make predictions for train route 'S1' with direction 1, on-time status 1, train ID '123', and
        predict 5 minutes into the future, call the function like this:
        ```
        result = get_predictions("S1", 1, 1, "123", 5)
        print(result)
        ```
    """

    current_epoch = int(time.time())
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
    X_train, X_test, y_train, y_test = prepare_training_input(data, classes_dict, trip_id_encoder)

    print(X_train.head())

    # Create or load the model
    print('Creating the model...')
    model = create_model()

    # Train the model
    print('Training the model...')
    model = train_model(model, X_train, y_train, X_test, y_test)

    # Prepare the prediction input
    print('Preparing the prediction input...')
    X_pred = prepare_prediction_input(current_epoch, minutes, dir, en_hora, id, trip_id_encoder)
    print(X_pred)

    # Load the model and make the prediction
    print('Making the prediction...')
    prediction = model.predict(X_pred)[0]
    print(prediction)

    classes_dict_inverted = {v: k for k, v in classes_dict.items()}
    predicted_coordinates = classes_dict_inverted.get(prediction, None)

    # Predict the next location
    latitude = predicted_coordinates[1]
    longitude = predicted_coordinates[0]

    result = {
        "id": id,
        "latitude":  float(latitude),
        "longitude":  float(longitude),
        "time": datetime.fromtimestamp(current_epoch + minutes * 60).strftime("%Y-%m-%d %H:%M:%S")
    }

    return result

if __name__ == "__main__":
    get_predictions("S1", 1, 5)
