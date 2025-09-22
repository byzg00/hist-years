import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TitleLine, TitleText, TitleWrapper } from './styled';
export var Title = function (props) {
    var title = props.title;
    return (_jsxs(TitleWrapper, { children: [_jsx(TitleLine, {}), _jsx(TitleText, { children: title })] }));
};
