import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
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
    padding: 40px;
    z-index: 1;
    margin-top: ${RFValue(170)}px;
`;

export const LogoWrapper = styled.View`
    width: 100%;
    background-color: blue;
`;

export const Logo = styled.Image`
    margin-bottom: ${RFValue(10)}px;
`;

export const Form = styled.View`
    align-items: center;
`;

export const ForgotPassword = styled.View`
    align-items: flex-end;
    margin-bottom: ${RFValue(18)}px;
`;

export const EsqueceuSenha = styled.TouchableOpacity.attrs({
    activeOpacity: 1
})``;

export const TitleButton = styled.Text`
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.small};
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.text_purple};
    font-size: ${({ theme }) => theme.sizes.small};
`;

export const CadastreSe = styled.View`
    justify-content: center;
    flex-direction: row;
    margin-top: ${RFValue(14)}px;
`;

export const Particles = styled.Image`
    position: absolute;
    bottom: 0;
`;
