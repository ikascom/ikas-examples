export const theme = {
  zIndex: {
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
    headerText: "#000",
    footerBg: "var(--footer-background-color)",
    primaryText: "var(--primary-text-color)",
    secondaryText: "var(--secondary-text-color)",
    price: "var(--price-color)",
    strikethroughPrice: "var(--strikethrough-price-color)",
    buttonBg: "var(--button-background-color)",
    button: "var(--button-color)",
    border: "var(--border-color)",
    inputBorder: "var(--input-border-color)",
    inputBackground: "var(--input-background-color)",
    inputText: "var(--input-text)",

    white: "#FFFFFF",
    black: "#000000",
    red: "#ed2727",
    green: "#52c41a",
  },
};

export type Theme = typeof theme;
