from sklearn.metrics import accuracy_score

def train_model(model, X_train, y_train, X_test, y_test):
    """
    Train a machine learning model and evaluate its accuracy on test data.

    Args:
        model: A scikit-learn machine learning model (e.g., DecisionTreeClassifier).
        X_train (DataFrame): Training input features.
        y_train (Series): Training target labels.
        X_test (DataFrame): Test input features.
        y_test (Series): Test target labels.

    Returns:
        model: The trained machine learning model.
    """
    # Train the model
    model.fit(X_train, y_train)

    # Predict on test data
    predictions = model.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, predictions)
    print("Model evaluation accuracy:", accuracy)

    return model
