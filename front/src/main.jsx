import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UserProvider } from "./contexts/UserContext.jsx";
import { Provider as AuthProvider } from "./contexts/AuthContext.jsx";
import { Router } from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
