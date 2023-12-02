import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.model_selection import train_test_split


def prepare_data(data, label_encoder, scaler):
    
    X, y = [], []
    sequence_length = 5

    df = pd.DataFrame(data, columns=['timestamp', 'linia', 'trip_id', 'latitude', 'longitude'])
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['epoch'] = (df['timestamp'] - pd.Timestamp("1970-01-01")) // pd.Timedelta('1s')
    df['epoch'] = df['epoch'].astype('float32')

    df['linia_encoded'] = label_encoder.fit_transform(df['linia'])
    df['trip_id_encoded'] = label_encoder.fit_transform(df['trip_id'])

    df[['latitude', 'longitude']] = scaler.fit_transform(df[['latitude', 'longitude']])

    for i in range(len(data) - sequence_length):

        seq = df.iloc[i:i + sequence_length]
        target = df.iloc[i + sequence_length]

        X.append(seq[['epoch', 'linia_encoded', 'trip_id_encoded']])
        y.append(target[['latitude', 'longitude']])
    
    X = np.array(X, dtype='float32')
    y = np.array(y, dtype='float32')
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, X_test, y_train, y_test