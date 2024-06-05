import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #20232a;
    color: #61dafb;
    font-family: 'Kdam Thmor Pro', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #61dafb;
  }

  main {
    padding-bottom: 20px; /* adjust if needed */
  }
`;

export default GlobalStyle;
