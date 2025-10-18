// ======== AR ACTIVATION FUNCTION ========
// Trigger AR mode for a given model-viewer element
function activateAR(modelId) {
  const modelViewer = document.getElementById(modelId);
  if (!modelViewer) return;

  const iosSrc = modelViewer.getAttribute("ios-src");
  const androidSrc = modelViewer.getAttribute("src");

  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isiOS && iosSrc) {
    // Launch Apple Quick Look
    window.location.href = iosSrc;
  } else if (isAndroid && androidSrc) {
    // Launch Google Scene Viewer
    const sceneViewerUrl = `intent://${window.location.host}/${androidSrc}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${window.location.href};end;`;
    window.location.href = sceneViewerUrl;
  } else {
    alert("AR mode is available only on mobile devices.");
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
