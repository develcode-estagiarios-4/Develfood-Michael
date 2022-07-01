import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 ${RFValue(22)}px;
    background-color: ${(props) => props.theme.colors.background};
`;

export const Image = styled.Image`
    width: ${RFValue(300)}px;
    height: ${RFValue(280)}px;
    align-self: center;
    margin-top: ${RFValue(20)}px;
`;

export const Title = styled.Text`
    font-size: ${(props) => props.theme.sizes.massive}px;
    color: ${(props) => props.theme.colors.text_dark};
    font-family: ${(props) => props.theme.fonts.primaryMed};
    align-self: center;
`;

export const Subtitle = styled.Text`
    font-size: ${(props) => props.theme.sizes.small}px;
    color: ${(props) => props.theme.colors.text_gray};
    font-family: ${(props) => props.theme.fonts.primaryReg};
    align-self: center;
    padding: ${RFValue(20)}px ${RFValue(20)}px;
`;

