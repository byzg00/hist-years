var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { colors, mediaQuery } from '../../styled';
import { Chevron } from './chevron';
export var PeriodChangerWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    position: relative;\n    z-index: 1;\n    ", " {\n        gap: 11px;\n    }\n"], ["\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n    position: relative;\n    z-index: 1;\n    ", " {\n        gap: 11px;\n    }\n"])), mediaQuery.lt1000);
export var PeriodChangerContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    gap: 39px;\n"], ["\n    display: flex;\n    gap: 39px;\n"])));
export var IndicatorsContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: none;\n    gap: 10px;\n    ", " {\n        display: flex;\n    }\n"], ["\n    display: none;\n    gap: 10px;\n    ", " {\n        display: flex;\n    }\n"])), mediaQuery.lt1000);
export var Indicator = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 6px;\n    height: 6px;\n    border-radius: 50%;\n    background-color: ", ";\n    opacity: ", ";\n    cursor: ", ";\n    transition: opacity 0.3s ease;\n\n    &:hover {\n        opacity: ", ";\n    }\n"], ["\n    width: 6px;\n    height: 6px;\n    border-radius: 50%;\n    background-color: ", ";\n    opacity: ", ";\n    cursor: ", ";\n    transition: opacity 0.3s ease;\n\n    &:hover {\n        opacity: ", ";\n    }\n"])), colors.blackBlue, function (_a) {
    var $opacity = _a.$opacity;
    return $opacity;
}, function (_a) {
    var $isActive = _a.$isActive;
    return $isActive ? 'default' : 'pointer';
}, function (_a) {
    var $isActive = _a.$isActive;
    return $isActive ? 1 : 0.6;
});
export var PeriodCounter = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-size: 14px;\n    font-weight: 400;\n    color: ", ";\n    line-height: 1;\n"], ["\n    font-size: 14px;\n    font-weight: 400;\n    color: ", ";\n    line-height: 1;\n"])), colors.blackBlue);
export var ButtonsContainer = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    display: flex;\n    gap: 20px;\n    align-items: center;\n    ", " {\n        gap: 8px;\n    }\n"], ["\n    display: flex;\n    gap: 20px;\n    align-items: center;\n    ", " {\n        gap: 8px;\n    }\n"])), mediaQuery.lt1000);
export var ArrowIcon = styled(Chevron)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var $direction = _a.$direction;
    return $direction === 'left' ? '' : 'transform: rotate(-180deg)';
});
var disabledStyle = function (_a) {
    var $isDisabled = _a.$isDisabled;
    return $isDisabled ? "\n    border: 1px solid ".concat(hexToRgba(colors.blackBlue, 0.2), ";\n    color: ").concat(hexToRgba(colors.blackBlue, 0.2), ";\n") : '';
};
export var ChangeButton = styled.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    border: 1px solid ", ";\n    color: ", ";\n    background: transparent;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: ", ";\n    transition: opacity 0.3s ease;\n    ", "\n\n    &:hover {\n        border: 1px solid ", ";\n        color: ", ";\n        ", "\n    }\n\n    &:active {\n        border: 1px solid ", ";\n        color: ", ";\n        ", "\n    }\n\n    ", " {\n        width: 25px;\n        height: 25px;\n    }\n"], ["\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    border: 1px solid ", ";\n    color: ", ";\n    background: transparent;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: ", ";\n    transition: opacity 0.3s ease;\n    ", "\n\n    &:hover {\n        border: 1px solid ", ";\n        color: ", ";\n        ", "\n    }\n\n    &:active {\n        border: 1px solid ", ";\n        color: ", ";\n        ", "\n    }\n\n    ", " {\n        width: 25px;\n        height: 25px;\n    }\n"])), hexToRgba(colors.blackBlue, 0.6), colors.blackBlue, function (_a) {
    var $isDisabled = _a.$isDisabled;
    return $isDisabled ? 'default' : 'pointer';
}, disabledStyle, hexToRgba(colors.blackBlue, 0.35), hexToRgba(colors.blackBlue, 0.65), disabledStyle, hexToRgba(colors.blackBlue, 0.8), hexToRgba(colors.blackBlue, 0.8), disabledStyle, mediaQuery.lt1000);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
