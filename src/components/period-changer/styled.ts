import styled from 'styled-components';
import { colors } from '../../styled';

export const PeriodChangerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const PeriodCounter = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${colors.blackBlue};
    line-height: 18px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

export const ChangeButton = styled.button<{ $isDisabled?: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid ${colors.blackBlue};
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ $isDisabled }) => $isDisabled ? 'default' : 'pointer'};
    opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 1};
    transition: opacity 0.3s ease;
    
    &:hover {
        opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 0.8};
    }
    
    &:active {
        opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 0.6};
    }
`;

export const ArrowIcon = styled.div<{ $direction: 'left' | 'right' }>`
    width: 0;
    height: 0;
    border-style: solid;
    
    ${({ $direction }) => $direction === 'left' 
        ? `
            border-left: 0;
            border-right: 8px solid ${colors.blackBlue};
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
        `
        : `
            border-left: 8px solid ${colors.blackBlue};
            border-right: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
        `
    }
`;
