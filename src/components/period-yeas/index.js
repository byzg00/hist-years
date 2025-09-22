import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { calculateAnimationDuration } from '../../utils';
import { YearsContainer, FirstYearNumber, SecondYearNumber } from './styled';
var createYearAnimation = function (yearObject, targetValue, duration, timeline, onUpdate) {
    timeline.to(yearObject, {
        value: targetValue,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: function () {
            var roundedValue = Math.round(yearObject.value);
            onUpdate(roundedValue);
        },
    }, 0);
};
export var PeriodYears = function (_a) {
    var periods = _a.periods, activePeriodId = _a.activePeriodId;
    var startYearRef = useRef(null);
    var endYearRef = useRef(null);
    var _b = useState(false), isAnimating = _b[0], setIsAnimating = _b[1];
    var _c = useState(0), currentStartYear = _c[0], setCurrentStartYear = _c[1];
    var _d = useState(0), currentEndYear = _d[0], setCurrentEndYear = _d[1];
    var _e = useState(-1), prevActivePeriodIndex = _e[0], setPrevActivePeriodIndex = _e[1];
    var activePeriodIndex = periods.findIndex(function (p) { return p.id === activePeriodId; });
    var activePeriod = periods[activePeriodIndex];
    useEffect(function () {
        if (activePeriod && currentStartYear === 0 && currentEndYear === 0) {
            setCurrentStartYear(activePeriod.start);
            setCurrentEndYear(activePeriod.end);
            setPrevActivePeriodIndex(activePeriodIndex);
        }
    }, [activePeriod, activePeriodIndex, currentStartYear, currentEndYear]);
    useEffect(function () {
        if (!activePeriod || isAnimating || prevActivePeriodIndex === -1 || prevActivePeriodIndex === activePeriodIndex) {
            return;
        }
        setIsAnimating(true);
        var animationDuration = calculateAnimationDuration(prevActivePeriodIndex, activePeriodIndex, periods.length);
        var startYearObject = { value: currentStartYear };
        var endYearObject = { value: currentEndYear };
        var tl = gsap.timeline({
            onComplete: function () {
                setIsAnimating(false);
                setPrevActivePeriodIndex(activePeriodIndex);
            },
        });
        createYearAnimation(startYearObject, activePeriod.start, animationDuration, tl, function (value) {
            setCurrentStartYear(value);
            if (startYearRef.current) {
                startYearRef.current.textContent = value.toString();
            }
        });
        createYearAnimation(endYearObject, activePeriod.end, animationDuration, tl, function (value) {
            setCurrentEndYear(value);
            if (endYearRef.current) {
                endYearRef.current.textContent = value.toString();
            }
        });
    }, [activePeriod, activePeriodIndex, prevActivePeriodIndex, currentStartYear, currentEndYear, isAnimating, periods.length]);
    return (_jsxs(YearsContainer, { children: [_jsx(FirstYearNumber, { ref: startYearRef, children: currentStartYear || (activePeriod === null || activePeriod === void 0 ? void 0 : activePeriod.start) || 0 }), _jsx("div", { children: '  ' }), _jsx(SecondYearNumber, { ref: endYearRef, style: { letterSpacing: 0 }, children: currentEndYear || (activePeriod === null || activePeriod === void 0 ? void 0 : activePeriod.end) || 0 })] }));
};
