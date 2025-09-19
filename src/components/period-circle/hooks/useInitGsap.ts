import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { pointNormalSize, pointActiveSize } from '../constants';
import { PointPosition } from '../types';

export const useInitGsap = (params: {
    containerRef: React.RefObject<HTMLDivElement | null>,
    pointRefs: React.RefObject<(HTMLDivElement | null)[]>,
    titleRefs: React.RefObject<(HTMLDivElement | null)[]>,
    interactionRefs: React.RefObject<(HTMLDivElement | null)[]>,
    pointPositions: PointPosition[],
    isAnimating: boolean,
}) => {
    const { containerRef, pointRefs, titleRefs, interactionRefs, pointPositions, isAnimating } = params;

    useGSAP(() => {
        if (isAnimating) return;

        interactionRefs.current.forEach((interaction) => {
            if (interaction) {
                gsap.set(interaction, {
                    xPercent: -50,
                    yPercent: -50,
                });
            }
        });

        pointRefs.current.forEach((point, index) => {
            if (point) {
                const pointData = pointPositions[index];
                gsap.set(point, {
                    width: pointData?.isActive ? pointActiveSize : pointNormalSize,
                    height: pointData?.isActive ? pointActiveSize : pointNormalSize,
                });
            }
        });

        titleRefs.current.forEach((title, index) => {
            if (title) {
                const pointData = pointPositions[index];
                gsap.set(title, {
                    opacity: pointData.isActive ? 1 : 0,
                    scale: pointData.isActive ? 1 : 0,
                    yPercent: -50,
                });
            }
        });
    }, { scope: containerRef, dependencies: [pointPositions, isAnimating] });
};
