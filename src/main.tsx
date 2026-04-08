import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallbackComponent from "./ui/ErrorFallbackComponent.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onReset={() => window.location.replace("/homepage")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
