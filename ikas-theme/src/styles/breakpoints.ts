const unit = "px";

export const point = {
  sm: 540,
  md: 720,
  lg: 960,
  xl: 1140,
  xxl: 1320,
};

const breakpoints = {
  sm: point.sm + unit,
  md: point.md + unit,
  lg: point.lg + unit,
  xl: point.xl + unit,
  xxl: point.xxl + unit,
};

const media = (width: string) => `@media only screen and (max-width: ${width})`;

export const mediaQuery = {
  sm: media(breakpoints.sm),
  md: media(breakpoints.md),
  lg: media(breakpoints.lg),
  xl: media(breakpoints.xl),
  xxl: media(breakpoints.xxl),
};

export default breakpoints;
