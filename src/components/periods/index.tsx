import { useMatchMedia } from '../../hooks/useMatchMedia';
import { mediaQuery } from '../../styled';
import { Period } from '../../types';
import { PeriodCircle } from '../period-circle';
import { PeriodYears } from '../period-yeas';

import { LineHorizontal, LineVertical, MainWrapper, PeriodsWrapper } from './styled';
import { Title } from './Title';

export const Periods = (props: {
    title: string;
    periods: Period[],
    activePeriodId: string,
    onActivate: (activePeriodId: string) => void,
}) => {
    const { title, periods, activePeriodId, onActivate } = props;
    const isMobile = useMatchMedia(mediaQuery.lt480);

    return (
        <PeriodsWrapper>
            {isMobile ? null : (
                <>
                    <LineVertical $left={0} />
                    <LineVertical $left={50} />
                    <LineVertical $left={100} />
                    <LineHorizontal $top={0} />
                    <LineHorizontal $top={50} />
                    <LineHorizontal $top={100} />
                </>
            )}
            <MainWrapper>
                <Title title={title} />
                {isMobile ? (
                    <PeriodYears periods={periods} activePeriodId={activePeriodId} />
                ) : (
                    <PeriodCircle
                        periods={periods}
                        activePeriodId={activePeriodId}
                        onActivate={onActivate}
                    >
                        <PeriodYears periods={periods} activePeriodId={activePeriodId} />
                    </PeriodCircle>
                )}
            </MainWrapper>
        </PeriodsWrapper>
    );
};
