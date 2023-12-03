from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense
import os


def create_load_model(model_path, input_shape, num_classes):

    if os.path.exists(model_path):

        print("Loading existing model...")

        model = load_model(model_path)
        
        # Recompile the model to ensure metrics are included
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

        return model
    
    else:
        
        print("Creating new model...")
        print("Classes: ", num_classes)
        model = Sequential()
        model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
        model.add(LSTM(units=50))
        model.add(Dense(num_classes, activation='softmax'))
        model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

        # Save the initial version of the model
        model.save(model_path)
        print(f"Model saved to {model_path}")

        return model
