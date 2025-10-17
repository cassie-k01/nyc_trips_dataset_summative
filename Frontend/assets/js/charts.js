/* -----------------------------------
   DASHBOARD CHARTS
----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Trips Over Time (Line Chart)
  const ctxTrips = document.getElementById("tripsOverTime");
  new Chart(ctxTrips, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Trips per Day",
        data: [120, 150, 180, 220, 300, 270, 200],
        borderColor: "#ffd60a",
        backgroundColor: "rgba(255, 214, 10, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#1c1c1c"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // 2️⃣ Fare Distribution (Bar Chart)
  const ctxFare = document.getElementById("fareDistribution");
  new Chart(ctxFare, {
    type: "bar",
    data: {
      labels: ["$0-10", "$10-20", "$20-30", "$30-40", "$40+"],
      datasets: [{
        label: "Number of Trips",
        data: [60, 120, 90, 40, 25],
        backgroundColor: ["#7b2cbf", "#2ec4b6", "#ff8c00", "#ffd60a", "#ff5c8d"]
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // 3️⃣ Taxi Type Breakdown (Pie Chart)
  const ctxTaxi = document.getElementById("taxiTypeChart");
  new Chart(ctxTaxi, {
    type: "pie",
    data: {
      labels: ["Yellow Taxi", "Green Taxi", "For-Hire Vehicle"],
      datasets: [{
        label: "Taxi Type Share",
        data: [60, 25, 15],
        backgroundColor: ["#ffd60a", "#2ec4b6", "#1c1c1c"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
});
