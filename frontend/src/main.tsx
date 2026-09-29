import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

/**
 * Provider order matters:
 *   ThemeProvider  outermost — nothing paints before the theme is known.
 *   AuthProvider   inside it  — redirects must not flash the wrong palette.
 *   BrowserRouter  innermost of the three, but above App so ProtectedRoute
 *                   and the "return to where you were" redirect have a
 *                   location to work with.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
