import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { App as CapApp } from "@capacitor/app";

export const isNative = Capacitor.isNativePlatform();
export const getPlatform = () => Capacitor.getPlatform(); // 'ios', 'android', or 'web'

/**
 * Initialize native device settings (Status Bar, Splash Screen, Hardware Back Button)
 */
export async function initNativeApp(onBackButton?: () => boolean | void) {
  if (!isNative) return;

  try {
    // Hide splash screen smoothly after app hydration
    await SplashScreen.hide({ fadeOutDuration: 400 });
  } catch (e) {
    console.warn("Native splash screen not available:", e);
  }

  try {
    // Configure Status Bar for dark aesthetic
    await StatusBar.setStyle({ style: Style.Dark });
    if (Capacitor.getPlatform() === "android") {
      await StatusBar.setBackgroundColor({ color: "#1b0d26" });
    }
  } catch (e) {
    console.warn("Native status bar not configured:", e);
  }

  // Handle hardware back button on Android
  if (Capacitor.getPlatform() === "android") {
    CapApp.addListener("backButton", ({ canGoBack }) => {
      if (onBackButton) {
        const handled = onBackButton();
        if (handled) return;
      }
      if (canGoBack) {
        window.history.back();
      } else {
        CapApp.exitApp();
      }
    });
  }
}

/**
 * Trigger subtle haptic feedback for user interactions
 */
export async function triggerHaptic(
  type: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "light",
) {
  if (!isNative) {
    // Web vibration fallback if supported
    if ("vibrate" in navigator) {
      if (type === "warning" || type === "error") {
        navigator.vibrate([100, 50, 100]);
      } else {
        navigator.vibrate(25);
      }
    }
    return;
  }

  try {
    switch (type) {
      case "light":
        await Haptics.impact({ style: ImpactStyle.Light });
        break;
      case "medium":
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;
      case "heavy":
        await Haptics.impact({ style: ImpactStyle.Heavy });
        break;
      case "success":
        await Haptics.notification({ type: NotificationType.Success });
        break;
      case "warning":
        await Haptics.notification({ type: NotificationType.Warning });
        break;
      case "error":
        await Haptics.notification({ type: NotificationType.Error });
        break;
    }
  } catch (e) {
    console.warn("Haptics not available:", e);
  }
}
