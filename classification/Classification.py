import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

# Load the dataset
df = pd.read_csv('../data/waterqualitydataset.csv')

# Split the dataset into features (X) and target variable (y)
X = df.drop('Water_Quality', axis=1)
y = df['Water_Quality']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Apply feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Define the parameter grid for hyperparameter tuning
param_grid = {
    'n_estimators': [100, 200, 300],  # Try different number of estimators
    'max_depth': [None, 5, 10, 15],  # Try different maximum depths
    'min_samples_split': [2, 5, 10],  # Try different minimum samples for split
    'min_samples_leaf': [1, 2, 4]  # Try different minimum samples per leaf
}

# Initialize the random forest classifier
classifier = RandomForestClassifier(random_state=42)

# Perform grid search for hyperparameter tuning
grid_search = GridSearchCV(classifier, param_grid, cv=5)
grid_search.fit(X_train_scaled, y_train)

# Get the best classifier after hyperparameter tuning
best_classifier = grid_search.best_estimator_

# Predict the classes for the testing set
y_pred = best_classifier.predict(X_test_scaled)

# Evaluate the model's performance
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)