document.addEventListener("DOMContentLoaded", () => {
  // Line chart - Active Drivers
  const ctxLine = document.getElementById("lineDrivers");
  new Chart(ctxLine, {
    type: "line",
    data: {
      labels: ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"],
      datasets: [{
        label: "Active Drivers",
        data: driverActivity,
        borderColor: "#5c3dff",
        backgroundColor: "rgba(92,61,255,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}
  });

  // Donut chart - Visits
  new Chart(document.getElementById("donutVisits"), {
    type: "doughnut",
    data: {
      labels: ["Used", "Remaining"],
      datasets: [{
        data: [74, 26],
        backgroundColor: ["#ff5c8d", "#f1f1f1"],
        borderWidth: 0
      }]
    },
    options: {cutout: "70%", plugins:{legend:{display:false}}}
  });

  // Donut chart - Active Users
  new Chart(document.getElementById("donutUsers"), {
    type: "doughnut",
    data: {
      labels: ["Active", "Inactive"],
      datasets: [{
        data: [45, 55],
        backgroundColor: ["#5c3dff", "#f1f1f1"],
        borderWidth: 0
      }]
    },
    options: {cutout: "70%", plugins:{legend:{display:false}}}
  });
});
