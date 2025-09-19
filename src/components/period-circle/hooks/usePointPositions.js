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
import { useMemo } from 'react';
import { getPointXyByIndex } from '../utils';
export var usePointPositions = function (params) {
    var periods = params.periods, activePeriodId = params.activePeriodId, activePeriodIndex = params.activePeriodIndex;
    return useMemo(function () {
        if (periods.length === 0)
            return [];
        return periods.map(function (period, index) {
            var _a = getPointXyByIndex(index, activePeriodIndex, periods.length), x = _a.x, y = _a.y, angle = _a.angle;
            return __assign(__assign({}, period), { x: x, y: y, angle: angle, isActive: period.id === activePeriodId, originalIndex: index });
        });
    }, [periods, activePeriodId, activePeriodIndex]);
};
