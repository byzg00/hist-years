import { FC, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import {
    MainCircle,
    PeriodNumber,
    PeriodPoint,
    PeriodPointInteraction,
    PeriodPointsWrapper,
    PeriodTitle,
    PeriodTitleWrapper,
    Wrapper,
} from './styled/PeriodCircle';
import { usePointHover } from './hooks/usePointHover';
import { Period } from './types';
import { usePrevActivePointAnimate } from './hooks/usePrevActivePointAnimate';
import { createCircularAnimation } from './utils';
import { useNewActivePointAnimate } from './hooks/useNewActivePointAnimate';
import { usePointPositions } from './hooks/usePointPositions';
import { useInitGsap } from './hooks/useInitGsap';
import { useHoverCheck } from './hooks/useHoverCheck';

gsap.registerPlugin(MotionPathPlugin);

interface PeriodCircleProps {
    periods: Period[];
    activePeriodId: string;
    onActivate: (activePeriodId: string) => void;
}

export const PeriodCircle: FC<PeriodCircleProps> = ({
    periods,
    activePeriodId,
    onActivate,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const interactionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [isAnimating, setIsAnimating] = useState(false);

    const activePeriodIndex = periods.findIndex((p) => p.id === activePeriodId);

    const pointPositions = usePointPositions({
        periods,
        activePeriodId,
        activePeriodIndex,
    });

    useInitGsap({
        containerRef,
        pointRefs,
        titleRefs,
        interactionRefs,
        pointPositions,
        isAnimating,
    });

    const { contextSafe } = useGSAP({ scope: containerRef });

    const { handleMouseEnter, handleMouseLeave, resetAllHoverStates } = usePointHover({
        containerRef, pointRefs, periods, activePeriodId, isAnimating,
    });

    const { checkHoverViaCSS, saveClickPosition } = useHoverCheck({
        containerRef,
        interactionRefs,
        periods,
        activePeriodId,
        handleMouseEnter,
    });

    const prevActivePointAnimate = usePrevActivePointAnimate({ containerRef });
    const newActivePointAnimate = useNewActivePointAnimate({ containerRef });

    const handlePointClick = contextSafe((periodId: string, e: React.MouseEvent) => {
        if (isAnimating || periodId === activePeriodId) return;

        saveClickPosition(e);
        resetAllHoverStates();

        const clickedIndex = periods.findIndex((p) => p.id === periodId);
        setIsAnimating(true);
        const oldPositions = [...pointPositions];

        onActivate(periodId);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                setTimeout(checkHoverViaCSS, 50);
            },
        });

        const direction = clickedIndex > activePeriodIndex ? 'counterclockwise' : 'clockwise';
        prevActivePointAnimate({
            pointRefs,
            titleRefs,
            activePeriodIndex,
            tl,
        });

        newActivePointAnimate({
            pointRefs,
            titleRefs,
            clickedIndex,
            tl,
        });

        oldPositions.forEach((oldPos, index) => {
            const interactionPoint = interactionRefs.current[index];
            if (!interactionPoint) return;

            const adjustedIndex = (index - clickedIndex + periods.length) % periods.length;
            const newAngle = -Math.PI / 3 + (adjustedIndex * (2 * Math.PI)) / periods.length;

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
                direction,
                duration: 1,
                timeline: tl,
                timeOffset: 0,
            });
        });
    });

    return (
        <Wrapper ref={containerRef}>
            <MainCircle />

            <PeriodPointsWrapper>
                {pointPositions.map((point, index) => (
                    <PeriodPointInteraction
                        key={point.id}
                        ref={(el: HTMLDivElement | null) => {
                            interactionRefs.current[index] = el;
                        }}
                        style={{
                            transform: `translate(${point.x}px, ${point.y}px)`,
                        }}
                        data-interaction-point
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        onClick={(e) => handlePointClick(point.id, e)}
                    >
                        <PeriodPoint
                            ref={(el: HTMLDivElement | null) => {
                                pointRefs.current[index] = el;
                            }}
                            $isActive={point.isActive}
                        >
                            <PeriodNumber
                                $isActive={point.isActive}
                                data-period-number
                            >
                                {point.num}
                            </PeriodNumber>
                            <PeriodTitleWrapper>
                                <PeriodTitle
                                    ref={(el: HTMLDivElement | null) => {
                                        titleRefs.current[index] = el;
                                    }}
                                    $isActive={point.isActive}
                                    data-period-title
                                >
                                    {point.title}
                                </PeriodTitle>
                            </PeriodTitleWrapper>
                        </PeriodPoint>
                    </PeriodPointInteraction>
                ))}
            </PeriodPointsWrapper>
        </Wrapper>
    );
};
