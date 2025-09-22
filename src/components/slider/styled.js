var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import { colors, fonts, mediaQuery } from '../../styled';
import { Chevron } from '../period-changer/chevron';
export var SliderWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor: pointer;\n    margin-top: 56px;\n    opacity: ", ";\n    transition: opacity 0.4s ease;\n    position: relative;\n    width: 100%;\n    user-select: none;\n    ", " {\n        margin-top: 0;\n    }\n"], ["\n    cursor: pointer;\n    margin-top: 56px;\n    opacity: ", ";\n    transition: opacity 0.4s ease;\n    position: relative;\n    width: 100%;\n    user-select: none;\n    ", " {\n        margin-top: 0;\n    }\n"])), function (_a) {
    var $isVisible = _a.$isVisible;
    return $isVisible ? 1 : 0;
}, mediaQuery.lt1000);
export var MobileHeader = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: none;\n    ", " {\n        display: block;\n        margin-bottom: 20px;\n        position: relative;\n    }\n"], ["\n    display: none;\n    ", " {\n        display: block;\n        margin-bottom: 20px;\n        position: relative;\n    }\n"])), mediaQuery.lt1000);
export var MobileTitle = styled.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-family: ", ";\n    font-size: 12px;\n    font-weight: 700;\n    line-height: 1.2;\n    color: ", ";\n    margin: 0 0 25px 0;\n"], ["\n    font-family: ", ";\n    font-size: 12px;\n    font-weight: 700;\n    line-height: 1.2;\n    color: ", ";\n    margin: 0 0 25px 0;\n"])), fonts.decorative, colors.blackBlue);
export var MobileDivider = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: relative;\n    left: 0;\n    right: 0;\n    height: 1px;\n    background: ", ";\n"], ["\n    position: relative;\n    left: 0;\n    right: 0;\n    height: 1px;\n    background: ", ";\n"])), hexToRgba(colors.blackBlue, 0.1));
export var SliderContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    position: relative;\n\n    .swiper {\n        height: 100%;\n        overflow: visible;\n    }\n\n    .swiper-slide {\n        max-width: 320px;\n        flex-shrink: 0;\n        ", " {\n            max-width: 160px;\n        }\n    }\n"], ["\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    position: relative;\n\n    .swiper {\n        height: 100%;\n        overflow: visible;\n    }\n\n    .swiper-slide {\n        max-width: 320px;\n        flex-shrink: 0;\n        ", " {\n            max-width: 160px;\n        }\n    }\n"])), mediaQuery.lt1000);
export var SliderArrow = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 40px;\n    height: 40px;\n    background: white;\n    border-radius: 50%;\n    box-shadow: 0 0 15px 0 ", ";\n    cursor: ", ";\n    display: ", ";\n    align-items: center;\n    justify-content: center;\n    z-index: 10;\n\n    ", "\n\n    ", " {\n        display: none;\n    }\n"], ["\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 40px;\n    height: 40px;\n    background: white;\n    border-radius: 50%;\n    box-shadow: 0 0 15px 0 ", ";\n    cursor: ", ";\n    display: ", ";\n    align-items: center;\n    justify-content: center;\n    z-index: 10;\n\n    ", "\n\n    ", " {\n        display: none;\n    }\n"])), hexToRgba(colors.blue, 0.1), function (_a) {
    var $disabled = _a.$disabled;
    return $disabled ? 'not-allowed' : 'pointer';
}, function (_a) {
    var $disabled = _a.$disabled;
    return $disabled ? 'none' : 'flex';
}, function (_a) {
    var $direction = _a.$direction;
    return $direction === 'prev' ? 'left: -60px;' : 'right: -60px;';
}, mediaQuery.lt1000);
export var SlideContent = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"], ["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n"])));
export var SlideTitle = styled.h3(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    font-family: ", ";\n    font-size: 25px;\n    line-height: 120%;\n    color: ", ";\n    margin: 0 0 15px 0;\n    font-weight: 400;\n    ", " {\n        font-size: 16px;\n    }\n"], ["\n    font-family: ", ";\n    font-size: 25px;\n    line-height: 120%;\n    color: ", ";\n    margin: 0 0 15px 0;\n    font-weight: 400;\n    ", " {\n        font-size: 16px;\n    }\n"])), fonts.decorative, colors.blue, mediaQuery.lt1000);
export var SlideText = styled.p(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    font-family: ", ";\n    font-size: 20px;\n    color: ", ";\n    margin: 0;\n    line-height: 30px;\n    ", " {\n        font-size: 14px;\n        line-height: 1.45;\n    }\n"], ["\n    font-family: ", ";\n    font-size: 20px;\n    color: ", ";\n    margin: 0;\n    line-height: 30px;\n    ", " {\n        font-size: 14px;\n        line-height: 1.45;\n    }\n"])), fonts.primary, colors.blackBlue, mediaQuery.lt1000);
export var CustomArrow = styled(Chevron)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    color: ", ";\n    transform: ", ";\n    pointer-events: none;\n"], ["\n    color: ", ";\n    transform: ", ";\n    pointer-events: none;\n"])), colors.blue, function (_a) {
    var $direction = _a.$direction;
    return $direction === 'next' ? 'rotate(-180deg)' : 'none';
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
