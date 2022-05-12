import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
`;

export const Pizza = styled.Image`
    position: absolute;
    right: 0;
    top: 0;
`;

export const Hamburguer = styled.Image`
    position: absolute;
    left: 0;
    top: 0;
`;

export const Wrapper = styled.View`
    height: ${RFPercentage(50)};
    padding: 40px;
    z-index: 1;
`;

export const LogoWrapper = styled.View`
    width: 100%;
    align-items: center;
`;

export const Logo = styled.Image`
    margin-bottom: 15px;
`;

export const Form = styled.View``;

export const Particles = styled.Image`
    position: absolute;
    bottom: 0;
`;
