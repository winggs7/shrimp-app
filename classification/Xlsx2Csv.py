import pandas as pd

read_file = pd.read_excel("../data/waterqualitydataset.xlsx")
read_file.to_csv("../data/waterqualitydataset.csv", index = None, header=True)
