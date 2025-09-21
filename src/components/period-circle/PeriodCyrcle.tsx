import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import { Period } from '../../types';
import { calculateAnimationDuration } from '../../utils';

import {
    MainCircle,
    PeriodNumber,
    PeriodPoint,
    PeriodPointInteraction,
    PeriodPointsWrapper,
    PeriodTitle,
    PeriodTitleWrapper,
    PeriodCircleWrapper,
} from './styled/PeriodCircle';
import { usePointHover } from './hooks/usePointHover';
import { usePrevActivePointAnimate } from './hooks/usePrevActivePointAnimate';
import { createCircularAnimation } from './utils';
import { useNewActivePointAnimate } from './hooks/useNewActivePointAnimate';
import { useCalculatePointPositions, usePointPositions } from './hooks/usePointPositions';
import { useInitGsap } from './hooks/useInitGsap';
import { useHoverCheck } from './hooks/useHoverCheck';
import { useHandleChangeActivePeriod } from './hooks/useHandleChangeActivePeriod';

gsap.registerPlugin(MotionPathPlugin);

interface PeriodCircleProps {
    periods: Period[];
    activePeriodId: string;
    onActivate: (activePeriodId: string) => void;
    onAnimationStateChange?: (isAnimating: boolean) => void;
    children?: React.ReactNode;
}

export const PeriodCircle: FC<PeriodCircleProps> = ({
    periods,
    activePeriodId,
    onActivate,
    onAnimationStateChange,
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const interactionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [isAnimating, setIsAnimating] = useState(false);
    const [localActivePeriodId, setLocalActivePeriodId] = useState(activePeriodId);
    const currentTimelineRef = useRef<GSAPTimeline | null>(null);

    const localActivePeriodIndex = periods.findIndex((p) => p.id === localActivePeriodId);

    const pointPositions = usePointPositions({
        periods,
        activePeriodIndex: localActivePeriodIndex,
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
        containerRef, pointRefs, periods, activePeriodId: localActivePeriodId, isAnimating,
    });

    const { checkHoverViaCSS, saveClickPosition } = useHoverCheck({
        containerRef,
        interactionRefs,
        periods,
        activePeriodId: localActivePeriodId,
        handleMouseEnter,
    });

    const prevActivePointAnimate = usePrevActivePointAnimate({ containerRef });
    const newActivePointAnimate = useNewActivePointAnimate({ containerRef });

    const calculatePointPositions = useCalculatePointPositions({ periods });

    const animateToNewPeriod = useCallback(contextSafe((
        newPeriodId: string,
        fromIndex: number,
        hasClickEvent?: boolean,
    ) => {
        const newIndex = periods.findIndex((p) => p.id === newPeriodId);
        if (newIndex === -1) return;

        if (hasClickEvent) {
            resetAllHoverStates(newIndex);
        }

        setIsAnimating(true);
        onAnimationStateChange?.(true);

        const oldPositions = hasClickEvent ? [...pointPositions] : calculatePointPositions(fromIndex);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                currentTimelineRef.current = null;

                // Обновляем локальный активный период в конце анимации
                setLocalActivePeriodId(newPeriodId);

                // Уведомляем о завершении анимации
                onAnimationStateChange?.(false);

                if (hasClickEvent) {
                    setTimeout(checkHoverViaCSS, 50);
                }
            },
        });

        currentTimelineRef.current = tl;

        const direction = newIndex > fromIndex ? 'counterclockwise' : 'clockwise';
        const animationDuration = calculateAnimationDuration(fromIndex, newIndex, periods.length);

        prevActivePointAnimate({
            pointRefs,
            titleRefs,
            activePeriodIndex: fromIndex,
            tl,
        });

        newActivePointAnimate({
            pointRefs,
            titleRefs,
            clickedIndex: newIndex,
            tl,
        });

        oldPositions.forEach((oldPos, index) => {
            const interactionPoint = interactionRefs.current[index];
            if (!interactionPoint) return;

            const adjustedIndex = (index - newIndex + periods.length) % periods.length;
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
                duration: animationDuration,
                timeline: tl,
                timeOffset: 0,
            });
        });
    }), [
        isAnimating,
        periods,
        pointPositions,
        resetAllHoverStates,
        checkHoverViaCSS,
        prevActivePointAnimate,
        newActivePointAnimate,
        contextSafe,
        calculatePointPositions,
        onAnimationStateChange,
    ]);

    useHandleChangeActivePeriod({
        activePeriodId,
        isAnimating,
        periods,
        animateToNewPeriod,
        localActivePeriodId,
        setLocalActivePeriodId,
    });

    const handlePointClick = contextSafe((periodId: string, event: React.MouseEvent) => {
        if (periodId === localActivePeriodId || isAnimating) return;
        onActivate(periodId);
        saveClickPosition(event);
        animateToNewPeriod(periodId, localActivePeriodIndex, true);
    });

    useLayoutEffect(() => {
        return () => {
            if (currentTimelineRef.current) {
                currentTimelineRef.current.kill();
                currentTimelineRef.current = null;
            }
        };
    }, []);

    return (
        <PeriodCircleWrapper ref={containerRef}>
            <MainCircle />
            {children}

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
        </PeriodCircleWrapper>
    );
};
