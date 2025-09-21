import { useState } from 'react';

import { useMatchMedia } from '../../hooks/useMatchMedia';
import { mediaQuery } from '../../styled';
import { Period } from '../../types';
import { PeriodCircle } from '../period-circle';
import { PeriodYears } from '../period-yeas';
import { PeriodChanger } from '../period-changer';

import { LineHorizontal, LineVertical, MainWrapper, PeriodsWrapper, verticalCenter } from './styled';
import { Title } from './Title';

export const Periods = (props: {
    title: string;
    periods: Period[],
    activePeriodId: string,
    onActivate: (activePeriodId: string) => void,
}) => {
    const { title, periods, activePeriodId, onActivate } = props;
    const isMobile = useMatchMedia(mediaQuery.lt480);
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <PeriodsWrapper>
            <MainWrapper>
                {isMobile ? null : (
                    <>
                        <LineVertical $left={0} />
                        <LineVertical $left={50} />
                        <LineVertical $left={100} />
                        <LineHorizontal $top={'0%'} />
                        <LineHorizontal $top={`${verticalCenter}px`} />
                        <LineHorizontal $top={'100%'} />
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
                <PeriodChanger
                    periods={periods}
                    activePeriodId={activePeriodId}
                    onActivate={onActivate}
                    isAnimating={isAnimating}
                />
            </MainWrapper>
            <div style={{ height: '135px', marginTop: '56px', backgroundColor: 'greenyellow' }}>
                Слайдер
            </div>
        </PeriodsWrapper>
    );
};
