var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useCallback, useMemo } from 'react';
import { getPointXyByIndex } from '../utils';
export var useCalculatePointPositions = function (params) {
    var periods = params.periods;
    return useCallback(function (targetActivePeriodIndex) {
        return periods.map(function (period, index) {
            var _a = getPointXyByIndex(index, targetActivePeriodIndex, periods.length), x = _a.x, y = _a.y, angle = _a.angle;
            return __assign(__assign({}, period), { x: x, y: y, angle: angle, isActive: index === targetActivePeriodIndex, originalIndex: index });
        });
    }, [periods]);
};
export var usePointPositions = function (params) {
    var periods = params.periods, activePeriodIndex = params.activePeriodIndex;
    var calculatePointPositions = useCalculatePointPositions({ periods: periods });
    return useMemo(function () {
        if (periods.length === 0)
            return [];
        return calculatePointPositions(activePeriodIndex);
    }, [periods, activePeriodIndex, calculatePointPositions]);
};
