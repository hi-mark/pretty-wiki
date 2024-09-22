interface Settings {
  theme: string;
  fontSize: number;
  fontFamily: string;
  lineSpacing: number;
}

class Popup {
  private themeSelect: HTMLSelectElement;
  private fontSizeInput: HTMLInputElement;
  private fontSizeValue: HTMLSpanElement;
  private fontFamilySelect: HTMLSelectElement;
  private lineSpacingInput: HTMLInputElement;
  private lineSpacingValue: HTMLSpanElement;
  private saveButton: HTMLButtonElement;

  constructor() {
    this.themeSelect = document.getElementById("theme") as HTMLSelectElement;
    this.fontSizeInput = document.getElementById(
      "fontSize"
    ) as HTMLInputElement;
    this.fontSizeValue = document.getElementById(
      "fontSizeValue"
    ) as HTMLSpanElement;
    this.fontFamilySelect = document.getElementById(
      "fontFamily"
    ) as HTMLSelectElement;
    this.lineSpacingInput = document.getElementById(
      "lineSpacing"
    ) as HTMLInputElement;
    this.lineSpacingValue = document.getElementById(
      "lineSpacingValue"
    ) as HTMLSpanElement;
    this.saveButton = document.getElementById(
      "saveButton"
    ) as HTMLButtonElement;

    this.loadSettings();
    this.addEventListeners();
  }

  private loadSettings(): void {
    chrome.storage.sync.get(
      ["theme", "fontSize", "fontFamily", "lineSpacing"],
      (result: { [key: string]: any }) => {
        const settings: Settings = {
          theme: (result.theme as string) ?? "light",
          fontSize: (result.fontSize as number) ?? 16,
          fontFamily: (result.fontFamily as string) ?? "Arial, sans-serif",
          lineSpacing: (result.lineSpacing as number) ?? 1.5,
        };

        this.updateUI(settings);
      }
    );
  }

  private updateUI(settings: Settings): void {
    this.themeSelect.value = settings.theme;
    this.fontSizeInput.value = settings.fontSize.toString();
    this.fontSizeValue.textContent = settings.fontSize.toString();
    this.fontFamilySelect.value = settings.fontFamily;
    this.lineSpacingInput.value = settings.lineSpacing.toString();
    this.lineSpacingValue.textContent = settings.lineSpacing.toString();
  }

  private addEventListeners(): void {
    this.fontSizeInput.addEventListener(
      "input",
      this.updateFontSizeValue.bind(this)
    );
    this.lineSpacingInput.addEventListener(
      "input",
      this.updateLineSpacingValue.bind(this)
    );
    this.saveButton.addEventListener("click", this.saveSettings.bind(this));
  }

  private updateFontSizeValue(): void {
    this.fontSizeValue.textContent = this.fontSizeInput.value;
  }

  private updateLineSpacingValue(): void {
    this.lineSpacingValue.textContent = this.lineSpacingInput.value;
  }

  private saveSettings(): void {
    const settings: Settings = {
      theme: this.themeSelect.value,
      fontSize: parseInt(this.fontSizeInput.value),
      fontFamily: this.fontFamilySelect.value,
      lineSpacing: parseFloat(this.lineSpacingInput.value),
    };

    chrome.storage.sync.set(settings, () => {
      console.log("Settings saved");
      this.updateActiveTab(settings);
    });
  }

  private updateActiveTab(settings: Settings): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, {
          action: "updateSettings",
          settings: settings,
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Popup();
});
