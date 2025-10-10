import pandas as pd
from math import radians, sin, cos, sqrt, atan2
import logging
import os

# Ensure the logs directory exists
logs_dir = 'C:\\Users\\hp\\Downloads\\nyc_trips_dataset_summative\\logs'
os.makedirs(logs_dir, exist_ok=True)

# Configure logging
logging.basicConfig(filename=os.path.join(logs_dir, 'excluded_records.log'), level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Read CSV
print("Reading data...")
df = pd.read_csv("C:\\Users\\hp\\Downloads\\train\\train.csv")
print(f"Total rows: {len(df):,}")

# Check for missing values
if df.isnull().values.any():
    logging.warning('Missing values found in dataset.')
    df = df.dropna()  # or use imputation

# Check for duplicates
duplicates = df[df.duplicated()]
if not duplicates.empty:
    logging.info(f'Duplicates found: {len(duplicates)}')
    df = df.drop_duplicates()

# Haversine distance function
def haversine(lat1, lon1, lat2, lon2):
    R = 3959  # miles
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c

# Calculate distance
print("Calculating distance...")
df['trip_distance'] = df.apply(
    lambda row: haversine(
        row['pickup_latitude'], row['pickup_longitude'],
        row['dropoff_latitude'], row['dropoff_longitude']
    ), axis=1
)

# Calculate speed
df['trip_speed'] = df['trip_distance'] / (df['trip_duration'] / 3600)

# Extract hour
df['hour_of_day'] = pd.to_datetime(df['pickup_datetime']).dt.hour

# Filter bad data and log excluded records
print("Filtering...")
excluded_records = df[
    (df['trip_distance'] < 0.1) | (df['trip_distance'] > 100) |
    (df['trip_speed'] < 0.5) | (df['trip_speed'] > 100) |
    (df['trip_duration'] < 60) | (df['trip_duration'] > 10800) |
    (df['pickup_latitude'] == 0) | (df['pickup_longitude'] == 0)
]

# Log excluded records
for _, record in excluded_records.iterrows():
    logging.info(f'Excluded record: {record.to_dict()}')

# Keep only clean records
clean = df[
    (df['trip_distance'] >= 0.1) & (df['trip_distance'] <= 100) &
    (df['trip_speed'] >= 0.5) & (df['trip_speed'] <= 100) &
    (df['trip_duration'] >= 60) & (df['trip_duration'] <= 10800) &
    (df['pickup_latitude'] != 0) & (df['pickup_longitude'] != 0)
]

# Ensure the processed directory exists
processed_dir = 'C:\\Users\\hp\\Downloads\\nyc_trips_dataset_summative\\processed'
os.makedirs(processed_dir, exist_ok=True)

# Save cleaned data
output_file = os.path.join(processed_dir, 'cleaned_data.csv')
print("Saving...")
clean.to_csv(output_file, index=False)

print(f"\nValid rows: {len(clean):,}")
print(f"Excluded: {len(df) - len(clean):,}")
print("Done! ✓")
