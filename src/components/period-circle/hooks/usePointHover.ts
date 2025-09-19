import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { colors } from '../../../styled';
import { pointNormalSize, pointActiveSize } from '../constants';
import { Period } from '../types';

export const usePointHover = (params: {
    containerRef: React.RefObject<HTMLDivElement | null>,
    pointRefs: React.RefObject<(HTMLDivElement | null)[]>,
    periods: Period[],
    activePeriodId: string,
    isAnimating: boolean
}) => {
    const { containerRef, pointRefs, periods, activePeriodId, isAnimating } = params;

    const { contextSafe } = useGSAP({ scope: containerRef });
    const handleMouseEnter = contextSafe((index: number) => {
        if (isAnimating) return;

        const point = pointRefs.current[index];
        if (!point) return;

        const number = point.querySelector('[data-period-number]');

        gsap.to(point, {
            width: pointActiveSize,
            height: pointActiveSize,
            backgroundColor: 'white',
            border: `1px solid ${colors.blackBlue}`,
            duration: 0.3,
        });

        if (number) {
            gsap.to(number, {
                opacity: 1,
                duration: 0.3,
            });
        }
    });

    const handleMouseLeave = contextSafe((index: number) => {
        if (isAnimating) return;

        const point = pointRefs.current[index];
        if (!point || periods[index].id === activePeriodId) return;

        const number = point.querySelector('[data-period-number]');

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

    const resetAllHoverStates = contextSafe(() => {
        pointRefs.current.forEach((point, index) => {
            if (!point || periods[index]?.id === activePeriodId) return;

            const number = point.querySelector('[data-period-number]');

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
        handleMouseEnter,
        handleMouseLeave,
        resetAllHoverStates,
    };
};
