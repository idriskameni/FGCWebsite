from sklearn.metrics.pairwise import haversine_distances
from sklearn.model_selection import train_test_split
from math import radians
import numpy as np
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


def prepare_training_input(data, classes_dict, linia_encoder, trip_id_encoder, time_scaler):
    
    X, y = [], []
    sequence_length = 5

    df = pd.DataFrame(data, columns=['timestamp', 'linia', 'trip_id', 'latitude', 'longitude'])
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['epoch'] = (df['timestamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')
    df['epoch'] = df['epoch'].astype('float32')

    # Create separate label encoders for 'linia' and 'trip_id'
    df['linia_encoded'] = linia_encoder.fit_transform(df['linia'])
    df['trip_id_encoded'] = trip_id_encoder.fit_transform(df['trip_id'])
    df['epoch_scaled'] = time_scaler.fit_transform(df[['epoch']].values.reshape(-1, 1))

    for i in range(len(data) - sequence_length):
        seq = df.iloc[i:i + sequence_length]
        target = df.iloc[i + sequence_length]
        X.append(seq[['epoch_scaled', 'linia_encoded', 'trip_id_encoded']].values)
        
        # Find the nearest class for the target point
        lat, lon = target[['latitude', 'longitude']].values
        nearest_class = find_nearest_class((lon, lat), classes_dict)
        y.append(nearest_class)
    
    X = np.array(X, dtype='float32').reshape(-1, sequence_length, 3)  # Reshape for LSTM
    y = np.array(y, dtype='float32')

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print('X_train shape:', X_train.shape)
    print('y_train shape:', y_train.shape)
    print('X_test shape:', X_test.shape)
    print('y_test shape:', y_test.shape)

    return X_train, X_test, y_train, y_test
