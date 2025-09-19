var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { createGlobalStyle } from 'styled-components';
import { fonts } from './styled';
var GlobalStyles = createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    * {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n    }\n\n    body {\n        font-family: ", ";\n        font-size: 16px;\n        line-height: 1.5;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n    }\n"], ["\n    * {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n    }\n\n    body {\n        font-family: ", ";\n        font-size: 16px;\n        line-height: 1.5;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n    }\n"])), fonts.primary);
export default GlobalStyles;
var templateObject_1;
