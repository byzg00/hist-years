import { FC, useCallback, useState } from 'react';

import { Period } from '../../types';
import {
    PeriodChangerWrapper,
    PeriodCounter,
    ButtonsContainer,
    ChangeButton,
    ArrowIcon,
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

    // Форматирование номера с ведущими нулями
    const formatNumber = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    return (
        <PeriodChangerWrapper>
            <PeriodCounter>
                {formatNumber(currentPeriodNumber)}/{formatNumber(totalPeriods)}
            </PeriodCounter>
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
        </PeriodChangerWrapper>
    );
};
