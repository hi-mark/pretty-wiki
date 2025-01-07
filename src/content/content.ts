function replaceLogo() {
  // Select the main logo container
  const logoContainer = document.querySelector(".mw-logo");
  if (logoContainer) {
    // Remove existing images within the logo container
    const images = logoContainer.querySelectorAll("img");
    images.forEach((img) => img.remove());

    // Create a new image element for the custom logo
    const customLogo = document.createElement("img");
    customLogo.src = chrome.runtime.getURL("assets/icons/pretty-wiki-logo.svg");
    customLogo.alt = "Custom Logo";

    // Append the custom logo to the logo container
    logoContainer.appendChild(customLogo);
  }
}

function applyTheme(theme: string) {
  document.body.classList.remove("theme-light", "theme-dark", "theme-sepia");
  document.body.classList.add(`theme-${theme}`);
}

function createLoader() {
  console.log("Creating loader..."); 
  const loader = document.createElement('div');
  loader.id = 'customLoader';
  loader.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;
  document.body.appendChild(loader);

  // Inject CSS for loader
  const style = document.createElement('style');
  style.textContent = `
    .loader-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .loader {
      border: 10px solid #f3f3f3;
      border-radius: 50%;
      border-top: 10px solid #3498db;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

function removeLoader() {
  console.log("Removing loader..."); 
  const loader = document.getElementById('customLoader');
  if (loader) {
    loader.remove();
  }
}

function removeNavbar() {
  // Select the main logo container
  const navContainer = document.querySelector(".vector-main-menu-landmark");
  if (navContainer) {
    navContainer.remove();
  }
}

function init() {
  console.log("Initializing extension...");  // Debugging
  createLoader();  // Add loader before making changes

  replaceLogo();

  chrome.storage.sync.get("theme", ({ theme }) => {
    applyTheme(theme || "light");

    // Ensure loader is visible for at least 2 seconds
    setTimeout(() => {
      removeLoader();
    }, 1000);  // 2-second delay before removing the loader
  });

  removeNavbar();

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.theme) {
      applyTheme(changes.theme.newValue);
    }
  });
}

init();
