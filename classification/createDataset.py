import csv

# Define the threshold value for WQI
threshold = 0.3

# Read the CSV file
with open('../data/Water_Quality_Testing.csv', 'r') as file:
    reader = csv.reader(file)
    data = list(reader)

# Convert WQI to 1 and 0 based on the threshold
for row in data[1:]:
    wqi = float(row[6])
    if wqi >= threshold:
        row[6] = '1'
    else:
        row[6] = '0'

# Write the converted data to a new CSV file
with open('../data/Water_Quality.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)