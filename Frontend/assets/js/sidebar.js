document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});
