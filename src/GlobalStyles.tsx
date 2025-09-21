import { createGlobalStyle } from 'styled-components';

import { fonts } from './styled';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
        margin: 0;
    }

    body {
        font-family: ${fonts.primary};
        font-size: 16px;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyles;
