import "./styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReviewsPage from "./pages/ReviewsPage.jsx";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")).render(<StrictMode><ReviewsPage /></StrictMode>);
