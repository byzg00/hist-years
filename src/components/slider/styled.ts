import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';

import { colors, fonts, mediaQuery } from '../../styled';
import { Chevron } from '../period-changer/chevron';

export const SliderWrapper = styled.div<{ $isVisible: boolean }>`
    cursor: pointer;
    margin-top: 56px;
    opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
    transition: opacity 0.4s ease;
    position: relative;
    width: 100%;
    user-select: none;
    ${mediaQuery.lt1000} {
        margin-top: 0;
    }
`;

export const MobileHeader = styled.div`
    display: none;
    ${mediaQuery.lt1000} {
        display: block;
        margin-bottom: 20px;
        position: relative;
    }
`;

export const MobileTitle = styled.h2`
    font-family: ${fonts.decorative};
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
    color: ${colors.blackBlue};
    margin: 0 0 25px 0;
`;

export const MobileDivider = styled.div`
    position: relative;
    left: 0;
    right: 0;
    height: 1px;
    background: ${hexToRgba(colors.blackBlue, 0.1)};
`;

export const SliderContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .swiper {
        height: 100%;
        overflow: visible;
    }

    .swiper-slide {
        max-width: 320px;
        flex-shrink: 0;
        ${mediaQuery.lt1000} {
            max-width: 160px;
        }
    }
`;

export const SliderArrow = styled.div<{ $direction: 'prev' | 'next'; $disabled?: boolean }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 15px 0 ${hexToRgba(colors.blue, 0.1)};
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    display: ${({ $disabled }) => $disabled ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    z-index: 10;

    ${({ $direction }) => $direction === 'prev' ? 'left: -60px;' : 'right: -60px;'}

    ${mediaQuery.lt1000} {
        display: none;
    }
`;

export const SlideContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const SlideTitle = styled.h3`
    font-family: ${fonts.decorative};
    font-size: 25px;
    line-height: 120%;
    color: ${colors.blue};
    margin: 0 0 15px 0;
    font-weight: 400;
    ${mediaQuery.lt1000} {
        font-size: 16px;
    }
`;

export const SlideText = styled.p`
    font-family: ${fonts.primary};
    font-size: 20px;
    color: ${colors.blackBlue};
    margin: 0;
    line-height: 30px;
    ${mediaQuery.lt1000} {
        font-size: 14px;
        line-height: 1.45;
    }
`;

export const CustomArrow = styled(Chevron)<{ $direction: 'prev' | 'next' }>`
    color: ${colors.blue};
    transform: ${({ $direction }) => $direction === 'next' ? 'rotate(-180deg)' : 'none'};
    pointer-events: none;
`;
