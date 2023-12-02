import pandas as pd


def prepare_prediction_input(epoch, linia, trip_id, linia_encoder, trip_id_encoder, time_scaler):
    
    sequence_length = 5

    def encode_with_unknown(encoder, data):
        known_classes = set(encoder.classes_)
        return [encoder.transform([item])[0] if item in known_classes else -1 for item in data]

    # Create a DataFrame for the new sequence with repeated values
    df = pd.DataFrame({
        'epoch': [epoch] * sequence_length,
        'linia': [linia] * sequence_length,
        'trip_id': [trip_id] * sequence_length
    })

    # Ensure epoch is in the correct float32 format
    df['epoch'] = df['epoch'].astype('float32')

    # Use the pre-fitted label encoders to transform new data
    df['linia_encoded'] = linia_encoder.transform(df['linia'])
    df['trip_id_encoded'] = encode_with_unknown(trip_id_encoder, df['trip_id'])

    # Use the pre-fitted scaler for the epoch to scale new data
    df['epoch_scaled'] = time_scaler.transform(df[['epoch']])

    # Reshape the data into the sequence format expected by the LSTM model
    X_new = df[['epoch_scaled', 'linia_encoded', 'trip_id_encoded']].values
    X_new_sequence = X_new.reshape((1, sequence_length, -1))

    return X_new_sequence
