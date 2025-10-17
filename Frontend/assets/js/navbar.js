/* -----------------------------------
   NAVBAR INTERACTIONS
----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const searchBar = document.querySelector(".search-bar");
  searchBar.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      alert(`Searching for: ${searchBar.value}`);
    }
  });
});

