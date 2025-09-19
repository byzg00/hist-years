import React, { useState } from 'react';

import { PeriodCircle } from '../components/period-circle';

import { PageWrapper, MainTitle, CircleWrapper, ActiveInfo } from './styled';

const periods = [
    { id: 'period-1', num: 1, title: 'Первый период' },
    { id: 'period-2', num: 2, title: 'Второй период' },
    { id: 'period-3', num: 3, title: 'Третий период' },
    { id: 'period-4', num: 4, title: 'Длинное название периода' },
    { id: 'period-5', num: 5, title: 'Пятый период' },
    { id: 'period-6', num: 6, title: 'Шестой период' },
];

const App: React.FC = () => {
    const [activePeriodId, setActivePeriodId] = useState('period-3');

    const handleActivate = (periodId: string) => {
        setActivePeriodId(periodId);
    };

    return (
        <PageWrapper>
            <MainTitle>Исторические периоды</MainTitle>
            <CircleWrapper>
                <PeriodCircle
                    periods={periods}
                    activePeriodId={activePeriodId}
                    onActivate={handleActivate}
                />
            </CircleWrapper>
            <ActiveInfo>Активный период: {activePeriodId}</ActiveInfo>
        </PageWrapper>
    );
};

export default App;
