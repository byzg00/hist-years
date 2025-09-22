import styled from 'styled-components';

import { mediaQuery } from '../../styled';

export const SliderWrapper = styled.div`
    height: 135px;
    margin-top: 56px;
    background-color: greenyellow;
    ${mediaQuery.lt480} {
        margin-top: 0;
        height: 114px;
    }
`;