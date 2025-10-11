document.addEventListener("DOMContentLoaded", () => {
  // Update KPI values dynamically
  document.getElementById("kpiBooked").textContent = kpiData.booked.toLocaleString();
  document.getElementById("kpiCancelled").textContent = kpiData.cancelled.toLocaleString();
  document.getElementById("kpiCars").textContent = kpiData.cars.toLocaleString();
  document.getElementById("kpiEarnings").textContent = `$${kpiData.earnings.toLocaleString()}`;

  document.getElementById("visitsVal").textContent = donutData.visits.toLocaleString();
  document.getElementById("usersVal").textContent = donutData.users.toLocaleString();
});
