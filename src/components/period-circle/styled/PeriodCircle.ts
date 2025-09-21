import styled from 'styled-components';

import { colors } from '../../../styled';
import { mainWrapperHeight, verticalCenter } from '../../periods/styled';
import { pointNormalSize } from '../constants';

export const PeriodCircleWrapper = styled.div`
    position: absolute;
    width: ${mainWrapperHeight}px;
    height: ${mainWrapperHeight}px;
    display: flex;
    left: 50%;
    top: ${verticalCenter}px;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
`;

export const MainCircle = styled.div`
    position: absolute;
    width: 530px;
    height: 530px;
    border: 1px solid ${colors.blackBlue};
    border-radius: 50%;
    opacity: 0.2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
`;

export const PeriodPointsWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;
export const PeriodPointInteraction = styled.div`
    position: absolute;
    width: 56px;
    height: 56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    transition: none;
    --is-hovered: 0;

    &:hover {
        --is-hovered: 1;
    }

    * {
        transition-property: none !important;
    }
`;

export const PeriodNumber = styled.div<{ $isActive: boolean }>`
    color: ${colors.blackBlue};
    font-size: 20px;
    font-weight: bold;
    pointer-events: none;
    user-select: none;
    transition: none;
    opacity: ${({ $isActive }) => $isActive ? 1 : 0};

    transition-property: none !important;
`;

export const PeriodPoint = styled.div<{ $isActive: boolean; }>`
    position: relative;
    border-radius: 50%;
    width: ${pointNormalSize}px;
    height: ${pointNormalSize}px;
    ${({ $isActive }) => {
        return $isActive ? `
            background-color: white;
            border: 1px solid ${colors.blackBlue};
        ` : `
            background-color: ${colors.blackBlue};
            border: none;
        `;
    }}
    transition: none;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    * {
        transition-property: none !important;
    }
`;

export const PeriodTitleWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;

export const PeriodTitle = styled.div<{ $isActive: boolean; }>`
    position: absolute;
    left: calc(100% + 20px);
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.blackBlue};
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    transition: none;
    pointer-events: none;
    user-select: none;
    opacity: ${({ $isActive }) => $isActive ? 1 : 0};
    scale: ${({ $isActive }) => $isActive ? 1 : 0};

    transition-property: none !important;
`;
