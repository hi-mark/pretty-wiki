// src/content/modules/navbar.ts
export function removeNavbar() {
    const navContainer = document.querySelector(".vector-main-menu-landmark");
    if (navContainer) {
      navContainer.remove();
    }
  }
  
  export function removeNavbarTopText() {
    const topText = document.querySelector("#toc-mw-content-text");
    if (topText) {
      topText.remove();
    }
  }
  
  export function removeContentHeaderButton() {
    const unpinButton = document.querySelector(".vector-pinnable-header");
    if (unpinButton) {
      console.log("Removing the pinned header button...");
      unpinButton.remove();
    }
  }
  