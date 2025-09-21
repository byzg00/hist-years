import { useCallback, useMemo } from 'react';

import { Period } from '../../../types';
import { getPointXyByIndex } from '../utils';

export const useCalculatePointPositions = (params: {
    periods: Period[],
}) => {
    const { periods } = params;

    return useCallback((targetActivePeriodIndex: number) => {
        return periods.map((period, index) => {
            const { x, y, angle } = getPointXyByIndex(index, targetActivePeriodIndex, periods.length);

            return {
                ...period,
                x,
                y,
                angle,
                isActive: index === targetActivePeriodIndex,
                originalIndex: index,
            };
        });
    }, [periods]);
};

export const usePointPositions = (params: {
    periods: Period[],
    activePeriodIndex: number,
}) => {
    const { periods, activePeriodIndex } = params;

    const calculatePointPositions = useCalculatePointPositions({ periods });

    return useMemo(() => {
        if (periods.length === 0) return [];

        return calculatePointPositions(activePeriodIndex);
    }, [periods, activePeriodIndex, calculatePointPositions]);
};
