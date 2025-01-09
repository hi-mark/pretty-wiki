// src/content/modules/logo.ts
export function replaceLogo() {
    const logoContainer = document.querySelector(".mw-logo");
    if (logoContainer) {
      const images = logoContainer.querySelectorAll("img");
      images.forEach((img) => img.remove());
  
      const customLogo = document.createElement("img");
      customLogo.src = chrome.runtime.getURL("assets/icons/pretty-wiki-logo.svg");
      customLogo.alt = "Custom Logo";
  
      logoContainer.appendChild(customLogo);
    }
  }
  