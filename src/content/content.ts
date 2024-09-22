function replaceLogo() {
  const logoElement = document.querySelector(".mw-wiki-logo") as HTMLElement;
  if (logoElement) {
    logoElement.style.backgroundImage = `url(${chrome.runtime.getURL(
      "assets/icons/pretty-wiki-logo.png"
    )})`;
    logoElement.style.backgroundPosition = "center";
    logoElement.style.backgroundSize = "contain";
  }
}

function applyTheme(theme: string) {
  document.body.classList.remove("theme-light", "theme-dark", "theme-sepia");
  document.body.classList.add(`theme-${theme}`);
}

function init() {
  replaceLogo();
  // Get user's theme preference from storage
  chrome.storage.sync.get("theme", ({ theme }) => {
    applyTheme(theme || "light");
  });

  // Listen for theme changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.theme) {
      applyTheme(changes.theme.newValue);
    }
  });

  // Other initialization code...
}

init();
