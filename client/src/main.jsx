// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import LoggedIn from "./LoggedIn.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoggedIn from "./LoggedIn.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/admin/" element={<ProtectedRoute />}>
          <Route path="loggedin" element={<LoggedIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
