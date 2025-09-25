import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { RecipeProvider } from "./context/recipes.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <RecipeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipeProvider>
);
