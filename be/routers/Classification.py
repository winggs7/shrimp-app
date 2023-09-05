# import sys
# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split, GridSearchCV
# from sklearn.metrics import accuracy_score, classification_report
# from imblearn.over_sampling import SMOTE
# from sklearn.preprocessing import StandardScaler

# # Load the data from the CSV file
# data = pd.read_csv("../data/Results_MADE.csv")

# # Select the relevant columns for classification
# selected_columns = ['Temperature', 'Dissolved Oxygen', 'pH', 'Nitrate (mg/ L)', 'WQI']
# df = data[selected_columns].copy()

# # Remove any rows with missing values
# df.dropna(inplace=True)

# # Convert WQI to categorical labels
# df['WQI_Category'] = pd.cut(df['WQI'], bins=[0, 25, 50, float('inf')], labels=['Poor', 'Moderate', 'Good'])

# # Separate the features and target variable
# X = df.drop(['WQI', 'WQI_Category'], axis=1)
# y = df['WQI_Category']

# # Perform oversampling to balance the classes
# oversampler = SMOTE(random_state=42)
# X_resampled, y_resampled = oversampler.fit_resample(X, y)

# # Split the resampled data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# # Perform feature scaling
# scaler = StandardScaler()
# X_train_scaled = scaler.fit_transform(X_train)
# X_test_scaled = scaler.transform(X_test)

# # Create an instance of the Random Forest Classifier
# rf_classifier = RandomForestClassifier(random_state=42)

# # Perform hyperparameter tuning using GridSearchCV
# param_grid = {
#     'n_estimators': [100, 200, 300],
#     'max_depth': [None, 5, 10],
#     'min_samples_split': [2, 4, 8],
#     'min_samples_leaf': [1, 2, 4]
# }

# grid_search = GridSearchCV(rf_classifier, param_grid, cv=5)
# grid_search.fit(X_train_scaled, y_train)

# # Fit the classifier to the training data with the best hyperparameters
# best_rf_classifier = grid_search.best_estimator_
# best_rf_classifier.fit(X_train_scaled, y_train)

# # Make predictions on the testing data
# y_pred = best_rf_classifier.predict(X_test_scaled)

# # Calculate the accuracy of the classifier
# accuracy = accuracy_score(y_test, y_pred)
# # print("Accuracy:", accuracy)

# # Print classification report
# # print(classification_report(y_test, y_pred))

# # Create a new data point for prediction
# new_data = pd.DataFrame({
#     'Temperature': [25.5],
#     'Dissolved Oxygen': [7.2],
#     'pH': [[int(sys.argv[1])]],
#     'Nitrate (mg/ L)': [2.1]
# })

# # Scale the new data using the same scaler
# new_data_scaled = scaler.transform(new_data)

# # Predict the WQI for the new data point
# predicted_category = best_rf_classifier.predict(new_data_scaled)[0]

# print("Predicted WQI Category:", predicted_category)



# import sys
# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score
# from imblearn.over_sampling import SMOTE

# # Load the data from the CSV file
# data = pd.read_csv("../data/Results_MADE.csv")

# # Select the relevant columns for classification
# selected_columns = ['Temperature', 'Dissolved Oxygen', 'pH', 'Nitrate (mg/ L)', 'WQI']
# df = data[selected_columns].copy()

# # Remove any rows with missing values
# df.dropna(inplace=True)

# # Convert WQI to categorical labels
# df['WQI_Category'] = pd.cut(df['WQI'], bins=[0, 25, 50, float('inf')], labels=['Poor', 'Moderate', 'Good'])

# # Separate the features and target variable
# X = df.drop(['WQI', 'WQI_Category'], axis=1)
# y = df['WQI_Category']

# # Perform oversampling to balance the classes
# oversampler = SMOTE(random_state=42)
# X_resampled, y_resampled = oversampler.fit_resample(X, y)

# # Split the resampled data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# # Create an instance of the Random Forest Classifier and perform hyperparameter tuning
# rf_classifier = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)

# # Fit the classifier to the training data
# rf_classifier.fit(X_train, y_train)

# # Make predictions on the testing data
# y_pred = rf_classifier.predict(X_test)

# # Calculate the accuracy of the classifier
# accuracy = accuracy_score(y_test, y_pred)
# # print("Accuracy:", accuracy)

# new_data = pd.DataFrame({
#     'Temperature': [25.5],
#     'Dissolved Oxygen': [7.2],
#     'pH': [float(sys.argv[1])],
#     'Nitrate (mg/ L)': [2.1]
# })

# # Scale the new data using the same scaler
# # new_data_scaled = scaler.transform(new_data)

# # Predict the WQI for the new data point
# predicted_category = rf_classifier.predict(new_data)[0]

# print("Predicted WQI Category:", predicted_category)




# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split, GridSearchCV
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn.preprocessing import StandardScaler

