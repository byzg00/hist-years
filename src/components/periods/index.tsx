import { useState } from 'react';

import { useMatchMedia } from '../../hooks/useMatchMedia';
import { mediaQuery } from '../../styled';
import { Period } from '../../types';
import { PeriodCircle } from '../period-circle';
import { PeriodYears } from '../period-yeas';
import { PeriodChanger } from '../period-changer';
import { Slider } from '../slider';

import { LineHorizontal, LineVertical, MainWrapper, PeriodsWrapper, verticalCenter } from './styled';
import { Title } from './Title';

export const Periods = (props: {
    title: string;
    periods: Period[],
    activePeriodId: string,
    onActivate: (activePeriodId: string) => void,
}) => {
    const { title, periods, activePeriodId, onActivate } = props;
    const isMobile = useMatchMedia(mediaQuery.lt1000);
    const [isAnimating, setIsAnimating] = useState(false);

    const periodChanger = (
        <PeriodChanger
            periods={periods}
            activePeriodId={activePeriodId}
            onActivate={onActivate}
            isAnimating={isAnimating}
        />
    );

    const slider = (
        <Slider
            activePeriodId={activePeriodId}
            periods={periods}
        />
    );

    return (
        <PeriodsWrapper>
            <MainWrapper>
                {isMobile ? null : (
                    <>
                        <LineVertical $left={0} />
                        <LineVertical $left={50} />
                        <LineVertical $left={100} />
                        <LineHorizontal $top="0%" />
                        <LineHorizontal $top={`${verticalCenter}px`} />
                        <LineHorizontal $top="100%" />
                    </>
                )}
                <Title title={title} />
                {isMobile ? (
                    <PeriodYears periods={periods} activePeriodId={activePeriodId} />
                ) : (
                    <PeriodCircle
                        periods={periods}
                        activePeriodId={activePeriodId}
                        onActivate={onActivate}
                        onAnimationStateChange={setIsAnimating}
                    >
                        <PeriodYears periods={periods} activePeriodId={activePeriodId} />
                    </PeriodCircle>
                )}
                {isMobile ? null : periodChanger}
                {isMobile ? slider : null}
            </MainWrapper>
            {isMobile ? periodChanger : null}
            {isMobile ? null : slider}
        </PeriodsWrapper>
    );
};
