// Filtering logic
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.getElementById("searchInput");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    menuCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Search filter
searchInput.addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  menuCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

// Open AR Link
function openARLink() {
  window.open("https://your-ar-link-here.com", "_blank");
}
