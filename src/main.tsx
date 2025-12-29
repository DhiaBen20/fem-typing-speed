import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import RoundProvider from "./commponents/RoundProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RoundProvider>
            <App />
        </RoundProvider>
    </StrictMode>,
);
