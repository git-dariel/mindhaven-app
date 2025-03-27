/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  primary: "#0066FF", // Vibrant blue
  secondary: "#2D7FFF", // Lighter blue
  accent: "#F472B6", // Accent color - Pink for warmth
  background: {
    dark: "#0A0A0F", // Deep dark
    darker: "#050507", // Almost black
    card: "rgba(20, 20, 35, 0.6)", // Semi-transparent dark blue
    glass: "rgba(255, 255, 255, 0.03)", // Glass effect
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.8)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
  gradient: {
    primary: ["#0066FF", "#0047B3"],
    dark: ["rgba(10, 10, 15, 0)", "rgba(5, 5, 7, 0.95)"],
    glass: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"],
  },
  waveform: {
    active: "#0066FF",
    inactive: "rgba(0, 102, 255, 0.3)",
  },
  border: {
    light: "rgba(255, 255, 255, 0.04)",
  },
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
