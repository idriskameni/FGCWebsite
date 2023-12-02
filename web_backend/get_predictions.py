import os 

current_file_directory = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_file_directory)

import sys

sys.path.append(project_root)

from predictions_app.main import predict_next_location


def get_predictions(id, minutes):
    
    return predict_next_location(id, minutes)