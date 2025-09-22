import { useLayoutEffect, useRef } from 'react';

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

    useLayoutEffect(() => {
        if (!isAnimating && localActivePeriodId !== activePeriodId) {
            setLocalActivePeriodId(activePeriodId);
        }
    }, []);

    useLayoutEffect(() => {
        const prevPeriodId = prevActivePeriodIdRef.current;

        if (prevPeriodId !== activePeriodId && localActivePeriodId !== activePeriodId && !isAnimating) {
            const currentLocalIndex = periods.findIndex((p) => p.id === localActivePeriodId);
            if (currentLocalIndex !== -1) {
                animateToNewPeriod(activePeriodId, currentLocalIndex, false);
            }
        }
        prevActivePeriodIdRef.current = activePeriodId;
    }, [activePeriodId, localActivePeriodId, isAnimating, periods, animateToNewPeriod]);
};
