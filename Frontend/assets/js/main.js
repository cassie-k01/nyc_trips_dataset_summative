document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚕 Connecting to Backend...");

  try {
    // to mainly fetch trips
    const statsRes = await fetch("http://localhost:5000/trips/stats");
    const stats = await statsRes.json();

    // this will Update KPI Cards
    document.getElementById("kpiBooked").textContent = stats.total_trips?.toLocaleString() || "N/A";
    document.getElementById("kpiCancelled").textContent = stats.cancelled_trips?.toLocaleString() || "N/A";
    document.getElementById("kpiCars").textContent = stats.avg_distance?.toFixed(2) || "N/A";
    document.getElementById("kpiEarnings").textContent = `$${(stats.total_fare || 0).toLocaleString()}`;
//fetches the ongoing hourly activity data mostly for my charts
    const hourRes = await fetch("http://localhost:5000/trips/hour/12");
    const hourData = await hourRes.json();
    driverActivity = hourData.map(trip => trip.trip_count || 0);

    // this will fetch  for just the top trips
    const tripsRes = await fetch("http://localhost:5000/trips");
    const trips = await tripsRes.json();
    console.log("Sample Trips:", trips.slice(0, 5));

    // after the data is fetched, this will load charts dynamically
    if (typeof initCharts === "function") initCharts(driverActivity);

  } catch (err) {
    console.error("❌ Failed to fetch from backend:", err);
    alert("Could not connect to backend. Make sure Node server is running!");
  }
});
