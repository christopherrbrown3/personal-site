(() => {
  const embedded = window.parent !== window && new URLSearchParams(window.location.search).has("embedded");
  if (embedded) {
    document.documentElement.classList.add("is-embedded");
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        window.parent.postMessage({ type: "resume:close" }, window.location.protocol === "file:" ? "*" : window.location.origin);
      }
    });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    if (link.dataset.emailCode) {
      event.preventDefault();
      window.location.href = `mailto:${window.atob(link.dataset.emailCode)}`;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (!embedded) return;
    // Keep external destinations from replacing the resume inside its frame.
    document.querySelectorAll('a[href^="https://"]').forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  });
})();
