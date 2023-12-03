import json
import os 


def update_config(linia, api_call=None, train_time_stamp=None, trip_id=None, range_time=None, latitude=None, longitude=None):
    
    # Get the path of the current script (website_backend/your_script.py)
    current_script_path = os.path.dirname(os.path.abspath(__file__))

    # Construct the path to config.json in the predictions_app directory
    config_file_path = os.path.join(current_script_path, '..', 'predictions_app', 'config.json')

    # Read the existing config file
    with open(config_file_path, 'r') as file:
        config = json.load(file)

    # Check if the linia is already in the config
    if linia in config:
        # Update existing linia data
        if api_call is not None:
            config[linia]['latest_api_call'] = api_call
        if train_time_stamp is not None:
            config[linia]['latest_train_time_stamp'] = train_time_stamp
        if trip_id is not None:
            config[linia]['latest_trip_id_predicted'] = trip_id
        if range_time is not None:
            config[linia]['latest_range_time_predicted'] = range_time
        if latitude is not None:
            config[linia]['latest_latitude_predicted'] = latitude
        if longitude is not None:
            config[linia]['latest_longitude_predicted'] = longitude
    else:
        # Add new linia data
        config[linia] = {
            'latest_api_call': api_call,
            'latest_train_time_stamp': train_time_stamp,
            'latest_trip_id_predicted': trip_id,
            'latest_range_time_predicted': range_time,
            'latest_latitude_predicted': latitude,
            'latest_longitude_predicted': longitude
        }

    # Write the updated config back to the file
    with open(config_file_path, 'w') as file:
        json.dump(config, file, indent=4)
