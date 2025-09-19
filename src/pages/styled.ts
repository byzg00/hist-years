import styled from 'styled-components';

import { colors } from '../styled';

export const PageWrapper = styled.div`
    padding: 50px;
    text-align: center;
`;

export const MainTitle = styled.h1`
    font-size: 48px;
    color: ${colors.blackBlue};
    margin-bottom: 30px;
    letter-spacing: 2px;
    text-transform: uppercase;
`;

export const CircleWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

export const ActiveInfo = styled.p`
    font-size: 18px;
    color: ${colors.blackBlue};
    margin-top: 20px;
    font-weight: 500;
`;
