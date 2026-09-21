import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.vetacademy.app",
  appName: "VetAcademy",
  webDir: "dist",
  backgroundColor: "#1b0d26",
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#1b0d26",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1b0d26",
    },
  },
  server: {
    androidScheme: "https",
  },
};

export default config;
