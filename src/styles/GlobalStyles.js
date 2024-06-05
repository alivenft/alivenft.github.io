import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1e1e1e;
    color: #e0e0e0;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    animation: moveGrid 10s linear infinite;
  }

  @keyframes moveGrid {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #ffab00;
    font-family: 'Montserrat', sans-serif;
  }

  main {
    padding-bottom: 20px;
  }
`;

export default GlobalStyle;
