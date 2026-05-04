
// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  applyChaiStyles();
});

// ==========================
// MAIN ENGINE
// ==========================
function applyChaiStyles() {
  const elements = document.querySelectorAll("*");

  elements.forEach((el) => {
    const classes = [...el.classList];

    classes.forEach((cls) => {

      // Hover handled separately
      if (cls.startsWith("chai-hover-")) {
        applyHover(el, cls);
        return;
      }

      if (!cls.startsWith("chai-")) return;

      parseAndApply(el, cls);
      el.classList.remove(cls);
    });
  });
}

// ==========================
// PARSER
// ==========================
function parseAndApply(el, cls) {
  const raw = cls.replace("chai-", "");
  const parts = raw.split("-");

  const key = parts[0];
  const val = parts.slice(1).join("-");

  if (handleSpacing(el, key, val)) return;
  if (handleSizing(el, key, val)) return;
  if (handleColors(el, key, val)) return;
  if (handleTypography(el, key, val)) return;
  if (handleFlex(el, key, val)) return;
  if (handleBorder(el, key, val)) return;
  if (handleEffects(el, key, val)) return;
}

// ==========================
// SPACING
// ==========================
function handleSpacing(el, key, val) {
  const size = addPx(val);

  switch (key) {
    case "p": el.style.padding = size; return true;
    case "px":
      el.style.paddingLeft = size;
      el.style.paddingRight = size;
      return true;
    case "py":
      el.style.paddingTop = size;
      el.style.paddingBottom = size;
      return true;

    case "m": el.style.margin = size; return true;
    case "mb": el.style.marginBottom = size; return true;
    case "mt": el.style.marginTop = size; return true;
  }

  return false;
}

// ==========================
// SIZING
// ==========================
function handleSizing(el, key, val) {
  if (key === "w") {
    el.style.width = formatSize(val);
    return true;
  }

  if (key === "h") {
    el.style.height = formatSize(val);
    return true;
  }

  return false;
}

// ==========================
// COLORS + GRADIENT
// ==========================
function handleColors(el, key, val) {
  const colorMap = {
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#22c55e",
    black: "#000",
    white: "#fff",
    gray: "#6b7280",
    yellow: "#facc15"
  };

  // 🌈 Gradient background support
  if (key === "bg" && val === "gradient") {
    el.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    return true;
  }

  if (key === "bg") {
    el.style.backgroundColor = colorMap[val] || val;
    return true;
  }

  if (key === "color") {
    el.style.color = colorMap[val] || val;
    return true;
  }

  if (key === "opacity") {
    el.style.opacity = val / 100;
    return true;
  }

  return false;
}

// ==========================
// TYPOGRAPHY
// ==========================
function handleTypography(el, key, val) {
  if (key === "fs") {
    el.style.fontSize = addPx(val);
    return true;
  }

  if (key === "fw") {
    el.style.fontWeight = val;
    return true;
  }

  if (key === "text") {
    el.style.textAlign = val;
    return true;
  }

  if (key === "lh") {
    el.style.lineHeight = val;
    return true;
  }

  return false;
}

// ==========================
// FLEXBOX
// ==========================
function handleFlex(el, key, val) {
  if (key === "flex") {
    el.style.display = "flex";

    if (val === "center") {
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
    }

    if (val === "between") {
      el.style.justifyContent = "space-between";
    }

    return true;
  }

  if (key === "items") {
    el.style.alignItems = val;
    return true;
  }

  return false;
}

// ==========================
// BORDER
// ==========================
function handleBorder(el, key, val) {
  if (key === "rounded") {
    el.style.borderRadius = addPx(val);
    return true;
  }

  return false;
}

// ==========================
// EFFECTS (shadow + transition)
// ==========================
function handleEffects(el, key, val) {

  if (key === "shadow") {
    const shadows = {
      1: "0 4px 10px rgba(0,0,0,0.1)",
      2: "0 10px 25px rgba(0,0,0,0.2)",
      3: "0 15px 40px rgba(0,0,0,0.3)"
    };

    el.style.boxShadow = shadows[val] || shadows[2];
    return true;
  }

  if (key === "transition") {
    el.style.transition = "all 0.3s ease";
    return true;
  }

  return false;
}

// ==========================
// HOVER SYSTEM
// ==========================
function applyHover(el, cls) {
  const raw = cls.replace("chai-hover-", "");
  const [key, val] = raw.split("-");

  const original = {
    bg: el.style.backgroundColor,
    transform: el.style.transform
  };

  el.addEventListener("mouseenter", () => {
    el.style.transition = "all 0.3s ease";

    if (key === "bg") {
      el.style.backgroundColor = val;
    }

    if (key === "scale") {
      el.style.transform = `scale(${val})`;
    }
  });

  el.addEventListener("mouseleave", () => {
    if (key === "bg") {
      el.style.backgroundColor = original.bg;
    }

    if (key === "scale") {
      el.style.transform = original.transform;
    }
  });
}

// ==========================
// HELPERS
// ==========================
function addPx(val) {
  return isNaN(val) ? val : val + "px";
}

function formatSize(val) {
  if (val === "full") return "100%";
  if (val === "screen") return "100vh";
  return addPx(val);
}