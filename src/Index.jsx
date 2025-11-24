import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./utils/suppressDevToolsWarnings";
import envValidator from "./utils/envValidator";
import logger from "./utils/logger";

// Validate environment variables
const envResult = envValidator.logResults();

// Log application startup
logger.info('Application starting', envValidator.getEnvInfo());

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
