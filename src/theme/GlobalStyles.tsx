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
  scrollbar-color:${({ theme }) => theme.primary} #F5F5F5;
  scrollbar-width:thin;
}

.Toastify__toast-container {
    @media only screen and (max-width: 480px) {
      width: min(92%, 21.875rem);
      padding: 0.25rem;
      left: auto;
      top: 1rem;
      margin: 0;
    }
    .Toastify__toast {
      padding: 0;
      min-height: 0;
      margin-bottom: 0.2rem !important;
      .Toastify__toast-body {
        width: 100%;
        padding: 0;
        background-color: ${({ theme }) => theme.secondary};
      }
    }
  }

::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  -moz-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  background-color: ${({ theme }) => theme.primary};
}

canvas{
  position: fixed !important;
}
`;

export default GlobalStyles;
