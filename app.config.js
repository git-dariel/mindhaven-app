import "dotenv/config";

export default {
  expo: {
    name: "mindhaven-app",
    slug: "mindhaven-app",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "mindhaven",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiUrl: process.env.API_URL || "http://192.168.1.8:3000/api",
      googleCredentialsPath:
        process.env.GOOGLE_APPLICATION_CREDENTIALS || "./mindhaven-tts-e1026fbd1dc1.json",
      googleProjectId: process.env.GOOGLE_CLOUD_PROJECT || "mindhaven-tts",
    },
  },
};
