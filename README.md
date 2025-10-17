# NYC Trips Dataset Summative

This repository contains scripts and data for analyzing NYC taxi trip records.

---

## ⚙ SETUP INSTRUCTIONS

### 1. Install Git LFS (one-time setup)

Download and install Git LFS from [https://git-lfs.com/](https://git-lfs.com/)
After installation, run:


git lfs install


### 2. Clone the repository


git clone https://github.com/cassie-k01/nyc_trips_dataset_summative.git
cd nyc_trips_dataset_summative


### 3. Pull the large files tracked by Git LFS


git lfs pull


This will download the full processed/cleaned_data.csv file in its original state.

---

##  DATA CLEANING

The cleaned dataset is located at:


processed/cleaned_data.csv


You can open it using Excel, LibreOffice, or Python:

python
import pandas as pd
df = pd.read_csv('processed/cleaned_data.csv')
print(df.head())


---

##  DATABASE

The SQLite database stores all cleaned trip data for backend queries.

*Database file path:*


backend/database/nyc_trips.db


Make sure this file exists before starting the backend server.

Add extension SQLite Viewer

---

## 🖥 BACKEND SETUP

1. Navigate to the backend folder:


cd backend


2. Install dependencies:


npm install


3. Start the backend server:


node server.js


If successful, you should see:


Server running on http://localhost:5000


---

### Backend Endpoints

* *GET /trips* → Returns all trips.
* *GET /trips/:id* → Returns a single trip by ID.
* *GET /trips/stats* → Returns statistics (total trips, cancelled trips, average distance, total fare).
* *GET /trips/hour/:hour* → Returns trips aggregated by hour of the day.

---
### 💻 FRONTEND SETUP

1. Navigate to the frontend folder:

cd frontend


2. Open the index.html file.

3. Click “Go Live” using the Live Server extension.

4. Your frontend should automatically open in your browser at:

http://127.0.0.1:5500/
---
## 🧩 ALGORITHM SCRIPT

A custom bubble sort algorithm ranks trips by *duration per kilometer*.

*How to run:*

1. Ensure processed/cleaned_data.csv exists.
2. Run:


python scripts/manual_sort.py


It will display the top 10 slowest trips based on duration per km.

---
GIT HUB LINK: https://github.com/cassie-k01/nyc_trips_dataset_summative.git
Video link : https://youtu.be/c_MTCzoXFuE
