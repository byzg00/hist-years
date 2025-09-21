import { FC, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

import { Period } from '../../types';
import { calculateAnimationDuration } from '../../utils';

import { YearsContainer, FirstYearNumber, SecondYearNumber } from './styled';

interface PeriodYearsProps {
    periods: Period[];
    activePeriodId: string;
}

/**
 * Создает анимацию для изменения года
 */
const createYearAnimation = (
    yearObject: { value: number },
    targetValue: number,
    duration: number,
    timeline: GSAPTimeline,
    onUpdate: (value: number) => void,
) => {
    timeline.to(yearObject, {
        value: targetValue,
        duration,
        ease: 'power2.inOut',
        onUpdate() {
            const roundedValue = Math.round(yearObject.value);
            onUpdate(roundedValue);
        },
    }, 0);
};

export const PeriodYears: FC<PeriodYearsProps> = ({ periods, activePeriodId }) => {
    const startYearRef = useRef<HTMLDivElement>(null);
    const endYearRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentStartYear, setCurrentStartYear] = useState(0);
    const [currentEndYear, setCurrentEndYear] = useState(0);
    const [prevActivePeriodIndex, setPrevActivePeriodIndex] = useState(-1);

    const activePeriodIndex = periods.findIndex((p) => p.id === activePeriodId);
    const activePeriod = periods[activePeriodIndex];

    useEffect(() => {
        if (activePeriod && currentStartYear === 0 && currentEndYear === 0) {
            setCurrentStartYear(activePeriod.start);
            setCurrentEndYear(activePeriod.end);
            setPrevActivePeriodIndex(activePeriodIndex);
        }
    }, [activePeriod, activePeriodIndex, currentStartYear, currentEndYear]);

    useEffect(() => {
        if (!activePeriod || isAnimating || prevActivePeriodIndex === -1 || prevActivePeriodIndex === activePeriodIndex) {
            return;
        }

        setIsAnimating(true);

        const animationDuration = calculateAnimationDuration(
            prevActivePeriodIndex,
            activePeriodIndex,
            periods.length,
        );

        const startYearObject = { value: currentStartYear };
        const endYearObject = { value: currentEndYear };

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                setPrevActivePeriodIndex(activePeriodIndex);
            },
        });

        createYearAnimation(
            startYearObject,
            activePeriod.start,
            animationDuration,
            tl,
            (value) => {
                setCurrentStartYear(value);
                if (startYearRef.current) {
                    startYearRef.current.textContent = value.toString();
                }
            },
        );

        createYearAnimation(
            endYearObject,
            activePeriod.end,
            animationDuration,
            tl,
            (value) => {
                setCurrentEndYear(value);
                if (endYearRef.current) {
                    endYearRef.current.textContent = value.toString();
                }
            },
        );
    }, [activePeriod, activePeriodIndex, prevActivePeriodIndex, currentStartYear, currentEndYear, isAnimating, periods.length]);

    return (
        <YearsContainer>
            <FirstYearNumber ref={startYearRef}>
                {currentStartYear || activePeriod?.start || 0}
            </FirstYearNumber>
            <div>{'  '}</div>
            <SecondYearNumber ref={endYearRef} style={{ letterSpacing: 0 }}>
                {currentEndYear || activePeriod?.end || 0}
            </SecondYearNumber>
        </YearsContainer>
    );
};
