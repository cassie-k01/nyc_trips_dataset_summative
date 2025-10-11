README - NYC Trips Dataset Summative

This repository contains scripts and data for analyzing NYC taxi trip records.

IMPORTANT: This project uses Git Large File Storage (Git LFS) to manage large files like processed/cleaned_data.csv. To access the full dataset, follow the instructions below.

Setup Instructions:

1. Install Git LFS (one-time setup)
   - Download and install Git LFS from https://git-lfs.com/
   - After installation, run:
     git lfs install

2. Clone the repository
   git clone https://github.com/cassie-k01/nyc_trips_dataset_summative.git
   cd nyc_trips_dataset_summative

3. Pull the large files tracked by Git LFS
   git lfs pull

This will download the full cleaned_data.csv file in its original state.

Viewing the CSV:

You can open the file using any spreadsheet tool (Excel, LibreOffice) or load it in Python:

   import pandas as pd
   df = pd.read_csv('processed/cleaned_data.csv')
   print(df.head())

Make sure you have enough disk space, as the file is over 200MB.

If you encounter issues with missing files or pointer text, double-check that Git LFS is installed and that you ran `git lfs pull`.

