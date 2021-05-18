import React from "react";
import ReactDOM from "react-dom";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./utils/theme";
import AuthProvider from "./contextProviders/AuthProvider";
import GlobalStyles from "./utils/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
