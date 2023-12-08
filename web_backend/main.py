from flask import Flask, jsonify
from flask_cors import CORS
import threading

# Import custom functions from other modules
from get_routes import get_routes
from get_positions import get_positions, get_positions_data
from get_prediction import get_prediction

# Create a Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Start a background thread for Kafka consumer
threading.Thread(target=get_positions, daemon=True).start()

@app.route('/positions', methods=['GET'])
def positions_route():
    """
    Get the train positions data and return it as JSON.

    Returns:
        JSON: A JSON response containing the train positions data.
    """
    positions = get_positions_data()
    return jsonify(list(positions.values()))

@app.route('/routes', methods=['GET'])
def routes_route():
    """
    Get the train routes data and return it as JSON.

    Returns:
        JSON: A JSON response containing the train routes data.
    """
    return jsonify(get_routes())

@app.route('/predictions/<string:linia>/<string:dir>/<string:en_hora>/<string:id>/<int:minutes>', methods=['GET'])
def predictions_route(linia, dir, en_hora, id, minutes):
    """
    Get train position predictions based on input parameters.

    Args:
        linia (str): The train line identifier.
        dir (str): The direction of the train (e.g., 'D' or 'U').
        en_hora (str): Whether the train is on time ('True' or 'False').
        id (str): The train identifier.
        minutes (int): The number of minutes into the future for the prediction.

    Returns:
        JSON: A JSON response containing the train position prediction.
    """
    return jsonify(get_prediction(linia, dir, en_hora, id, minutes))

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
