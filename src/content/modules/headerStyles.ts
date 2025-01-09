// src/content/modules/headerStyles.ts
export function injectCustomHeaderStyles() {
    const style = document.createElement("style");
    style.textContent = `
      /* ========== Wikipedia Header Overrides ========== */
      
      a {
        color: rgba(125, 103, 94, 0.95);
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24.5px;
      }
  
      .vector-pinned-container { 
        background-color: #F4F4F2;
      }
  
      .mw-page-container { 
        background-color: #F4F4F2;
      }
      body.theme-light {
        background-color: #F4F4F2;
      }
      header.vector-header.mw-header {
        background-color: rgba(0, 0, 0, 0.01);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 0.5px solid rgba(112, 107, 87, 0.25);
      }
  
      header.vector-header.mw-header .vector-header-start,
      header.vector-header.mw-header .vector-header-end {
        display: flex;
        justify-content: space-around;
        margin: 0;
        padding: 0;
      }
  
      .mw-logo {
        display: flex;
        align-items: center;
        margin-right: 1rem;
      }
      .mw-logo img {
        height: 40px;
        width: auto;
      }
  
      #p-search.vector-search-box {
        flex: 1;
        max-width: 600px;
      }
      #searchform .cdx-button.cdx-search-input__end-button {
        background-color: #eee;
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.3rem 1rem;
        cursor: pointer;
      }
      #searchform .cdx-text-input__input {
        border: 1px solid #aaa;
        border-radius: 4px;
      }
  
      .vector-user-links,
      .vector-user-menu-logged-out,
      .vector-user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
  
      .vector-dropdown-label.cdx-button {
        border: none;
        background: transparent;
      }
  
      /* ========== End Wikipedia Header Overrides ========== */
    `;
    document.head.appendChild(style);
  }
  