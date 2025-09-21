import { Period } from '../../types';
import { PeriodCircle } from '../period-circle';
import { PeriodYears } from '../period-yeas';

import { LineHorizontal, LineVertical, PeriodsWrapper } from './styled';
import { Title } from './Title';

export const Periods = (props: {
    title: string;
    periods: Period[],
    activePeriodId: string,
    onActivate: (activePeriodId: string) => void,
}) => {
    const { title, periods, activePeriodId, onActivate } = props;

    return (
        <PeriodsWrapper>
            <Title title={title} />
            <LineVertical $left={0} />
            <LineVertical $left={50} />
            <LineVertical $left={100} />
            <LineHorizontal $top={0} />
            <LineHorizontal $top={50} />
            <LineHorizontal $top={100} />
            <PeriodCircle
                periods={periods}
                activePeriodId={activePeriodId}
                onActivate={onActivate}
            >
                <PeriodYears periods={periods} activePeriodId={activePeriodId} />
            </PeriodCircle>
        </PeriodsWrapper>
    );
};
