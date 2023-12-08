import os 

current_file_directory = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_file_directory)

import sys

sys.path.append(project_root)

from predictions_app.main import get_predictions

def get_prediction(linia, dir, en_hora, id, minutes):
    """
    Get predictions for a train's future position.

    Args:
        linia (str): The train line identifier.
        dir (str): The direction of the train ('D' for Down, 'U' for Up).
        en_hora (str): Whether the train is on time ('True' or 'False').
        id (str): The train's identifier.
        minutes (int): The number of minutes into the future for prediction.

    Returns:
        dict: A dictionary containing the predicted position, including 'id', 'latitude', 'longitude', and 'time'.
    """
    # Obtain the predictions using the get_predictions function from the main module
    return get_predictions(linia, dir, en_hora, id, minutes)