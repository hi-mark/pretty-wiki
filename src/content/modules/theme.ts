// src/content/modules/theme.ts
export function applyTheme(theme: string) {
    document.body.classList.remove("theme-light", "theme-dark", "theme-sepia");
    document.body.classList.add(`theme-${theme}`);
  }
  