import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_csv("../dataset/crowd_data.csv")

print(df.head())

# Convert day names into numbers
day_map = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
}

df["day"] = df["day"].map(day_map)

# Convert location names into numbers
df["location"] = df["location"].astype("category").cat.codes

X = df[["location", "day", "hour", "temperature", "holiday", "event"]]
y = df["crowd_count"]

model = RandomForestRegressor()
model.fit(X, y)

print("Model trained successfully!")