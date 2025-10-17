function initCharts(driverActivity = []) {
  console.log("📊 Initializing charts...");

  // --- Line chart (Active drivers by time) ---
  const ctxLine = document.getElementById("lineDrivers");
  new Chart(ctxLine, {
    type: "line",
    data: {
      labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"],
      datasets: [
        {
          label: "Active Drivers",
          data: driverActivity.length
            ? driverActivity
            : [12, 18, 25, 22, 30, 27, 19],
          fill: false,
          borderColor: "#6c63ff",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // --- Donut chart: App Visits ---
  const ctxVisits = document.getElementById("donutVisits");
  new Chart(ctxVisits, {
    type: "doughnut",
    data: {
      labels: ["App", "Web", "Partner"],
      datasets: [
        {
          data: [70, 20, 10],
          backgroundColor: ["#6c63ff", "#3d3b8e", "#a29bfe"],
        },
      ],
    },
    options: { cutout: "70%" },
  });

  // --- Donut chart: Active Users ---
  const ctxUsers = document.getElementById("donutUsers");
  new Chart(ctxUsers, {
    type: "doughnut",
    data: {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          data: [80, 20],
          backgroundColor: ["#6c63ff", "#dfe6e9"],
        },
      ],
    },
    options: { cutout: "70%" },
  });
}
