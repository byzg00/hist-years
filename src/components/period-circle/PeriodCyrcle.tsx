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
import { createCircularAnimation, getPointXyByIndex } from './utils';
import { useNewActivePointAnimate } from './hooks/useNewActivePointAnimate';
import { usePointPositions } from './hooks/usePointPositions';
import { useInitGsap } from './hooks/useInitGsap';
import { useHoverCheck } from './hooks/useHoverCheck';

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
    const prevActivePeriodIdRef = useRef<string>(activePeriodId);
    const currentTimelineRef = useRef<GSAPTimeline | null>(null);

    const activePeriodIndex = periods.findIndex((p) => p.id === activePeriodId);

    const localActivePeriodIndex = periods.findIndex((p) => p.id === localActivePeriodId);

    const pointPositions = usePointPositions({
        periods,
        activePeriodId: localActivePeriodId,
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

    // Функция для вычисления позиций точек для определенного активного индекса
    const calculatePointPositions = useCallback((targetActivePeriodIndex: number) => {
        return periods.map((period, index) => {
            const { x, y, angle } = getPointXyByIndex(index, targetActivePeriodIndex, periods.length);

            return {
                ...period,
                x,
                y,
                angle,
                isActive: index === targetActivePeriodIndex,
                originalIndex: index,
            };
        });
    }, [periods]);

    // Уведомление о состоянии анимации
    const notifyAnimationStateChange = useCallback((animating: boolean) => {
        onAnimationStateChange?.(animating);
    }, [onAnimationStateChange]);

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
        // Уведомляем о начале анимации
        notifyAnimationStateChange(true);
        
        // Вычисляем правильные старые позиции на основе fromIndex
        const oldPositions = hasClickEvent ? [...pointPositions] : calculatePointPositions(fromIndex);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                currentTimelineRef.current = null;

                // Обновляем локальный активный период в конце анимации
                setLocalActivePeriodId(newPeriodId);

                // Уведомляем о завершении анимации
                notifyAnimationStateChange(false);

                if (hasClickEvent) {
                    setTimeout(checkHoverViaCSS, 50);
                }
            },
        });

        // Сохраняем ссылку на текущую анимацию
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
        notifyAnimationStateChange,
    ]);

    const handlePointClick = contextSafe((periodId: string, event: React.MouseEvent) => {
        if (periodId === localActivePeriodId || isAnimating) return;

        saveClickPosition(event);
        const currentActiveIndex = localActivePeriodIndex;
        onActivate(periodId);


        animateToNewPeriod(periodId, currentActiveIndex, true);
    });

    // Синхронизация localActivePeriodId с activePeriodId при первом рендере
    useLayoutEffect(() => {
        if (!isAnimating && localActivePeriodId !== activePeriodId) {
            setLocalActivePeriodId(activePeriodId);
        }
    }, []);

    // Обработка внешних изменений activePeriodId (например, из PeriodChanger)
    useLayoutEffect(() => {
        const prevPeriodId = prevActivePeriodIdRef.current;

        // Если activePeriodId изменился извне (не из-за клика в PeriodCircle)
        if (prevPeriodId !== activePeriodId && localActivePeriodId !== activePeriodId && !isAnimating) {
            const currentLocalIndex = periods.findIndex((p) => p.id === localActivePeriodId);
            if (currentLocalIndex !== -1) {
                animateToNewPeriod(activePeriodId, currentLocalIndex, false);
            }
        }

        // Обновляем ref для следующего сравнения
        prevActivePeriodIdRef.current = activePeriodId;
    }, [activePeriodId, localActivePeriodId, isAnimating, periods, animateToNewPeriod]);

    // Cleanup анимации при размонтировании
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
