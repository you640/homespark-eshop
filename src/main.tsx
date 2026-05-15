import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from 'virtual:pwa-register';
import App from "./App.tsx";
import "./index.css";

// Auto-update SW every hour
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nová verzia aplikácie je k dispozícii. Chcete ju aktualizovať?')) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
