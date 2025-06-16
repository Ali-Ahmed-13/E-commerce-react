import React from "react";
import ReactDOM from "react-dom/client";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./Css/components/button.css";
import "./Css/components/alerts.css";
import "./Css/components/loading.css";
import "./Css/components/google.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import CartChangerContext from "./Context/CartChanger";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <WindowContext>
        <MenuContext>
          <CartChangerContext>
            <Router>
              <App />
            </Router>
          </CartChangerContext>
        </MenuContext>
      </WindowContext>
    </React.StrictMode>
  </>
);
