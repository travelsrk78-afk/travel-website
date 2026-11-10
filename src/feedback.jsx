import "./styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FeedbackPage from "./pages/FeedbackPage.jsx";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")).render(<StrictMode><FeedbackPage /></StrictMode>);
