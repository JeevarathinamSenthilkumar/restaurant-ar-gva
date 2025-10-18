// ======== AR ACTIVATION FUNCTION ========
// Trigger AR mode for a given model-viewer element
function activateAR(modelId) {
  const modelViewer = document.getElementById(modelId);
  if (!modelViewer) return;

  // Check if the browser supports AR through model-viewer
  if (modelViewer.canActivateAR) {
    modelViewer.activateAR(); // ✅ Same as clicking the built-in AR icon
  } else {
    alert("AR mode is not available on this device.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("model-viewer").forEach((mv) => {
    const hideArUi = () => {
      const shadow = mv.shadowRoot;
      if (!shadow) return;
      const arBtn = shadow.querySelector("button[slot='ar-button']");
      const prompt = shadow.querySelector(".ar-prompt");
      if (arBtn) arBtn.style.display = "none";
      if (prompt) prompt.style.display = "none";
    };
    hideArUi();
    setTimeout(hideArUi, 1000);
    setTimeout(hideArUi, 2500);
  });
});

// ======== MENU FILTERING ========
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

// Add click events for filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    menuCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ======== SEARCH FILTER ========
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    menuCards.forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";
      card.style.display = name.includes(searchTerm) ? "block" : "none";
    });
  });
}

// ======== SMOOTH SCROLL TO TOP WHEN FILTER CHANGES ========
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// ======== OPTIONAL: LOG FOR DEBUGGING ========
console.log("Restaurant AR Menu script loaded successfully 🍽️");
