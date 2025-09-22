import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { mediaQuery } from '../../styled';
import { PeriodCircle } from '../period-circle';
import { PeriodYears } from '../period-yeas';
import { PeriodChanger } from '../period-changer';
import { Slider } from '../slider';
import { LineHorizontal, LineVertical, MainWrapper, PeriodsWrapper, verticalCenter } from './styled';
import { Title } from './Title';
export var Periods = function (props) {
    var title = props.title, periods = props.periods, activePeriodId = props.activePeriodId, onActivate = props.onActivate;
    var isMobile = useMatchMedia(mediaQuery.lt1000);
    var _a = useState(false), isAnimating = _a[0], setIsAnimating = _a[1];
    var periodChanger = (_jsx(PeriodChanger, { periods: periods, activePeriodId: activePeriodId, onActivate: onActivate, isAnimating: isAnimating }));
    var slider = (_jsx(Slider, { activePeriodId: activePeriodId, periods: periods }));
    return (_jsxs(PeriodsWrapper, { children: [_jsxs(MainWrapper, { children: [isMobile ? null : (_jsxs(_Fragment, { children: [_jsx(LineVertical, { "$left": 0 }), _jsx(LineVertical, { "$left": 50 }), _jsx(LineVertical, { "$left": 100 }), _jsx(LineHorizontal, { "$top": "0%" }), _jsx(LineHorizontal, { "$top": "".concat(verticalCenter, "px") }), _jsx(LineHorizontal, { "$top": "100%" })] })), _jsx(Title, { title: title }), isMobile ? (_jsx(PeriodYears, { periods: periods, activePeriodId: activePeriodId })) : (_jsx(PeriodCircle, { periods: periods, activePeriodId: activePeriodId, onActivate: onActivate, onAnimationStateChange: setIsAnimating, children: _jsx(PeriodYears, { periods: periods, activePeriodId: activePeriodId }) })), isMobile ? null : periodChanger, isMobile ? slider : null] }), isMobile ? periodChanger : null, isMobile ? null : slider] }));
};
