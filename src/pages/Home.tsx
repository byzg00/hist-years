import React, { useState } from 'react';

import { PeriodCircle } from '../components/period';

const App: React.FC = () => {
  const [activePeriodId, setActivePeriodId] = useState('period-1');

  const periods = [
    { id: 'period-1', num: 1, title: 'Первый период' },
    { id: 'period-2', num: 2, title: 'Второй период' },
    { id: 'period-3', num: 3, title: 'Третий период' },
    { id: 'period-4', num: 4, title: 'Четвертый период' },
  ];

  const handleActivate = (periodId: string) => {
    setActivePeriodId(periodId);
  };

  return (
      <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
          <PeriodCircle
            periods={periods}
            activePeriodId={activePeriodId}
            onActivate={handleActivate}
          />
      </div>
  );
};

export default App;
