import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById("root")).render(
	<Theme>
	<React.StrictMode>
		<App />
	</React.StrictMode>
	</Theme>
);
