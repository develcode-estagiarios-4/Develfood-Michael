import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Button } from '@components/Button';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
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
    padding: ${RFValue(35)}px;
    z-index: 1;
    align-self: center;
`;

export const LogoWrapper = styled.View`
    width: ${RFValue(170)}px;
    height: ${RFValue(70)}px;
`;

export const Logo = styled.Image.attrs({
    resizeMode: 'contain'
})`
    margin-bottom: ${RFValue(10)}px;
    width: 100%;
    height: 100%;
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

export const ForgotPasswordText = styled.Text`
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.verySmall}px;
`;

export const LoginButton = styled(Button)`
    margin-top: -12px;
`;

export const SignUpHere = styled.Text`
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.verySmall}px;
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.text_purple};
    font-size: ${({ theme }) => theme.sizes.verySmall}px;
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
