import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { Period } from '../types';

export const useHoverCheck = (params: {
    containerRef: React.RefObject<HTMLDivElement | null>,
    interactionRefs: React.RefObject<(HTMLDivElement | null)[]>,
    periods: Period[],
    activePeriodId: string,
    handleMouseEnter: (index: number) => void,
}) => {
    const { containerRef, interactionRefs, periods, activePeriodId, handleMouseEnter } = params;
    const { contextSafe } = useGSAP({ scope: containerRef });
    const clickPositionRef = useRef<{x: number, y: number} | null>(null);

    const checkHoverViaCSS = contextSafe(() => {
        if (!clickPositionRef.current || !containerRef.current) return;

        const elementsUnderClick = document.elementsFromPoint(
            clickPositionRef.current.x,
            clickPositionRef.current.y,
        );

        const interactionElement = elementsUnderClick.find((element) =>
            element.hasAttribute && element.hasAttribute('data-interaction-point'),
        );

        if (interactionElement) {
            const computedStyle = getComputedStyle(interactionElement);
            const isHovered = computedStyle.getPropertyValue('--is-hovered').trim();

            if (isHovered === '1') {
                const index = interactionRefs.current.findIndex((ref) => ref === interactionElement);
                if (index !== -1 && periods[index]?.id !== activePeriodId) {
                    handleMouseEnter(index);
                }
            }
        }
    });

    const saveClickPosition = (e: React.MouseEvent) => {
        clickPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    return {
        checkHoverViaCSS,
        saveClickPosition,
    };
};
