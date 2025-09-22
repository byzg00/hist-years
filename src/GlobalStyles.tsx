import { createGlobalStyle } from 'styled-components';

import { fonts } from './styled';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
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
        text-rendering: optimizeLegibility;
        text-size-adjust: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
    }

    h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, figcaption, blockquote, dl, dd {
        margin: 0;
        padding: 0;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
    }
`;

export default GlobalStyles;
