import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { PeriodChangerWrapper, PeriodChangerContainer, PeriodCounter, ButtonsContainer, ChangeButton, ArrowIcon, IndicatorsContainer, Indicator, } from './styled';
export var PeriodChanger = function (_a) {
    var periods = _a.periods, activePeriodId = _a.activePeriodId, onActivate = _a.onActivate, _b = _a.isAnimating, isAnimating = _b === void 0 ? false : _b;
    var activePeriodIndex = periods.findIndex(function (p) { return p.id === activePeriodId; });
    var currentPeriodNumber = activePeriodIndex + 1;
    var totalPeriods = periods.length;
    var isFirstPeriod = activePeriodIndex === 0;
    var isLastPeriod = activePeriodIndex === totalPeriods - 1;
    var handlePrevious = useCallback(function () {
        if (!isFirstPeriod && !isAnimating) {
            var prevPeriod = periods[activePeriodIndex - 1];
            onActivate(prevPeriod.id);
        }
    }, [isFirstPeriod, isAnimating, periods, activePeriodIndex, onActivate]);
    var handleNext = useCallback(function () {
        if (!isLastPeriod && !isAnimating) {
            var nextPeriod = periods[activePeriodIndex + 1];
            onActivate(nextPeriod.id);
        }
    }, [isLastPeriod, isAnimating, periods, activePeriodIndex, onActivate]);
    var formatNumber = function (num) {
        return num.toString().padStart(2, '0');
    };
    var calculateOpacity = function (index, activeIndex) {
        return index === activeIndex ? 1 : 0.4;
    };
    var handleIndicatorClick = useCallback(function (index) {
        if (!isAnimating && index !== activePeriodIndex) {
            var targetPeriod = periods[index];
            onActivate(targetPeriod.id);
        }
    }, [isAnimating, activePeriodIndex, periods, onActivate]);
    return (_jsxs(PeriodChangerWrapper, { children: [_jsxs(PeriodCounter, { children: [formatNumber(currentPeriodNumber), "/", formatNumber(totalPeriods)] }), _jsxs(PeriodChangerContainer, { children: [_jsxs(ButtonsContainer, { children: [_jsx(ChangeButton, { "$isDisabled": isFirstPeriod, onClick: handlePrevious, disabled: isFirstPeriod || isAnimating, children: _jsx(ArrowIcon, { "$direction": "left" }) }), _jsx(ChangeButton, { "$isDisabled": isLastPeriod, onClick: handleNext, disabled: isLastPeriod || isAnimating, children: _jsx(ArrowIcon, { "$direction": "right" }) })] }), _jsx(IndicatorsContainer, { children: periods.map(function (_a, index) {
                            var id = _a.id;
                            return (_jsx(Indicator, { "$opacity": calculateOpacity(index, activePeriodIndex), "$isActive": index === activePeriodIndex, onClick: function () { return handleIndicatorClick(index); } }, id));
                        }) })] })] }));
};
