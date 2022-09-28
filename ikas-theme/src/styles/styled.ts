export const SIDENAV_WIDTH = 320;
export const theme = {
  zIndex: {
    headerNavigationItem: 1,
    accountMobileMenu: 2,
    accountMobileToggleMenuButton: 3,
    sidenav: 9,
    modal: 10,
  },
  fontSize: {
    xs: ".75rem",
    sm: ".875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },
  inputBorderRadius: "12px",
  color: {
    headerBg: "var(--header-background-color)",
    headerText: "var(--header-text-color)",

    sidenavBg: "var(--sidenav-bg)",
    sidenavText: "var(--sidenav-text)",

    footerBg: "var(--footer-background-color)",
    primaryText: "var(--primary-text-color)",
    secondaryText: "var(--secondary-text-color)",
    finalPrice: "var(--price-color)",
    sellPrice: "var(--strikethrough-price-color)",

    button: "var(--button-color)",
    buttonBg: "var(--button-background-color)",
    secondaryButton: "var(--secondary-button-color)",
    secondaryButtonBg: "var(--secondary-button-background-color)",

    border: "var(--border-color)",
    inputBorder: "var(--input-border-color)",
    inputBackground: "var(--input-background-color)",
    inputText: "var(--input-text)",
    checkboxBorder: "var(--checkbox-border)",
    checkboxBg: "var(--checkbox-bg)",
    checkbox: "var(--checkbox)",

    productBadgeBg: "var(--product-badge-bg)",
    productBadgeText: "var(--product-badge-text)",

    link: "var(--link)",

    white: "#FFFFFF",
    black: "#000000",
    red: "#ed2727",
    green: "#52c41a",
    blue: "#2563eb",
    orange: "#ff9800",
  },
};

export type Theme = typeof theme;
