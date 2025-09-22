import { FC, useCallback } from 'react';

import { Period } from '../../types';

import {
    PeriodChangerWrapper,
    PeriodChangerContainer,
    PeriodCounter,
    ButtonsContainer,
    ChangeButton,
    ArrowIcon,
    IndicatorsContainer,
    Indicator,
} from './styled';

interface PeriodChangerProps {
    periods: Period[];
    activePeriodId: string;
    onActivate: (periodId: string) => void;
    isAnimating?: boolean;
}

export const PeriodChanger: FC<PeriodChangerProps> = ({
    periods,
    activePeriodId,
    onActivate,
    isAnimating = false,
}) => {
    const activePeriodIndex = periods.findIndex((p) => p.id === activePeriodId);
    const currentPeriodNumber = activePeriodIndex + 1;
    const totalPeriods = periods.length;

    const isFirstPeriod = activePeriodIndex === 0;
    const isLastPeriod = activePeriodIndex === totalPeriods - 1;

    const handlePrevious = useCallback(() => {
        if (!isFirstPeriod && !isAnimating) {
            const prevPeriod = periods[activePeriodIndex - 1];
            onActivate(prevPeriod.id);
        }
    }, [isFirstPeriod, isAnimating, periods, activePeriodIndex, onActivate]);

    const handleNext = useCallback(() => {
        if (!isLastPeriod && !isAnimating) {
            const nextPeriod = periods[activePeriodIndex + 1];
            onActivate(nextPeriod.id);
        }
    }, [isLastPeriod, isAnimating, periods, activePeriodIndex, onActivate]);

    const formatNumber = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    const calculateOpacity = (index: number, activeIndex: number): number => {
        return index === activeIndex ? 1 : 0.4;
    };

    const handleIndicatorClick = useCallback((index: number) => {
        if (!isAnimating && index !== activePeriodIndex) {
            const targetPeriod = periods[index];
            onActivate(targetPeriod.id);
        }
    }, [isAnimating, activePeriodIndex, periods, onActivate]);

    return (
        <PeriodChangerWrapper>
            <PeriodCounter>
                {formatNumber(currentPeriodNumber)}/{formatNumber(totalPeriods)}
            </PeriodCounter>
            <PeriodChangerContainer>
                <ButtonsContainer>
                    <ChangeButton
                        $isDisabled={isFirstPeriod}
                        onClick={handlePrevious}
                        disabled={isFirstPeriod || isAnimating}
                    >
                        <ArrowIcon $direction="left" />
                    </ChangeButton>
                    <ChangeButton
                        $isDisabled={isLastPeriod}
                        onClick={handleNext}
                        disabled={isLastPeriod || isAnimating}
                    >
                        <ArrowIcon $direction="right" />
                    </ChangeButton>
                </ButtonsContainer>
                <IndicatorsContainer>
                    {periods.map(({ id }, index) => (
                        <Indicator
                            key={id}
                            $opacity={calculateOpacity(index, activePeriodIndex)}
                            $isActive={index === activePeriodIndex}
                            onClick={() => handleIndicatorClick(index)}
                        />
                    ))}
                </IndicatorsContainer>
            </PeriodChangerContainer>
        </PeriodChangerWrapper>
    );
};
