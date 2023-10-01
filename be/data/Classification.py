import sys

import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

predict_ph = sys.argv[1]
predict_temp = sys.argv[2]
predict_turbidity = sys.argv[3]
predict_do = sys.argv[4]
predict_conductivity = sys.argv[5]

# Load the dataset
data = pd.read_csv('../data/Water_Quality.csv')

# Check for null values
null_values = data.isnull().sum()
# print("Null Values:")
# print(null_values)

# Fill null values with appropriate data
# Assuming you want to fill null values with the mean of each column
data_filled = data.fillna(data.mean())

# Check if null values are filled
null_values_filled = data_filled.isnull().sum()
# print("Null Values after filling:")
# print(null_values_filled)

# Separate the features and the target variable
X = data.drop(['Sample ID', 'WQI'], axis=1)
y = data['WQI']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Apply SMOTE to balance the data
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Train a Random Forest classifier
classifier = RandomForestClassifier()
classifier.fit(X_train_resampled, y_train_resampled)

# Predict on the test set
y_pred = classifier.predict(X_test)

# Evaluate the classifier using cross-validation
cv_scores = cross_val_score(classifier, X_train_resampled, y_train_resampled, cv=10)

# Evaluate the classifier
# print(classification_report(y_test, y_pred))
# Print the accuracy for each fold
# print("Cross-Validation Scores:", cv_scores)

# Compute the mean accuracy across all folds
mean_accuracy = cv_scores.mean()
# print("Mean Accuracy:", mean_accuracy)

# Evaluate the classifier on the original test set
accuracy = accuracy_score(y_test, y_pred)
# print("Accuracy on Test Set:", accuracy)

new_data = pd.DataFrame([[predict_ph, predict_temp, predict_turbidity, predict_do, predict_conductivity]], columns=X.columns)
# # Scale the new data sample
new_data_scaled = scaler.transform(new_data)

# # Predict the WQI for the new data
predicted_wqi = classifier.predict(new_data_scaled)

print(predicted_wqi[0])