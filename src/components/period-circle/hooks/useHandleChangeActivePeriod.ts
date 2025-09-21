import { useLayoutEffect, useRef, useState } from 'react';
import { Period } from '../../../types';

export const useHandleChangeActivePeriod = (params: {
    activePeriodId: string,
    isAnimating: boolean,
    periods: Period[],
    localActivePeriodId: string,
    setLocalActivePeriodId: (localActivePeriodId: string) => void,
    animateToNewPeriod: (newPeriodId: string, fromIndex: number, hasClickEvent?: boolean) => void,
}) => {
    const { activePeriodId, isAnimating, periods, animateToNewPeriod, localActivePeriodId, setLocalActivePeriodId } = params;
    const prevActivePeriodIdRef = useRef<string>(activePeriodId);

    // Синхронизация localActivePeriodId с activePeriodId при первом рендере
    useLayoutEffect(() => {
        if (!isAnimating && localActivePeriodId !== activePeriodId) {
            setLocalActivePeriodId(activePeriodId);
        }
    }, []);

    // Обработка внешних изменений activePeriodId (например, из PeriodChanger)
    useLayoutEffect(() => {
        const prevPeriodId = prevActivePeriodIdRef.current;

        // Если activePeriodId изменился извне (не из-за клика в PeriodCircle)
        if (prevPeriodId !== activePeriodId && localActivePeriodId !== activePeriodId && !isAnimating) {
            const currentLocalIndex = periods.findIndex((p) => p.id === localActivePeriodId);
            if (currentLocalIndex !== -1) {
                animateToNewPeriod(activePeriodId, currentLocalIndex, false);
            }
        }

        // Обновляем ref для следующего сравнения
        prevActivePeriodIdRef.current = activePeriodId;
    }, [activePeriodId, localActivePeriodId, isAnimating, periods, animateToNewPeriod]);
}