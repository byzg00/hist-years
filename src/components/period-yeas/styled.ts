import styled from 'styled-components';
import { colors } from '../../styled';

export const YearsContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 200px;
    font-weight: bold;
    line-height: 160px;
    letter-spacing: -.02em;
    white-space: pre;
`;

export const FirstYearNumber = styled.div`
    color: ${colors.iris100};
`;

export const SecondYearNumber = styled.div`
    color: ${colors.fuschia100};
`;
