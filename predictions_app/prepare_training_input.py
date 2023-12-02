from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd


def prepare_training_input(data, linia_encoder, trip_id_encoder, geo_scaler, time_scaler):
    
    X, y = [], []
    sequence_length = 5

    df = pd.DataFrame(data, columns=['timestamp', 'linia', 'trip_id', 'latitude', 'longitude'])
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['epoch'] = (df['timestamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')
    df['epoch'] = df['epoch'].astype('float32')

    # Create separate label encoders for 'linia' and 'trip_id'
    df['linia_encoded'] = linia_encoder.fit_transform(df['linia'])
    df['trip_id_encoded'] = trip_id_encoder.fit_transform(df['trip_id'])
    df[['latitude', 'longitude']] = geo_scaler.fit_transform(df[['latitude', 'longitude']])
    df['epoch_scaled'] = time_scaler.fit_transform(df[['epoch']].values.reshape(-1, 1))

    for i in range(len(data) - sequence_length):
        seq = df.iloc[i:i + sequence_length]
        target = df.iloc[i + sequence_length]
        X.append(seq[['epoch_scaled', 'linia_encoded', 'trip_id_encoded']].values)
        y.append(target[['latitude', 'longitude']].values)
    
    X = np.array(X, dtype='float32').reshape(-1, sequence_length, 3)  # Reshape for LSTM
    y = np.array(y, dtype='float32')

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test
