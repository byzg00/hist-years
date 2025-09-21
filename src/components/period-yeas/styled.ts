import styled from 'styled-components';

import { colors, mediaQuery } from '../../styled';
import { horizontalPaddingMobile } from '../periods/styled';

export const YearsContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 200px;
    font-weight: bold;
    line-height: 160px;
    letter-spacing: -.02em;
    white-space: pre;
    ${mediaQuery.lt480} {
        font-size: 56px;
        padding: 0 ${horizontalPaddingMobile}px;
    }
`;

export const FirstYearNumber = styled.div`
    color: ${colors.iris100};
`;

export const SecondYearNumber = styled.div`
    color: ${colors.fuschia100};
`;
