import { useGSAP } from '@gsap/react';

import { colors } from '../../../styled';
import { pointActiveSize } from '../constants';

export const useNewActivePointAnimate = (params: {
    containerRef: React.RefObject<HTMLDivElement | null>,
}) => {
    const { containerRef } = params;
    const { contextSafe } = useGSAP({ scope: containerRef });
    return contextSafe((fnParams: {
        pointRefs: React.RefObject<(HTMLDivElement | null)[]>,
        titleRefs: React.RefObject<(HTMLDivElement | null)[]>,
        clickedIndex: number,
        tl: GSAPTimeline,
    }) => {
        const { pointRefs, titleRefs, clickedIndex, tl } = fnParams;
        const newActivePoint = pointRefs.current[clickedIndex];
        const newTitle = titleRefs.current[clickedIndex];

        if (newActivePoint) {
            const newNumber = newActivePoint.querySelector('[data-period-number]');

            tl.to(newActivePoint, {
                backgroundColor: 'white',
                border: `1px solid ${colors.blackBlue}`,
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
