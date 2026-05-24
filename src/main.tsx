import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Robust cleanup for any legacy service workers and caches from previous Vinxi SSR builds
if (typeof window !== "undefined") {
  const CLEANUP_VERSION = "pinfuel_cleanup_v5";
  
  if (!localStorage.getItem(CLEANUP_VERSION)) {
    const unregisterAll = async () => {
      let shouldReload = false;

      // 1. Unregister all service workers
      if ("serviceWorker" in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          if (registrations.length > 0) {
            console.log(`Found ${registrations.length} legacy service workers. Unregistering...`);
            for (const reg of registrations) {
              await reg.unregister();
            }
            shouldReload = true;
          }
        } catch (e) {
          console.error("Failed to unregister service workers:", e);
        }
      }

      // 2. Clear all cache storage keys
      if ("caches" in window) {
        try {
          const keys = await caches.keys();
          if (keys.length > 0) {
            console.log(`Found ${keys.length} legacy caches. Clearing...`);
            for (const key of keys) {
              await caches.delete(key);
            }
            shouldReload = true;
          }
        } catch (e) {
          console.error("Failed to clear caches:", e);
        }
      }

      // Mark as cleared to prevent infinite reload loops
      localStorage.setItem(CLEANUP_VERSION, "true");

      // 3. Force hard reload with timestamp to bypass any network cache
      if (shouldReload) {
        console.log("Cleanup complete. Performing cache-busting reload...");
        const cleanUrl = window.location.origin + window.location.pathname + "?cache_bust=" + Date.now();
        window.location.replace(cleanUrl);
      }
    };

    unregisterAll();
  }
}

const router = getRouter();

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
