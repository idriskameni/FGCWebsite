from sklearn.tree import DecisionTreeClassifier

def create_model():
    """
    Creates and returns a Decision Tree Classifier for machine learning.

    Returns:
        DecisionTreeClassifier: A Decision Tree Classifier instance configured with default hyperparameters.
    
    Hyperparameters:
        - max_depth: The maximum depth of the tree. (default=None)
        - min_samples_split: The minimum number of samples required to split an internal node. (default=2)
        - min_samples_leaf: The minimum number of samples required to be at a leaf node. (default=1)
        - criterion: The function to measure the quality of a split. (default='gini')
    
    Example:
        To create a Decision Tree Classifier, call the function like this:
        ```
        classifier = create_model()
        ```
    """
    
    # Initialize a Decision Tree Classifier
    dt = DecisionTreeClassifier(
        max_depth=None, 
        min_samples_split=2, 
        min_samples_leaf=1, 
        criterion='gini'
    )

    return dt
