function replaceLogo() {
  // Select the main logo container
  const logoContainer = document.querySelector(".mw-logo");
  if (logoContainer) {
    // Remove existing images within the logo container
    const images = logoContainer.querySelectorAll("img");
    images.forEach((img) => img.remove());

    // Create a new image element for the custom logo
    const customLogo = document.createElement("img");
    customLogo.src = chrome.runtime.getURL("assets/icons/pretty-wiki-logo.png");
    customLogo.alt = "Custom Logo";
    customLogo.style.width = "auto"; // Adjust width as needed
    customLogo.style.height = "50px"; // Adjust height as needed

    // Append the custom logo to the logo container
    logoContainer.appendChild(customLogo);
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
