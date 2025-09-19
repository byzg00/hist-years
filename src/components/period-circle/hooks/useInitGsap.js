import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { pointNormalSize, pointActiveSize } from '../constants';
export var useInitGsap = function (params) {
    var containerRef = params.containerRef, pointRefs = params.pointRefs, titleRefs = params.titleRefs, interactionRefs = params.interactionRefs, pointPositions = params.pointPositions, isAnimating = params.isAnimating;
    useGSAP(function () {
        if (isAnimating)
            return;
        interactionRefs.current.forEach(function (interaction, index) {
            if (interaction) {
                gsap.set(interaction, {
                    xPercent: -50,
                    yPercent: -50,
                });
            }
        });
        pointRefs.current.forEach(function (point, index) {
            if (point) {
                var pointData = pointPositions[index];
                gsap.set(point, {
                    width: (pointData === null || pointData === void 0 ? void 0 : pointData.isActive) ? pointActiveSize : pointNormalSize,
                    height: (pointData === null || pointData === void 0 ? void 0 : pointData.isActive) ? pointActiveSize : pointNormalSize,
                });
            }
        });
        titleRefs.current.forEach(function (title, index) {
            if (title) {
                var pointData = pointPositions[index];
                gsap.set(title, {
                    opacity: pointData.isActive ? 1 : 0,
                    scale: pointData.isActive ? 1 : 0,
                    yPercent: -50,
                });
            }
        });
    }, { scope: containerRef, dependencies: [pointPositions, isAnimating] });
};
