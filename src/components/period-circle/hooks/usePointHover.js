import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { colors } from '../../../styled';
import { pointNormalSize, pointActiveSize } from '../constants';
export var usePointHover = function (params) {
    var containerRef = params.containerRef, pointRefs = params.pointRefs, periods = params.periods, activePeriodId = params.activePeriodId, isAnimating = params.isAnimating;
    var contextSafe = useGSAP({ scope: containerRef }).contextSafe;
    var handleMouseEnter = contextSafe(function (index) {
        if (isAnimating)
            return;
        var point = pointRefs.current[index];
        if (!point)
            return;
        var number = point.querySelector('[data-period-number]');
        gsap.to(point, {
            width: pointActiveSize,
            height: pointActiveSize,
            backgroundColor: 'white',
            border: "1px solid ".concat(colors.blackBlue),
            duration: 0.3,
        });
        if (number) {
            gsap.to(number, {
                opacity: 1,
                duration: 0.3,
            });
        }
    });
    var handleMouseLeave = contextSafe(function (index) {
        if (isAnimating)
            return;
        var point = pointRefs.current[index];
        if (!point || periods[index].id === activePeriodId)
            return;
        var number = point.querySelector('[data-period-number]');
        gsap.to(point, {
            width: pointNormalSize,
            height: pointNormalSize,
            backgroundColor: colors.blackBlue,
            border: 'none',
            duration: 0.3,
        });
        if (number) {
            gsap.to(number, {
                opacity: 0,
                duration: 0.3,
            });
        }
    });
    var resetAllHoverStates = contextSafe(function (excludeIndex) {
        pointRefs.current.forEach(function (point, index) {
            var _a;
            if (!point || ((_a = periods[index]) === null || _a === void 0 ? void 0 : _a.id) === activePeriodId || index === excludeIndex)
                return;
            var number = point.querySelector('[data-period-number]');
            gsap.set(point, {
                width: pointNormalSize,
                height: pointNormalSize,
                backgroundColor: colors.blackBlue,
                border: 'none',
            });
            if (number) {
                gsap.set(number, {
                    opacity: 0,
                });
            }
        });
    });
    return {
        handleMouseEnter: handleMouseEnter,
        handleMouseLeave: handleMouseLeave,
        resetAllHoverStates: resetAllHoverStates,
    };
};
