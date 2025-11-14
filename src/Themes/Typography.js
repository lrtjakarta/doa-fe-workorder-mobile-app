import Metrics from './Metrics';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans-Regular';
export const FONT_FAMILY_BOLD = 'OpenSans-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,

  // iFarm
  size100: Metrics.screenWidth / 3.75,
  size75: Metrics.screenWidth / 5,
  size60: Metrics.screenWidth / 6.25,
  size55: Metrics.screenWidth / 6.81818182,
  size50: Metrics.screenWidth / 7.5,
  size40: Metrics.screenWidth / 9.375,
  size45: Metrics.screenWidth / 8.3333,
  size37: Metrics.screenWidth / 10,
  size30: Metrics.screenWidth / 12.5,
  size27: Metrics.screenWidth / 13.88,
  size25: Metrics.screenWidth / 15,
  size22: Metrics.screenWidth / 16.59,
  size20: Metrics.screenWidth / 18.75,
  size18: Metrics.screenWidth / 20.8,
  size16: Metrics.screenWidth / 23.4375,
  size15: Metrics.screenWidth / 25,
  size14: Metrics.screenWidth / 26.78571,
  size13: Metrics.screenWidth / 28.8461539,
  size12: Metrics.screenWidth / 31.25,
  size10: Metrics.screenWidth / 37.5,
  size8: Metrics.screenWidth / 46.85,
  size7: Metrics.screenWidth / 53.57,
  size6: Metrics.screenWidth / 57.6923,
}

export default size
