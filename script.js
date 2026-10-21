// Keep the footer year current.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Show profile.jpg when it is available.
// Otherwise, keep the initials visible.
const portrait = document.getElementById("profile-image");

function showPortrait() {
  if (portrait.naturalWidth > 0) {
    portrait.hidden = false;
  }
}

portrait.addEventListener("load", showPortrait);

portrait.addEventListener("error", () => {
  portrait.hidden = true;
});

if (portrait.complete) {
  showPortrait();
}

// Highlight the navigation link for the section in view.
const navLinks = document.querySelectorAll('nav a[href^="#"]');

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          const matchesSection =
            link.getAttribute("href") === "#" + entry.target.id;

          if (matchesSection) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-10% 0px -35% 0px",
      threshold: 0
    }
  );

  ["about", "experience", "contact"].forEach((id) => {
    observer.observe(document.getElementById(id));
  });
}
