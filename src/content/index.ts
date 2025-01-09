// src/content/index.ts
import { replaceLogo } from "./modules/logo";
import { applyTheme } from "./modules/theme";
import { createLoader, removeLoader } from "./modules/loader";
import {
  removeNavbar,
  removeNavbarTopText,
  removeContentHeaderButton,
} from "./modules/navbar";
import { injectCustomHeaderStyles } from "./modules/headerStyles";

function init() {
  console.log("Initializing extension...");
  createLoader();

  replaceLogo();
  removeNavbar();
  removeNavbarTopText();
  removeContentHeaderButton();
  injectCustomHeaderStyles();

  // Get theme from storage and apply it
  chrome.storage.sync.get("theme", ({ theme }) => {
    applyTheme(theme || "light");

    // You can keep your loader around a bit to show the user
    setTimeout(() => {
      removeLoader();
    }, 1000);
  });

  // Listen for storage changes (e.g., theme changes)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.theme) {
      applyTheme(changes.theme.newValue);
    }
  });
}

init();
