from flask import Flask, jsonify
from flask_cors import CORS
import threading

from get_routes import get_routes
from get_positions import get_positions
from get_predictions import get_predictions


app = Flask(__name__)
CORS(app)

# In-memory store for positions
positions = {}

# Start a background thread for Kafka consumer
threading.Thread(target=get_positions, daemon=True).start()

@app.route('/positions', methods=['GET'])
def positions_route():
    return jsonify(list(positions.values()))


@app.route('/routes', methods=['GET'])
def routes_route():
    return jsonify(get_routes())


@app.route('/predictions/<string:id>/<int:minutes>', methods=['GET'])
def predictions_route(id, minutes):
    return jsonify(get_predictions(id, minutes))


if __name__ == '__main__':
    app.run(debug=True)