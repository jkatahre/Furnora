import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./config/store";
import "./index.css";

// Brand colours from the store settings.
const root = document.documentElement.style;
root.setProperty("--color-brand", store.theme.brand);
root.setProperty("--color-brand-dark", store.theme.brandDark);
root.setProperty("--color-brand-soft", store.theme.brandSoft);
document.title = `${store.name} · ${store.tagline}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
