import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

// 🔧 Update with your actual EAS project ID from https://expo.dev/projects/<your-project>
const EAS_PROJECT_ID = "de908f48-399a-4b97-8cdd-8bccdc82c18e"; // ✅ already correct
const PROJECT_SLUG = "HealthFrontend"; // ✅ should match your app's slug on expo.dev
const OWNER = "prakharmadharia"; // 🔧 Replace this with your actual Expo account username

// App base name
const APP_NAME = "Health App";

// Bundle identifiers and package names
const BUNDLE_IDENTIFIER = "com.prakharmadharia.healthDoc"; // ✅ already set in your app.json
const PACKAGE_NAME = "com.prakharmadharia.healthDoc"; // ✅ Android package

const ICON = "./assets/images/icon.png";
const ADAPTIVE_ICON = "./assets/images/adaptive-icon.png";
const SCHEME = "healthapp";

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);

  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme, apiUrl } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") || "development"
    );

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version,
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon,
    scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
      API_URL: apiUrl, // 👈 Access this via Constants.expoConfig?.extra?.API_URL
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-document-picker",
        {
          iCloudContainerEnvironment: "Production",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-dev-client",
        {
          "launchMode": "most-recent"
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};

// 🔁 Per-environment dynamic settings
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
      apiUrl: process.env.EXPO_PUBLIC_API_UR, // 🔧 Change this to your production API URL
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: `${SCHEME}-preview`,
      apiUrl: process.env.EXPO_PUBLIC_API_UR, // 🔧 Update this
    };
  }

  // development
  return {
    name: `${APP_NAME} Dev`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: `${SCHEME}-dev`,
    apiUrl: process.env.EXPO_PUBLIC_API_UR, // 🔧 Update this
  };
};
