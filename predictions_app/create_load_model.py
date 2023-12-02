from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense
import os


def create_load_model(model_path, input_shape):
    
    print(model_path)

    if os.path.exists(model_path):
        print("Loading existing model...")
        return load_model(model_path)
    else:
        print("Creating new model...")
        model = Sequential()
        model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
        model.add(LSTM(units=50))
        model.add(Dense(2))
        model.compile(optimizer='adam', loss='mean_squared_error')

        # Save the initial version of the model
        model.save(model_path)
        print(f"Model saved to {model_path}")

        return model
