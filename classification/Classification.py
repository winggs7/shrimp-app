import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, classification_report, confusion_matrix
from sklearn.preprocessing import PolynomialFeatures
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# read dataset
dataframe = pd.read_csv("../data/waterqualitydataset.csv")
dataframe["Water_Quality"] = dataframe["Water_Quality"].astype("category")

features = ['Temperature', 'pH', 'Dissolved_Oxygen', 'Nitrate']
X = dataframe[features]
y = dataframe['Water_Quality']

#training model
###DecisionTreeClassifier
def DecisionTreeClassify ():
    dt_model = DecisionTreeClassifier(random_state=1)
    dt_model.fit(X_train, y_train)
    dt_score = dt_model.score(X_valid, y_valid)
    return dt_score

###LogisticRegression

def LogisticRegressionClassify ():
    log_reg = LogisticRegression(solver='liblinear', max_iter=1000)
    log_reg.fit(X_train, y_train)

    log_score = log_reg.score(X_valid, y_valid)
    return log_score

# log_y_pred = log_reg.predict(X_valid)
# poly = PolynomialFeatures(degree=2)
# poly_features_X_train = poly.fit_transform(X_train)
# poly_features_X_val = poly.transform(X_valid)
# poly_log_reg = LogisticRegression(solver='liblinear', max_iter=1000)
# poly_log_reg.fit(poly_features_X_train, y_train)

#Cross validation
def CrossValidationLogReg ():
    log_reg_cv = LogisticRegression(solver='liblinear', max_iter=1000)
    dt_cv = DecisionTreeClassifier(criterion = 'entropy', max_depth = 8, random_state=1)
    lr_scores = cross_val_score(log_reg_cv, X, y, scoring='accuracy', cv=10)
    print(lr_scores.mean())
    dt_scores = cross_val_score(dt_cv, X, y, scoring='accuracy', cv=10)
    print(dt_scores.mean())


# sns.histplot(data=data, x='pH', hue='Water_Quality', bins = 40, palette='Blues')
# plt.show()

##Cut pH into 4 category
# pH_category = ['very_low', 'medium_low', 'medium_high', 'very_high']
# quartile_pH_data = pd.qcut(X['pH'], 4, labels=pH_category)
# X.iloc[:, 1] = quartile_pH_data

# ##Cut nitrate into 4 category
# nitrate_category = ['very_low', 'medium_low', 'medium_high', 'very_high']
# quartile_nitrate_data = pd.qcut(X['Nitrate'], 4, labels=pH_category)
# X.iloc[:, 3] = quartile_nitrate_data

# X.iloc[:, 1] = X["pH"].astype("category")
# X.iloc[:, 3] = X["Nitrate"].astype("category")

# ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [1])], remainder='passthrough')
# X = ct.fit_transform(X)
# ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [6])], remainder='passthrough')
# X = ct.fit_transform(X)

# sns.histplot(data=X_train, x='pH', bins = 40)

# sns.countplot(x = quartile_nitrate_data, hue = y)
# plt.show()

# pd.qcut(X_train['Nitrate'],4)

from typing import Tuple
from sklearn.base import BaseEstimator, TransformerMixin


def find_boxplot_boundaries(
    col: pd.Series, whisker_coeff: float = 1.5
) -> Tuple[float, float]:
    """Findx minimum and maximum in boxplot.

    Args:
        col: a pandas serires of input.
        whisker_coeff: whisker coefficient in box plot
    """
    Q1 = col.quantile(0.25)
    Q3 = col.quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - whisker_coeff * IQR
    upper = Q3 + whisker_coeff * IQR
    return lower, upper


class BoxplotOutlierClipper(BaseEstimator, TransformerMixin):
    def __init__(self, whisker_coeff: float = 1.5):
        self.whisker = whisker_coeff
        self.lower = None
        self.upper = None

    def fit(self, X: pd.Series):
        self.lower, self.upper = find_boxplot_boundaries(X, self.whisker)
        return self

    def transform(self, X):
        return X.clip(self.lower, self.upper)

nitrate_after = BoxplotOutlierClipper().fit_transform(X["Nitrate"])
X['Nitrate'] = nitrate_after
pH_after = BoxplotOutlierClipper().fit_transform(X["pH"])
X['pH'] = pH_after


#Split dataset to train and test set
X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.9, test_size=0.1, random_state=0)

# fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(15, 5))
# nitrate_after.hist(bins=50)
# clipped_total_rooms.to_frame().boxplot(ax=axes[1], vert=False)

# sns.histplot(data=X_train, x='pH', bins = 40)

# plt.show()

print(CrossValidationLogReg())