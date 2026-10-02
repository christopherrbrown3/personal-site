(() => {
  if (document.body) {
    [...document.body.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE && /^---(?:\s*---)*$/.test(node.textContent.trim()))
      .forEach((node) => node.remove());
  }

  const localPreviewPortraits = [
    "/images/landing/chris-01.png",
    "/images/landing/chris-02.png",
    "/images/landing/chris-03.png",
    "/images/landing/chris-04.png",
    "/images/landing/chris-05.png",
    "/images/landing/chris-06.png",
    "/images/landing/chris-07.png",
    "/images/landing/chris-08.png",
    "/images/landing/chris-09.png",
    "/images/landing/chris-10.png",
    "/images/landing/chris-11.png",
    "/images/landing/chris-12.png",
    "/images/landing/chris-13.png",
    "/images/landing/chris-14.png",
    "/images/landing/chris-15.png",
    "/images/landing/chris-16.png",
    "/images/landing/chris-17.png",
    "/images/landing/chris-18.png",
    "/images/landing/chris-19.png",
    "/images/landing/chris-20.png",
  ];
  const catalog = document.querySelector("#landing-illustrations")?.textContent ?? "";
  const discoveredPortraits = catalog
    .split(/\r?\n/)
    .map((line) => line.trim())
    .flatMap((line) => {
      try {
        const path = JSON.parse(line);
        return typeof path === "string" ? [path] : [];
      } catch {
        return [];
      }
    })
    .filter((path) => /^\/images\/landing\/.+\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path));
  const catalogIsUnrendered = catalog.includes("{%") || catalog.includes("{{");
  const portraits = catalogIsUnrendered ? localPreviewPortraits : discoveredPortraits;

  const stage = document.querySelector(".portrait-stage");
  const image = document.querySelector("[data-random-portrait]");
  const year = document.querySelector("[data-year]");
  const emailLink = document.querySelector("[data-email-link]");
  const resumeLink = document.querySelector("[data-resume-open]");
  const resumeDialog = document.querySelector("#resume-dialog");
  const accentNames = ["teal", "orange", "mustard"];

  const encodeAssetPath = (path) => path.split("/").map((segment, index) => {
    if (index === 0) return segment;
    try {
      return encodeURIComponent(decodeURIComponent(segment));
    } catch {
      return encodeURIComponent(segment);
    }
  }).join("/");

  const resolveAssetPath = (path) => {
    const encodedPath = encodeAssetPath(path);
    return window.location.protocol === "file:" && encodedPath.startsWith("/")
      ? `.${encodedPath}`
      : encodedPath;
  };

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  emailLink?.addEventListener("click", (event) => {
    const encodedAddress = emailLink.dataset.emailCode ?? "";
    try {
      const address = window.atob(encodedAddress);
      if (!address) return;
      event.preventDefault();
      window.location.href = `mailto:${address}`;
    } catch {
      // Leave the harmless #email fallback in place if decoding is unavailable.
    }
  });

  const randomIndex = (length) => {
    if (length <= 1) return 0;
    if (window.crypto?.getRandomValues) {
      const value = new Uint32Array(1);
      window.crypto.getRandomValues(value);
      return Math.floor((value[0] / 4294967296) * length);
    }
    return Math.floor(Math.random() * length);
  };

  const showFallback = () => {
    stage?.classList.add("is-empty");
  };

  if (!stage || !image || portraits.length === 0) {
    showFallback();
  } else {
    let currentPortrait = null;
    let isLoading = false;
    let lastPortrait = null;

    try {
      lastPortrait = window.sessionStorage.getItem("last-landing-portrait");
    } catch {
      // Storage is optional; random selection still works without it.
    }

    const selectPortrait = (excludedPortrait) => {
      const available = portraits.length > 1
        ? portraits.filter((path) => path !== excludedPortrait)
        : portraits;
      return available[randomIndex(available.length)];
    };

    const rememberPortrait = (selected) => {
      try {
        window.sessionStorage.setItem("last-landing-portrait", selected);
      } catch {
        // Storage is optional; do not block the illustration.
      }
    };

    const revealPortrait = (selected) => {
      if (!selected || isLoading) return;

      isLoading = true;
      stage.classList.add("is-changing");
      stage.setAttribute("aria-busy", "true");

      const source = resolveAssetPath(selected);
      const loader = new Image();
      loader.decoding = "async";

      loader.addEventListener("load", () => {
        const selectedIndex = portraits.indexOf(selected);
        document.documentElement.dataset.accent = accentNames[Math.abs(selectedIndex) % accentNames.length];

        image.classList.remove("is-ready");
        image.src = source;
        void image.offsetWidth;
        image.classList.add("is-ready");

        currentPortrait = selected;
        rememberPortrait(selected);
        stage.classList.remove("is-empty", "is-changing");
        stage.setAttribute("aria-busy", "false");
        isLoading = false;
      }, { once: true });

      loader.addEventListener("error", () => {
        if (!currentPortrait) showFallback();
        stage.classList.remove("is-changing");
        stage.setAttribute("aria-busy", "false");
        isLoading = false;
      }, { once: true });

      loader.src = source;
    };

    if (portraits.length < 2) {
      stage.classList.add("is-static");
      stage.disabled = true;
    } else {
      stage.addEventListener("click", () => {
        revealPortrait(selectPortrait(currentPortrait));
      });
    }

    revealPortrait(selectPortrait(lastPortrait));
  }

  const syncAnimationState = () => {
    document.documentElement.classList.toggle("is-paused", document.hidden || Boolean(resumeDialog?.open));
  };

  // Keep a real HTML link as the fallback for unsupported browsers and no-JS visits.
  if (resumeLink && typeof resumeDialog?.showModal === "function") {
    const frame = resumeDialog.querySelector("[data-resume-frame]");
    const status = resumeDialog.querySelector("[data-resume-status]");
    const message = resumeDialog.querySelector("[data-resume-message]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let closeTimer;
    let savedScrollY = 0;
    let pointerStartedOutside = false;

    resumeLink.setAttribute("aria-haspopup", "dialog");
    resumeLink.setAttribute("aria-controls", "resume-dialog");

    const finishClose = () => {
      window.clearTimeout(closeTimer);
      if (resumeDialog.open) resumeDialog.close();
    };

    const requestClose = () => {
      if (!resumeDialog.open || resumeDialog.classList.contains("is-closing")) return;
      if (reducedMotion.matches) {
        finishClose();
      } else {
        resumeDialog.classList.add("is-closing");
        // The timeout is a fallback if the browser does not deliver animationend.
        closeTimer = window.setTimeout(finishClose, 200);
      }
    };

    resumeDialog.addEventListener("animationend", (event) => {
      if (event.target === resumeDialog && event.animationName === "resume-leave") finishClose();
    });

    resumeLink.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (resumeDialog.open) return;
      savedScrollY = window.scrollY;
      resumeDialog.showModal();
      document.body.style.setProperty("--resume-scroll-offset", `${-savedScrollY}px`);
      document.body.classList.add("has-resume-open");
      if (!frame.hasAttribute("src")) frame.src = "resume.html?embedded=1&v=20261001-4";
      syncAnimationState();
    });

    frame.addEventListener("load", () => {
      if (!frame.hasAttribute("src")) return;
      try {
        // A same-origin 404 can also emit load. Keep the fallback visible in that case.
        if (frame.contentDocument && !frame.contentDocument.querySelector("#main")) {
          message.textContent = "The résumé could not be loaded. You can still download the PDF.";
          return;
        }
      } catch {
        // file:// previews may block document access even when the frame displays normally.
      }
      status.hidden = true;
      frame.hidden = false;
    });

    frame.addEventListener("error", () => {
      message.textContent = "The résumé could not be loaded. You can still download the PDF.";
    });

    resumeDialog.querySelector("[data-resume-close]").addEventListener("click", requestClose);
    resumeDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      requestClose();
    });
    resumeDialog.addEventListener("close", () => {
      window.clearTimeout(closeTimer);
      resumeDialog.classList.remove("is-closing");
      document.body.classList.remove("has-resume-open");
      document.body.style.removeProperty("--resume-scroll-offset");
      window.scrollTo(0, savedScrollY);
      resumeLink.focus({ preventScroll: true });
      syncAnimationState();
    });

    const isOutside = (event) => {
      const bounds = resumeDialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    resumeDialog.addEventListener("pointerdown", (event) => {
      pointerStartedOutside = event.target === resumeDialog && isOutside(event);
    });
    resumeDialog.addEventListener("click", (event) => {
      if (pointerStartedOutside && event.target === resumeDialog && isOutside(event)) requestClose();
      pointerStartedOutside = false;
    });

    // Key events do not bubble from an iframe; accept Escape only from our resume frame.
    window.addEventListener("message", (event) => {
      if (event.source === frame.contentWindow && event.origin === window.location.origin
          && event.data?.type === "resume:close") requestClose();
    });
  }

  document.addEventListener("visibilitychange", syncAnimationState);
  syncAnimationState();
})();
