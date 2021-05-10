import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
  background-color: ${({ theme }) => theme.secondary};

  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
  color:${({ theme }) => theme.primary};
}

.Toastify__toast-container {
    @media only screen and (max-width: 480px) {
      width: min(92%, 350px);
      padding: 4px;
      left: auto;
      top: 1rem;
      margin: 0;
    }
    .Toastify__toast {
      padding: 0;
      min-height: 0px;
      margin-bottom: 0.2rem !important;
      .Toastify__toast-body {
        width: 100%;
        padding: 0;
        background-color: ${({ theme }) => theme.secondary};
      }
    }
  }
`;

export default GlobalStyles;
