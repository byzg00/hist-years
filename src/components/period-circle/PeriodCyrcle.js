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
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MainCircle, PeriodNumber, PeriodPoint, PeriodPointInteraction, PeriodPointsWrapper, PeriodTitle, PeriodTitleWrapper, Wrapper, } from './styled/PeriodCircle';
import { usePointHover } from './hooks/usePointHover';
import { usePrevActivePointAnimate } from './hooks/usePrevActivePointAnimate';
import { createCircularAnimation } from './utils';
import { useNewActivePointAnimate } from './hooks/useNewActivePointAnimate';
import { usePointPositions } from './hooks/usePointPositions';
import { useInitGsap } from './hooks/useInitGsap';
import { useHoverCheck } from './hooks/useHoverCheck';
gsap.registerPlugin(MotionPathPlugin);
export var PeriodCircle = function (_a) {
    var periods = _a.periods, activePeriodId = _a.activePeriodId, onActivate = _a.onActivate;
    var containerRef = useRef(null);
    var pointRefs = useRef([]);
    var titleRefs = useRef([]);
    var interactionRefs = useRef([]);
    var _b = useState(false), isAnimating = _b[0], setIsAnimating = _b[1];
    var activePeriodIndex = periods.findIndex(function (p) { return p.id === activePeriodId; });
    var pointPositions = usePointPositions({
        periods: periods,
        activePeriodId: activePeriodId,
        activePeriodIndex: activePeriodIndex,
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
    var _c = usePointHover({
        containerRef: containerRef,
        pointRefs: pointRefs,
        periods: periods,
        activePeriodId: activePeriodId,
        isAnimating: isAnimating,
    }), handleMouseEnter = _c.handleMouseEnter, handleMouseLeave = _c.handleMouseLeave, resetAllHoverStates = _c.resetAllHoverStates;
    var _d = useHoverCheck({
        containerRef: containerRef,
        interactionRefs: interactionRefs,
        periods: periods,
        activePeriodId: activePeriodId,
        handleMouseEnter: handleMouseEnter,
    }), checkHoverViaCSS = _d.checkHoverViaCSS, saveClickPosition = _d.saveClickPosition;
    var prevActivePointAnimate = usePrevActivePointAnimate({ containerRef: containerRef });
    var newActivePointAnimate = useNewActivePointAnimate({ containerRef: containerRef });
    var handlePointClick = contextSafe(function (periodId, e) {
        if (isAnimating || periodId === activePeriodId)
            return;
        saveClickPosition(e);
        resetAllHoverStates();
        var clickedIndex = periods.findIndex(function (p) { return p.id === periodId; });
        setIsAnimating(true);
        var oldPositions = __spreadArray([], pointPositions, true);
        onActivate(periodId);
        var tl = gsap.timeline({
            onComplete: function () {
                setIsAnimating(false);
                setTimeout(checkHoverViaCSS, 50);
            },
        });
        var direction = clickedIndex > activePeriodIndex ? 'counterclockwise' : 'clockwise';
        prevActivePointAnimate({
            pointRefs: pointRefs,
            titleRefs: titleRefs,
            activePeriodIndex: activePeriodIndex,
            tl: tl,
        });
        newActivePointAnimate({
            pointRefs: pointRefs,
            titleRefs: titleRefs,
            clickedIndex: clickedIndex,
            tl: tl,
        });
        oldPositions.forEach(function (oldPos, index) {
            var interactionPoint = interactionRefs.current[index];
            if (!interactionPoint)
                return;
            var adjustedIndex = (index - clickedIndex + periods.length) % periods.length;
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
                duration: 1,
                timeline: tl,
                timeOffset: 0,
            });
        });
    });
    return (_jsxs(Wrapper, { ref: containerRef, children: [_jsx(MainCircle, {}), _jsx(PeriodPointsWrapper, { children: pointPositions.map(function (point, index) { return (_jsx(PeriodPointInteraction, { ref: function (el) {
                        interactionRefs.current[index] = el;
                    }, style: {
                        transform: "translate(".concat(point.x, "px, ").concat(point.y, "px)"),
                    }, "data-interaction-point": true, onMouseEnter: function () { return handleMouseEnter(index); }, onMouseLeave: function () { return handleMouseLeave(index); }, onClick: function (e) { return handlePointClick(point.id, e); }, children: _jsxs(PeriodPoint, { ref: function (el) {
                            pointRefs.current[index] = el;
                        }, "$isActive": point.isActive, children: [_jsx(PeriodNumber, { "$isActive": point.isActive, "data-period-number": true, children: point.num }), _jsx(PeriodTitleWrapper, { children: _jsx(PeriodTitle, { ref: function (el) {
                                        titleRefs.current[index] = el;
                                    }, "$isActive": point.isActive, "data-period-title": true, children: point.title }) })] }) }, point.id)); }) })] }));
};
