from sklearn.metrics.pairwise import haversine_distances
from sklearn.model_selection import train_test_split
from math import radians
import pandas as pd


def haversine_distance(point1, point2):
    """
    Calculate the Haversine distance between two points.
    Points are in the format (longitude, latitude).
    """
    point1 = [radians(coord) for coord in point1]
    point2 = [radians(coord) for coord in point2]
    return haversine_distances([point1, point2])[0, 1] * 6371000  # Multiply by Earth's radius in meters


def find_nearest_class(point, classes_dict):
    """
    Find the nearest class for a given point.
    """
    min_distance = float('inf')
    nearest_class = None
    for class_point, class_num in classes_dict.items():
        distance = haversine_distance(point, class_point)
        if distance < min_distance:
            min_distance = distance
            nearest_class = class_num
    return nearest_class


def prepare_training_input(data, classes_dict, trip_id_encoder):

    df = pd.DataFrame(
        data, 
        columns=['timestamp', 'trip_id', 'dir', 'en_hora', 'latitude', 'longitude']
    )

    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['weekday'] = df['timestamp'].dt.weekday
    df['epoch'] = (df['timestamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')
    df['epoch'] = df['epoch']

    # Create separate label encoders for 'linia' and 'trip_id'
    df['trip_id_encoded'] = trip_id_encoder.fit_transform(df['trip_id'])
    # df['epoch_scaled'] = time_scaler.fit_transform(df[['epoch']].values.reshape(-1, 1))

    df['dir'] = df['dir'].apply(lambda x: 1 if x == 'D' else 0)
    df['en_hora'] = df['en_hora']

    # Features and Target
    features = df[['epoch', 'weekday', 'dir', 'en_hora', 'trip_id_encoded']]
    target = df.apply(lambda row: find_nearest_class((row['longitude'], row['latitude']), classes_dict), axis=1)

    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test
