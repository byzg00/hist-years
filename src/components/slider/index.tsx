import { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import { Period } from '../../types';
import { calculateAnimationDuration } from '../../utils';

import { SliderWrapper, SliderContainer, SliderArrow, SlideContent, SlideTitle, SlideText, CustomArrow, MobileHeader, MobileTitle, MobileDivider } from './styled';

interface SliderProps {
    activePeriodId: string | null;
    periods: Period[];
}

export const Slider: FC<SliderProps> = ({ activePeriodId, periods }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [displayedPeriodId, setDisplayedPeriodId] = useState(activePeriodId);
    const swiperRef = useRef<SwiperType | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const currentPeriod = periods.find((p) => p.id === displayedPeriodId) || null;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect((): void | (() => void) => {
        if (activePeriodId !== displayedPeriodId) {
            const currentPeriodIndex = periods.findIndex((p) => p.id === activePeriodId);
            const animationDuration = calculateAnimationDuration(0, currentPeriodIndex, periods.length);

            setIsVisible(false);

            const timeout = setTimeout(() => {
                setDisplayedPeriodId(activePeriodId);
                if (swiperRef.current) {
                    swiperRef.current.slideTo(0, 0);
                }
                setIsVisible(true);
            }, animationDuration * 1000);

            return () => clearTimeout(timeout);
        }
        return undefined;
    }, [activePeriodId, displayedPeriodId, periods]);

    if (!mounted || !currentPeriod) {
        return null;
    }

    const events = Object.entries(currentPeriod.events);

    const handlePrevClick = () => {
        if (swiperRef.current && !isBeginning) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current && !isEnd) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <SliderWrapper $isVisible={isVisible}>
            <MobileHeader>
                <MobileTitle>{currentPeriod.title}</MobileTitle>
                <MobileDivider />
            </MobileHeader>

            <SliderContainer>
                <Swiper
                    spaceBetween={80}
                    slidesPerView="auto"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    breakpoints={{
                        320: {
                            spaceBetween: 25,
                        },
                        1000: {
                            spaceBetween: 80,
                        },
                    }}
                >
                    {events.map(([year, description]) => (
                        <SwiperSlide key={year}>
                            <SlideContent>
                                <SlideTitle>{year}</SlideTitle>
                                <SlideText>{description}</SlideText>
                            </SlideContent>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SliderContainer>

            <SliderArrow
                $direction="prev"
                $disabled={isBeginning}
                onClick={handlePrevClick}
            >
                <CustomArrow $direction="prev" />
            </SliderArrow>
            <SliderArrow
                $direction="next"
                $disabled={isEnd}
                onClick={handleNextClick}
            >
                <CustomArrow $direction="next" />
            </SliderArrow>
        </SliderWrapper>
    );
};
