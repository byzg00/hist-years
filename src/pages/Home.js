import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { PeriodCircle } from '../components/period-circle';
import { PageWrapper, MainTitle, CircleWrapper, ActiveInfo } from './styled';
var periods = [
    { id: 'period-1', num: 1, title: 'Первый период' },
    { id: 'period-2', num: 2, title: 'Второй период' },
    { id: 'period-3', num: 3, title: 'Третий период' },
    { id: 'period-4', num: 4, title: 'Длинное название периода' },
    { id: 'period-5', num: 5, title: 'Пятый период' },
    { id: 'period-6', num: 6, title: 'Шестой период' },
];
var App = function () {
    var _a = useState('period-3'), activePeriodId = _a[0], setActivePeriodId = _a[1];
    var handleActivate = function (periodId) {
        setActivePeriodId(periodId);
    };
    return (_jsxs(PageWrapper, { children: [_jsx(MainTitle, { children: "\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0438\u043E\u0434\u044B" }), _jsx(CircleWrapper, { children: _jsx(PeriodCircle, { periods: periods, activePeriodId: activePeriodId, onActivate: handleActivate }) }), _jsxs(ActiveInfo, { children: ["\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434: ", activePeriodId] })] }));
};
export default App;
