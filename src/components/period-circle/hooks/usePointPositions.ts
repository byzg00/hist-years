import { useMemo } from 'react';

import { Period } from '../types';
import { getPointXyByIndex } from '../utils';

export const usePointPositions = (params: {
    periods: Period[],
    activePeriodId: string,
    activePeriodIndex: number,
}) => {
    const { periods, activePeriodId, activePeriodIndex } = params;

    return useMemo(() => {
        if (periods.length === 0) return [];

        return periods.map((period, index) => {
            const { x, y, angle } = getPointXyByIndex(index, activePeriodIndex, periods.length);

            return {
                ...period,
                x,
                y,
                angle,
                isActive: period.id === activePeriodId,
                originalIndex: index,
            };
        });
    }, [periods, activePeriodId, activePeriodIndex]);
};
