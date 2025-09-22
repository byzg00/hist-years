import styled from 'styled-components';

import { colors, mediaQuery } from '../../styled';

export const horizontalPaddingMobile = 20;
export const mainWrapperHeight = 134 + 393 + 88;
export const verticalCenter = 480;
const leftPadding = 80;

export const PeriodsWrapper = styled.div`
    position: relative;
    max-width: 1440px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 170px 40px 104px ${leftPadding}px;
    box-sizing: border-box;
    ${mediaQuery.lt480} {
        align-items: flex-start;
        justify-content: space-between;
        padding: unset;
        padding-left: ${horizontalPaddingMobile}px;
        padding-bottom: 13px;
        min-height: 568px;
    }
`;

export const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: ${mainWrapperHeight}px;
    ${mediaQuery.lt480} {
        gap: 56px;
        justify-content: normal;
        min-height: auto;
    }
`;

export const LineVertical = styled.div<{ $left: number }>`
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: ${colors.blackBlue};
    left: calc(${({ $left }) => $left}% - 1px);
    top: 0;
    transform: translateX(-50%);
    opacity: 0.2;
`;

export const LineHorizontal = styled.div<{ $top: string }>`
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${colors.blackBlue};
    top: calc(${({ $top }) => $top} - 1px);
    left: 0;
    transform: translateY(-50%);
    opacity: 0.2;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: stretch;
    position: relative;
    ${mediaQuery.lt480} {
        padding: 59px 0 0;
        position: static;
    }
`;

export const TitleLine = styled.div`
    position: absolute;
    top: 0;
    left: ${-leftPadding - 5 / 2}px;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, ${colors.iris100} 0%, ${colors.fuschia100} 100%);
    flex-shrink: 0;
    transform: scaleY(${120 / 135});
    ${mediaQuery.lt480} {
        display: none;
    }
`;

export const TitleText = styled.div`
    line-height: 120%;
    font-size: 56px;
    font-weight: 700;
    color: ${colors.blackBlue};
    max-width: 353px;
    ${mediaQuery.lt480} {
        font-size: 20px;
        max-width: 123px;
    }
`;
