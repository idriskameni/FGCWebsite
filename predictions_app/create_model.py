from sklearn.tree import DecisionTreeClassifier

def create_model():
    
    # Initialize a Decision Tree Classifier
    dt = DecisionTreeClassifier(
        max_depth=None, 
        min_samples_split=2, 
        min_samples_leaf=1, 
        criterion='gini'
    )

    return dt
