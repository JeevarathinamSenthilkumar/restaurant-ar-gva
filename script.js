// ======== AR ACTIVATION FUNCTION ========
// Trigger AR mode for a given model-viewer element
function activateAR(modelId) {
  const modelViewer = document.getElementById(modelId);

  // Detect device and open corresponding AR file directly
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const modelSrc = isiOS
    ? modelViewer.getAttribute('ios-src')
    : modelViewer.getAttribute('src');

  if (isiOS) {
    // Opens AR Quick Look
    window.location = modelSrc;
  } else if (/Android/i.test(navigator.userAgent)) {
    // Opens Scene Viewer
    window.location = `intent://${window.location.host}/${modelSrc}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${window.location.origin};end;`;
  } else {
    alert("AR mode is only available on mobile devices.");
  }
}

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
