import breakpoints from "./breakpoints";
export const sizes = `(max-width: 320px) 300px, (max-width: 450px) 400px, (max-width: ${breakpoints.sm}) ${breakpoints.sm}, (max-width: ${breakpoints.md}) ${breakpoints.md}, (max-width: ${breakpoints.lg}) ${breakpoints.lg}, (max-width: ${breakpoints.xl}) ${breakpoints.xl}, (max-width: ${breakpoints.xxl}) ${breakpoints.xxl}, ${breakpoints.xxl}`;
