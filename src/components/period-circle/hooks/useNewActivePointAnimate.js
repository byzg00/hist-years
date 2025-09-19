import { useGSAP } from '@gsap/react';
import { colors } from '../../../styled';
import { pointActiveSize } from '../constants';
export var useNewActivePointAnimate = function (params) {
    var containerRef = params.containerRef;
    var contextSafe = useGSAP({ scope: containerRef }).contextSafe;
    return contextSafe(function (fnParams) {
        var pointRefs = fnParams.pointRefs, titleRefs = fnParams.titleRefs, clickedIndex = fnParams.clickedIndex, tl = fnParams.tl;
        var newActivePoint = pointRefs.current[clickedIndex];
        var newTitle = titleRefs.current[clickedIndex];
        if (newActivePoint) {
            var newNumber = newActivePoint.querySelector('[data-period-number]');
            tl.to(newActivePoint, {
                backgroundColor: 'white',
                border: "1px solid ".concat(colors.blackBlue),
                width: pointActiveSize,
                height: pointActiveSize,
                duration: 0.8,
                ease: 'power2.inOut',
            }, 0);
            if (newNumber) {
                tl.to(newNumber, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.inOut',
                }, 0.4);
            }
        }
        if (newTitle) {
            tl.set(newTitle, {
                opacity: 1,
                scale: 1,
            }, 1);
        }
    });
};
