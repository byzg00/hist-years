import { useLayoutEffect, useRef } from 'react';
export var useHandleChangeActivePeriod = function (params) {
    var activePeriodId = params.activePeriodId, isAnimating = params.isAnimating, periods = params.periods, animateToNewPeriod = params.animateToNewPeriod, localActivePeriodId = params.localActivePeriodId, setLocalActivePeriodId = params.setLocalActivePeriodId;
    var prevActivePeriodIdRef = useRef(activePeriodId);
    useLayoutEffect(function () {
        if (!isAnimating && localActivePeriodId !== activePeriodId) {
            setLocalActivePeriodId(activePeriodId);
        }
    }, []);
    useLayoutEffect(function () {
        var prevPeriodId = prevActivePeriodIdRef.current;
        if (prevPeriodId !== activePeriodId && localActivePeriodId !== activePeriodId && !isAnimating) {
            var currentLocalIndex = periods.findIndex(function (p) { return p.id === localActivePeriodId; });
            if (currentLocalIndex !== -1) {
                animateToNewPeriod(activePeriodId, currentLocalIndex, false);
            }
        }
        prevActivePeriodIdRef.current = activePeriodId;
    }, [activePeriodId, localActivePeriodId, isAnimating, periods, animateToNewPeriod]);
};
