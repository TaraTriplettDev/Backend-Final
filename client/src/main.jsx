import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ToDo from "./Components/ToDo.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// This module handles the structure of the routes and forms 
// It is the direct point of contact with index.html 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/admin/" element={<ProtectedRoute />}>
          <Route path="loggedin" element={<ToDo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
