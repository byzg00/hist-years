import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { colors } from '../../../styled';
import { pointNormalSize } from '../constants';

export const usePrevActivePointAnimate = (params: {
    containerRef: React.RefObject<HTMLDivElement | null>,
}) => {
    const { containerRef } = params;
    const { contextSafe } = useGSAP({ scope: containerRef });
    return contextSafe((fnParams: {
        pointRefs: React.RefObject<(HTMLDivElement | null)[]>,
        titleRefs: React.RefObject<(HTMLDivElement | null)[]>,
        activePeriodIndex: number,
        tl: GSAPTimeline,
    }) => {
        const { pointRefs, titleRefs, activePeriodIndex, tl } = fnParams;
        const previousActivePoint = pointRefs.current[activePeriodIndex];
        const previousTitle = titleRefs.current[activePeriodIndex];

        if (previousActivePoint) {
            const previousNumber = previousActivePoint.querySelector('[data-period-number]');
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
