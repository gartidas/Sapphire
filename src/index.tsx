import React from "react";
import ReactDOM from "react-dom";
import { StylesProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { theme } from "./theme/theme";
import GlobalStyles from "./theme/GlobalStyles";
import UserProvider from "./contextProviders/UserProvider";
import AuthProvider from "./contextProviders/AuthProvider";
import ModalProvider from "./contextProviders/ModalProvider";
import MemoryProvider from "./contextProviders/MemoryProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider>
            <UserProvider>
              <ModalProvider>
                <MemoryProvider>
                  <App />
                </MemoryProvider>
              </ModalProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
