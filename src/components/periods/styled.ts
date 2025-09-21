import styled from 'styled-components';

import { colors } from '../../styled';

export const PeriodsWrapper = styled.div`
    position: relative;
    max-width: 1440px;
    max-height: 1080px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LineVertical = styled.div<{ $left: number }>`
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: ${colors.blackBlue};
    left: ${({ $left }) => $left}%;
    transform: translateX(-50%);
    opacity: 0.2;
`;

export const LineHorizontal = styled.div<{ $top: number }>`
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${colors.blackBlue};
    top: ${({ $top }) => $top}%;
    transform: translateY(-50%);
    opacity: 0.2;
`;

export const TitleWrapper = styled.div`
    padding-top: 170px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: stretch;
    gap: 80px;
`;

export const TitleLine = styled.div`
    width: 5px;
    background: linear-gradient(180deg, ${colors.iris100} 0%, ${colors.fuschia100} 100%);
    flex-shrink: 0;
    transform: scaleY(${120/135});
`;

export const TitleText = styled.div`
    line-height: 120%;
    font-size: 56px;
    font-weight: 700;
    color: ${colors.blackBlue};
    max-width: 353px;
`;