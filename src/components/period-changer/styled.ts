import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';

import { colors, mediaQuery } from '../../styled';

import { Chevron } from './chevron';

export const PeriodChangerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    z-index: 1;
    ${mediaQuery.lt1000} {
        gap: 11px;
    }
`;

export const PeriodChangerContainer = styled.div`
    display: flex;
    gap: 39px;
`;

export const IndicatorsContainer = styled.div`
    display: none;
    gap: 10px;
    ${mediaQuery.lt1000} {
        display: flex;
    }
`;

export const Indicator = styled.div<{ $opacity: number; $isActive: boolean }>`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${colors.blackBlue};
    opacity: ${({ $opacity }) => $opacity};
    cursor: ${({ $isActive }) => $isActive ? 'default' : 'pointer'};
    transition: opacity 0.3s ease;

    &:hover {
        opacity: ${({ $isActive }) => $isActive ? 1 : 0.6};
    }
`;

export const PeriodCounter = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${colors.blackBlue};
    line-height: 1;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    ${mediaQuery.lt1000} {
        gap: 8px;
    }
`;

export const ArrowIcon = styled(Chevron)<{ $direction: 'left' | 'right' }>`
    ${({ $direction }) =>
        $direction === 'left' ? '' : 'transform: rotate(-180deg)'
    }
`;

const disabledStyle = ({ $isDisabled }: { $isDisabled?: boolean }) => $isDisabled ? `
    border: 1px solid ${hexToRgba(colors.blackBlue, 0.2)};
    color: ${hexToRgba(colors.blackBlue, 0.2)};
` : '';

export const ChangeButton = styled.button<{ $isDisabled?: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid ${hexToRgba(colors.blackBlue, 0.6)};
    color: ${colors.blackBlue};
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ $isDisabled }) => $isDisabled ? 'default' : 'pointer'};
    transition: opacity 0.3s ease;
    ${disabledStyle}

    &:hover {
        border: 1px solid ${hexToRgba(colors.blackBlue, 0.35)};
        color: ${hexToRgba(colors.blackBlue, 0.65)};
        ${disabledStyle}
    }

    &:active {
        border: 1px solid ${hexToRgba(colors.blackBlue, 0.8)};
        color: ${hexToRgba(colors.blackBlue, 0.8)};
        ${disabledStyle}
    }

    ${mediaQuery.lt1000} {
        width: 25px;
        height: 25px;
    }
`;
