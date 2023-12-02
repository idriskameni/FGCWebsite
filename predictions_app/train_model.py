from create_load_model import create_load_model
from keras.callbacks import ModelCheckpoint


def train_model(X_train, y_train, X_test, y_test, model_path, input_shape):

    # Load the existing model or create a new one if it doesn't exist
    model = create_load_model(model_path, input_shape)

    # Set up a checkpoint to save the model whenever there's an improvement in validation loss
    checkpoint = ModelCheckpoint(model_path, save_best_only=True, monitor='val_loss', mode='min')

    # Train the model with the provided training data and validation data
    model.fit(X_train, y_train, epochs=10, batch_size=64, validation_data=(X_test, y_test), callbacks=[checkpoint])

    # Evaluate the model on the test data and print the loss
    loss = model.evaluate(X_test, y_test)
    print("Model evaluation loss:", loss)

    # The model is automatically saved during training if there's an improvement
    model.save(model_path)