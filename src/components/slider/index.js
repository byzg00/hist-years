import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { calculateAnimationDuration } from '../../utils';
import { SliderWrapper, SliderContainer, SliderArrow, SlideContent, SlideTitle, SlideText, CustomArrow, MobileHeader, MobileTitle, MobileDivider } from './styled';
export var Slider = function (_a) {
    var activePeriodId = _a.activePeriodId, periods = _a.periods;
    var _b = useState(true), isVisible = _b[0], setIsVisible = _b[1];
    var _c = useState(activePeriodId), displayedPeriodId = _c[0], setDisplayedPeriodId = _c[1];
    var swiperRef = useRef(null);
    var _d = useState(false), mounted = _d[0], setMounted = _d[1];
    var _e = useState(true), isBeginning = _e[0], setIsBeginning = _e[1];
    var _f = useState(false), isEnd = _f[0], setIsEnd = _f[1];
    var currentPeriod = periods.find(function (p) { return p.id === displayedPeriodId; }) || null;
    useEffect(function () {
        setMounted(true);
    }, []);
    useEffect(function () {
        if (activePeriodId !== displayedPeriodId) {
            var currentPeriodIndex = periods.findIndex(function (p) { return p.id === activePeriodId; });
            var animationDuration = calculateAnimationDuration(0, currentPeriodIndex, periods.length);
            setIsVisible(false);
            var timeout_1 = setTimeout(function () {
                setDisplayedPeriodId(activePeriodId);
                if (swiperRef.current) {
                    swiperRef.current.slideTo(0, 0);
                }
                setIsVisible(true);
            }, animationDuration * 1000);
            return function () { return clearTimeout(timeout_1); };
        }
        return undefined;
    }, [activePeriodId, displayedPeriodId, periods]);
    if (!mounted || !currentPeriod) {
        return null;
    }
    var events = Object.entries(currentPeriod.events);
    var handlePrevClick = function () {
        if (swiperRef.current && !isBeginning) {
            swiperRef.current.slidePrev();
        }
    };
    var handleNextClick = function () {
        if (swiperRef.current && !isEnd) {
            swiperRef.current.slideNext();
        }
    };
    return (_jsxs(SliderWrapper, { "$isVisible": isVisible, children: [_jsxs(MobileHeader, { children: [_jsx(MobileTitle, { children: currentPeriod.title }), _jsx(MobileDivider, {})] }), _jsx(SliderContainer, { children: _jsx(Swiper, { spaceBetween: 80, slidesPerView: "auto", onSwiper: function (swiper) {
                        swiperRef.current = swiper;
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }, onSlideChange: function (swiper) {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }, breakpoints: {
                        320: {
                            spaceBetween: 25,
                        },
                        1000: {
                            spaceBetween: 80,
                        },
                    }, children: events.map(function (_a) {
                        var year = _a[0], description = _a[1];
                        return (_jsx(SwiperSlide, { children: _jsxs(SlideContent, { children: [_jsx(SlideTitle, { children: year }), _jsx(SlideText, { children: description })] }) }, year));
                    }) }) }), _jsx(SliderArrow, { "$direction": "prev", "$disabled": isBeginning, onClick: handlePrevClick, children: _jsx(CustomArrow, { "$direction": "prev" }) }), _jsx(SliderArrow, { "$direction": "next", "$disabled": isEnd, onClick: handleNextClick, children: _jsx(CustomArrow, { "$direction": "next" }) })] }));
};
