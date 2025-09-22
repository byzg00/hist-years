import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { colors } from '../../../styled';
import { pointNormalSize } from '../constants';
export var usePrevActivePointAnimate = function (params) {
    var containerRef = params.containerRef;
    var contextSafe = useGSAP({ scope: containerRef }).contextSafe;
    return contextSafe(function (fnParams) {
        var pointRefs = fnParams.pointRefs, titleRefs = fnParams.titleRefs, activePeriodIndex = fnParams.activePeriodIndex, tl = fnParams.tl;
        var previousActivePoint = pointRefs.current[activePeriodIndex];
        var previousTitle = titleRefs.current[activePeriodIndex];
        if (previousActivePoint) {
            var previousNumber = previousActivePoint.querySelector('[data-period-number]');
            gsap.set(previousActivePoint, {
                backgroundColor: colors.blackBlue,
                border: 'none',
            });
            if (previousNumber) {
                gsap.set(previousNumber, {
                    opacity: 0,
                });
            }
            tl.to(previousActivePoint, {
                width: pointNormalSize,
                height: pointNormalSize,
                duration: 0.8,
                ease: 'power2.inOut',
            }, 0);
        }
        if (previousTitle) {
            tl.to(previousTitle, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
            }, 0);
        }
    });
};
