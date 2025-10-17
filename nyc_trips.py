import sqlite3
import pandas as pd

csv_file = "processed/cleaned_data.csv"

db_path = "database/nyc_trips.db"

# Load the CSV
df = pd.read_csv(csv_file)

# Connect to SQLite (it will create the file if it doesn’t exist)
conn = sqlite3.connect(db_path)

# Write data to the database
df.to_sql("trips", conn, if_exists="replace", index=False)

print("✅ Data loaded successfully into:", db_path)

# Verify
rows = pd.read_sql_query("SELECT COUNT(*) AS total_records FROM trips;", conn)
print(rows)

conn.close()

