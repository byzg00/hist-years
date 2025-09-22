var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { calculateAnimationDuration } from '../../utils';
import { MainCircle, PeriodNumber, PeriodPoint, PeriodPointInteraction, PeriodPointsWrapper, PeriodTitle, PeriodTitleWrapper, PeriodCircleWrapper, } from './styled/PeriodCircle';
import { usePointHover } from './hooks/usePointHover';
import { usePrevActivePointAnimate } from './hooks/usePrevActivePointAnimate';
import { createCircularAnimation } from './utils';
import { useNewActivePointAnimate } from './hooks/useNewActivePointAnimate';
import { useCalculatePointPositions, usePointPositions } from './hooks/usePointPositions';
import { useInitGsap } from './hooks/useInitGsap';
import { useHoverCheck } from './hooks/useHoverCheck';
import { useHandleChangeActivePeriod } from './hooks/useHandleChangeActivePeriod';
gsap.registerPlugin(MotionPathPlugin);
export var PeriodCircle = function (_a) {
    var periods = _a.periods, activePeriodId = _a.activePeriodId, onActivate = _a.onActivate, onAnimationStateChange = _a.onAnimationStateChange, children = _a.children;
    var containerRef = useRef(null);
    var pointRefs = useRef([]);
    var titleRefs = useRef([]);
    var interactionRefs = useRef([]);
    var _b = useState(false), isAnimating = _b[0], setIsAnimating = _b[1];
    var _c = useState(activePeriodId), localActivePeriodId = _c[0], setLocalActivePeriodId = _c[1];
    var currentTimelineRef = useRef(null);
    var localActivePeriodIndex = periods.findIndex(function (p) { return p.id === localActivePeriodId; });
    var pointPositions = usePointPositions({
        periods: periods,
        activePeriodIndex: localActivePeriodIndex,
    });
    useInitGsap({
        containerRef: containerRef,
        pointRefs: pointRefs,
        titleRefs: titleRefs,
        interactionRefs: interactionRefs,
        pointPositions: pointPositions,
        isAnimating: isAnimating,
    });
    var contextSafe = useGSAP({ scope: containerRef }).contextSafe;
    var _d = usePointHover({
        containerRef: containerRef,
        pointRefs: pointRefs,
        periods: periods,
        activePeriodId: localActivePeriodId,
        isAnimating: isAnimating,
    }), handleMouseEnter = _d.handleMouseEnter, handleMouseLeave = _d.handleMouseLeave, resetAllHoverStates = _d.resetAllHoverStates;
    var _e = useHoverCheck({
        containerRef: containerRef,
        interactionRefs: interactionRefs,
        periods: periods,
        activePeriodId: localActivePeriodId,
        handleMouseEnter: handleMouseEnter,
    }), checkHoverViaCSS = _e.checkHoverViaCSS, saveClickPosition = _e.saveClickPosition;
    var prevActivePointAnimate = usePrevActivePointAnimate({ containerRef: containerRef });
    var newActivePointAnimate = useNewActivePointAnimate({ containerRef: containerRef });
    var calculatePointPositions = useCalculatePointPositions({ periods: periods });
    var animateToNewPeriod = useCallback(contextSafe(function (newPeriodId, fromIndex, hasClickEvent) {
        var newIndex = periods.findIndex(function (p) { return p.id === newPeriodId; });
        if (newIndex === -1)
            return;
        if (hasClickEvent) {
            resetAllHoverStates(newIndex);
        }
        setIsAnimating(true);
        onAnimationStateChange === null || onAnimationStateChange === void 0 ? void 0 : onAnimationStateChange(true);
        var oldPositions = hasClickEvent ? __spreadArray([], pointPositions, true) : calculatePointPositions(fromIndex);
        var tl = gsap.timeline({
            onComplete: function () {
                setIsAnimating(false);
                currentTimelineRef.current = null;
                setLocalActivePeriodId(newPeriodId);
                onAnimationStateChange === null || onAnimationStateChange === void 0 ? void 0 : onAnimationStateChange(false);
                if (hasClickEvent) {
                    setTimeout(checkHoverViaCSS, 50);
                }
            },
        });
        currentTimelineRef.current = tl;
        var direction = newIndex > fromIndex ? 'counterclockwise' : 'clockwise';
        var animationDuration = calculateAnimationDuration(fromIndex, newIndex, periods.length);
        prevActivePointAnimate({
            pointRefs: pointRefs,
            titleRefs: titleRefs,
            activePeriodIndex: fromIndex,
            tl: tl,
        });
        newActivePointAnimate({
            pointRefs: pointRefs,
            titleRefs: titleRefs,
            clickedIndex: newIndex,
            tl: tl,
        });
        oldPositions.forEach(function (oldPos, index) {
            var interactionPoint = interactionRefs.current[index];
            if (!interactionPoint)
                return;
            var adjustedIndex = (index - newIndex + periods.length) % periods.length;
            var newAngle = -Math.PI / 3 + (adjustedIndex * (2 * Math.PI)) / periods.length;
            gsap.set(interactionPoint, {
                x: oldPos.x,
                y: oldPos.y,
                xPercent: -50,
                yPercent: -50,
            });
            createCircularAnimation({
                element: interactionPoint,
                startAngle: oldPos.angle,
                endAngle: newAngle,
                direction: direction,
                duration: animationDuration,
                timeline: tl,
                timeOffset: 0,
            });
        });
    }), [
        isAnimating,
        periods,
        pointPositions,
        resetAllHoverStates,
        checkHoverViaCSS,
        prevActivePointAnimate,
        newActivePointAnimate,
        contextSafe,
        calculatePointPositions,
        onAnimationStateChange,
    ]);
    useHandleChangeActivePeriod({
        activePeriodId: activePeriodId,
        isAnimating: isAnimating,
        periods: periods,
        animateToNewPeriod: animateToNewPeriod,
        localActivePeriodId: localActivePeriodId,
        setLocalActivePeriodId: setLocalActivePeriodId,
    });
    var handlePointClick = contextSafe(function (periodId, event) {
        if (periodId === localActivePeriodId || isAnimating)
            return;
        onActivate(periodId);
        saveClickPosition(event);
        animateToNewPeriod(periodId, localActivePeriodIndex, true);
    });
    useLayoutEffect(function () {
        return function () {
            if (currentTimelineRef.current) {
                currentTimelineRef.current.kill();
                currentTimelineRef.current = null;
            }
        };
    }, []);
    return (_jsxs(PeriodCircleWrapper, { ref: containerRef, children: [_jsx(MainCircle, {}), children, _jsx(PeriodPointsWrapper, { children: pointPositions.map(function (point, index) { return (_jsx(PeriodPointInteraction, { ref: function (el) {
                        interactionRefs.current[index] = el;
                    }, style: {
                        transform: "translate(".concat(point.x, "px, ").concat(point.y, "px)"),
                    }, "data-interaction-point": true, onMouseEnter: function () { return handleMouseEnter(index); }, onMouseLeave: function () { return handleMouseLeave(index); }, onClick: function (e) { return handlePointClick(point.id, e); }, children: _jsxs(PeriodPoint, { ref: function (el) {
                            pointRefs.current[index] = el;
                        }, "$isActive": point.isActive, children: [_jsx(PeriodNumber, { "$isActive": point.isActive, "data-period-number": true, children: point.num }), _jsx(PeriodTitleWrapper, { children: _jsx(PeriodTitle, { ref: function (el) {
                                        titleRefs.current[index] = el;
                                    }, "$isActive": point.isActive, "data-period-title": true, children: point.title }) })] }) }, point.id)); }) })] }));
};
