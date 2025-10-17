document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚕 Connecting to Backend...");

  try {
    // === Fetch overall trip stats ===
    const statsRes = await fetch("http://localhost:5000/trips/stats");
    const stats = await statsRes.json();
    console.log("📊 Stats fetched from backend:", stats);

    if (stats) {
      // Update KPI cards with live data
      document.getElementById("kpiBooked").textContent =
        stats.total_trips?.toLocaleString() || "N/A";
      document.getElementById("kpiCancelled").textContent =
        stats.avg_duration?.toFixed(1) + " mins" || "N/A";
      document.getElementById("kpiCars").textContent =
        stats.avg_distance?.toFixed(2) + " km" || "N/A";
      document.getElementById("kpiEarnings").textContent = `$${(
        stats.total_fare || 0
      ).toLocaleString()}`;
    }

    // === Fetch hourly trip data (for charts) ===
    const hourRes = await fetch("http://localhost:5000/trips/hour/12");
    const hourData = await hourRes.json();
    const driverActivity = Array.isArray(hourData)
      ? hourData.map((h) => h.trip_count)
      : [];

    console.log("🕓 Hourly Data:", driverActivity);

    // === Fetch sample trips (for debugging / later visualization) ===
    const tripsRes = await fetch("http://localhost:5000/trips");
    const trips = await tripsRes.json();
    console.log("✅ Sample Trips:", trips.slice(0, 5));

    // === Initialize charts if available ===
    if (typeof initCharts === "function") {
      initCharts(driverActivity);
    }
  } catch (err) {
    console.error("❌ Failed to fetch from backend:", err);
    alert("Could not connect to backend. Make sure Node server is running!");
  }
});
