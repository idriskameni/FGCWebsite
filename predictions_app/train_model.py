from keras.callbacks import ModelCheckpoint
from predictions_app.create_load_model import create_load_model


def train_model(model, X_train, y_train, X_test, y_test):
    
    # Set up a checkpoint to save the model whenever there's an improvement in validation loss
    # checkpoint = ModelCheckpoint(model_path, save_best_only=True, monitor='val_loss', mode='min')

    # Train the model with the provided training data and validation data
    model.fit(X_train, y_train, epochs=10, batch_size=64, validation_data=(X_test, y_test)) #, callbacks=[checkpoint]

    # Evaluate the model on the test data and print the loss and accuracy
    loss, accuracy = model.evaluate(X_test, y_test)
    print("Model evaluation loss:", loss)
    print("Model evaluation accuracy:", accuracy)

    # The model is automatically saved during training if there's an improvement
    return model
