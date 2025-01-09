// src/content/modules/loader.ts
export function createLoader() {
    console.log("Creating loader...");
    const loader = document.createElement("div");
    loader.id = "customLoader";
    loader.innerHTML = `
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    `;
    document.body.appendChild(loader);
  
    // Inject CSS for loader
    const style = document.createElement("style");
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
  
  export function removeLoader() {
    console.log("Removing loader...");
    const loader = document.getElementById("customLoader");
    if (loader) {
      loader.remove();
    }
  }
  