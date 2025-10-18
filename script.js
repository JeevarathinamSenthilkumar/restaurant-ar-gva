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

// ======== FORCE HIDE AR BUTTON ON iOS SAFARI ========
window.addEventListener("load", () => {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isIOS) {
    const modelViewers = document.querySelectorAll("model-viewer");

    modelViewers.forEach((mv) => {
      // Function to hide built-in AR UI
      const hideArUi = () => {
        const shadow = mv.shadowRoot;
        if (!shadow) return;

        const arBtn = shadow.querySelector("button[slot='ar-button']");
        const prompt = shadow.querySelector(".ar-prompt");
        const progress = shadow.querySelector("progress");

        if (arBtn) {
          arBtn.style.display = "none";
          arBtn.style.opacity = "0";
          arBtn.style.visibility = "hidden";
        }

        if (prompt) {
          prompt.style.display = "none";
          prompt.style.opacity = "0";
        }

        if (progress) {
          progress.style.display = "none";
        }
      };

      // Run multiple times because Safari may delay rendering the button
      hideArUi();
      setTimeout(hideArUi, 1000);
      setTimeout(hideArUi, 2500);
      setTimeout(hideArUi, 5000);
    });
  }
});

// ======== MENU FILTERING WITH EMPTY STATE ========
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const emptyMessage = document.getElementById("emptyMessage");

// Filter menu based on category
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    let visibleCount = 0;

    menuCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Show or hide "Chef preparing" message
    if (emptyMessage) {
      if (visibleCount === 0) {
        emptyMessage.classList.remove("hidden");
      } else {
        emptyMessage.classList.add("hidden");
      }
    }

    // Smooth scroll to top when filter changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ======== SEARCH FILTER ========
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let visibleCount = 0;

    menuCards.forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";
      const matches = name.includes(searchTerm);
      card.style.display = matches ? "block" : "none";
      if (matches) visibleCount++;
    });

    // Show or hide empty message for search
    if (emptyMessage) {
      if (visibleCount === 0) {
        emptyMessage.classList.remove("hidden");
      } else {
        emptyMessage.classList.add("hidden");
      }
    }
  });
}

// ======== OPTIONAL: LOG FOR DEBUGGING ========
console.log("Restaurant AR Menu script loaded successfully 🍽️");
