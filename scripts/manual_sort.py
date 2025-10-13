import csv

def load_trips(file_path):
    trips = []

    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                duration = float(row.get("trip_duration", 0))
                distance = float(row.get("trip_distance", 0))

                # Avoid invalid records
                if duration > 0 and distance > 0:
                    duration_per_km = duration / distance
                    trips.append({
                        "id": row["id"],
                        "trip_duration": duration,
                        "trip_distance": distance,
                        "duration_per_km": duration_per_km
                    })
            except (ValueError, ZeroDivisionError):
                continue

    return trips

# Manual bubble sort by duration per km (descending)
def manual_bubble_sort(trips):
    n = len(trips)
    for i in range(n):
        for j in range(0, n - i - 1):
            if trips[j]["duration_per_km"] < trips[j + 1]["duration_per_km"]:
                trips[j], trips[j + 1] = trips[j + 1], trips[j]
    return trips

# Main runner
if __name__ == "__main__":
    file_path = r"C:\Users\HP\Downloads\NYC\nyc_trips_dataset_summative\processed\cleaned_data.csv"
    
    trips = load_trips(file_path)

    if not trips:
        print("⚠️ No valid trips found. Check trip_duration and trip_distance fields.")
    else:
        print(f"✅ Loaded {len(trips)} valid trips")

        # Limit to first 1000 for performance
        sample_trips = trips[:1000]

        sorted_trips = manual_bubble_sort(sample_trips)

        print("\n🚗 Top 10 Slowest Trips (By Duration per KM):")
        for i, trip in enumerate(sorted_trips[:10], 1):
            print(f"{i}. Trip ID: {trip['id']}, Duration: {trip['trip_duration']}s, "
                  f"Distance: {trip['trip_distance']} km, Duration/km: {trip['duration_per_km']:.2f} s/km")
