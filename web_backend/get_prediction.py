import os 

current_file_directory = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_file_directory)

import sys

sys.path.append(project_root)

from predictions_app.main import get_predictions


def get_prediction(id, minutes):
    
    return get_predictions(id, minutes)