# # Load the dataset
# df = pd.read_csv("../data/Results_MADE.csv")

# # Keep only the main columns
# df = df[["pH", "Temperature", "Dissolved Oxygen", "Nitrate (mg/ L)", "WQI"]]

# # Remove rows with missing values
# df = df.dropna()

# # Split the dataset into features (X) and target variable (y)
# X = df.drop(["WQI"], axis=1)
# y = df["WQI"]

# # Perform feature scaling
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# # Perform hyperparameter tuning using GridSearchCV
# param_grid = {
#     "n_estimators": [100, 200, 300],
#     "max_depth": [0, 5, 10],
#     "min_samples_split": [2, 5, 10],
#     "min_samples_leaf": [1, 2, 4]
# }

# grid_search = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5)
# grid_search.fit(X_train, y_train)

# # Get the best model from the grid search
# best_model = grid_search.best_estimator_

# # Predict the water quality classes for the test set
# y_pred = best_model.predict(X_test)

# # Calculate the accuracy and generate the classification report
# accuracy = accuracy_score(y_test, y_pred)
# classification_report = classification_report(y_test, y_pred)

# print("Accuracy:", accuracy)
# print("Classification Report:\n", classification_report)



# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report
# from sklearn.svm import SVC

# # Load the dataset
# df = pd.read_csv("../data/Results_MADE.csv")

# # Data cleaning and preprocessing
# # Remove any rows with missing values
# df = df.dropna()
# df = df[["pH", "Temperature", "Dissolved Oxygen", "Nitrate (mg/ L)", "WQI"]]
# print(df)

# # Define the water quality classes based on "WQI" ranges
# def classify_water_quality(wqi):
#     if wqi < 50:
#         return "Poor"
#     elif 50 <= wqi < 100:
#         return "Moderate"
#     elif 100 <= wqi < 150:
#         return "Good"
#     else:
#         return "Excellent"

# # Convert "WQI" column to categorical labels
# df["Water_Quality_Class"] = df["WQI"].apply(classify_water_quality)

# # Split the dataset into features (X) and target variable (y)
# X = df.drop(["WQI", "Water_Quality_Class"], axis=1)
# y = df["Water_Quality_Class"]

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train a Random Forest Classifier
# classifier = SVC()
# classifier.fit(X_train, y_train)

# # Predict the water quality classes for the test set
# y_pred = classifier.predict(X_test)

# # Evaluate the model's performance
# accuracy = accuracy_score(y_test, y_pred)
# classification_report = classification_report(y_test, y_pred)

# print("Accuracy:", accuracy)
# print("Classification Report:\n", classification_report)

# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor

# # Load the dataset
# df = pd.read_csv("waterqualitydataset.csv")

# df = df[["pH", "Temperature", "Dissolved_Oxygen", "Nitrate (mg/ L)", "WQI"]]

# # Data cleaning and preprocessing
# # Remove any rows with missing values
# df = df.dropna()

# print(df)

# # Split the dataset into features (X) and target variable (y)
# X = df.drop(["WQI"], axis=1)
# y = df["WQI"]

# # Train a Random Forest Regressor
# regressor = RandomForestRegressor()
# regressor.fit(X, y)

# # Example input data for prediction
# new_data = {
#     "Temperature": 8.0,
#     "Dissolved_Oxygen": 9.8,
#     "pH": 7.6,
#     "BioChemical_Oxygen_Demand": 0.25,
#     "Fecal_Streptococci": 125.0,
#     "Nitrate": 0.2,
#     "Fecal_Coliform": 30.0,
#     "Total_Coliform": 250.0,
#     "Conductivity": 120.0,
#     "Water_Quality": 0  # This value doesn't matter for prediction
# }

# # Convert the input data into a DataFrame
# input_data = pd.DataFrame([new_data])

# # Remove the "Water_Quality" column from the input data
# input_data = input_data.drop(["Water_Quality"], axis=1)

# # Predict the WQI for the input data
# predicted_wqi = regressor.predict(input_data)

# print("Predicted WQI:", predicted_wqi)





# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.preprocessing import StandardScaler

# # Load the dataset
# data = pd.read_csv('../data/waterqualitydataset.csv')

# # Select the desired columns
# selected_columns = ['pH', 'Temperature', 'Dissolved_Oxygen', 'Nitrate', 'Water_Quality']
# data = data[selected_columns]

# # Split the data into features (X) and target variable (y)
# X = data.drop('Water_Quality', axis=1)
# y = data['Water_Quality']

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Scale the features
# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.transform(X_test)

# # Train a Random Forest Classifier
# classifier = RandomForestClassifier(random_state=42)
# classifier.fit(X_train, y_train)

# # Make predictions on the test set
# y_pred = classifier.predict(X_test)

# # Calculate the accuracy of the model
# accuracy = accuracy_score(y_test, y_pred)
# print("Accuracy:", accuracy)