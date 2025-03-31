/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#000000";
const tintColorDark = "#FFFFFF";

export const Colors = {
  primary: "#000000", // Black
  secondary: "#333333", // Dark gray
  accent: "#666666", // Medium gray
  background: {
    dark: "#FFFFFF", // White
    darker: "#F5F5F5", // Light gray
    card: "rgba(245, 245, 245, 0.6)", // Semi-transparent light gray
    glass: "rgba(0, 0, 0, 0.03)", // Glass effect
  },
  text: {
    primary: "#000000", // Black
    secondary: "rgba(0, 0, 0, 0.8)", // Semi-transparent black
    muted: "rgba(0, 0, 0, 0.5)", // More transparent black
  },
  gradient: {
    primary: ["#000000", "#333333"], // Black to dark gray
    dark: ["rgba(245, 245, 245, 0)", "rgba(245, 245, 245, 0.95)"], // Transparent to light gray
    glass: ["rgba(0, 0, 0, 0.05)", "rgba(0, 0, 0, 0.02)"], // Glass effect
  },
  waveform: {
    active: "#000000", // Black
    inactive: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
  },
  border: {
    light: "rgba(0, 0, 0, 0.1)", // Very light gray
  },
  light: {
    text: "#000000", // Black
    background: "#FFFFFF", // White
    tint: tintColorLight,
    icon: "#555555", // Gray
    tabIconDefault: "#999999", // Light gray
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#FFFFFF", // White
    background: "#000000", // Black
    tint: tintColorDark,
    icon: "#DDDDDD", // Very light gray
    tabIconDefault: "#AAAAAA", // Light gray
    tabIconSelected: tintColorDark,
  },
};
