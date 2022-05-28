import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    margin-top: 12px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    font-size: ${({ theme }) => theme.sizes.medium};
    color: ${({ theme }) => theme.colors.text_white};
`;

export const Rect = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.button};
    width: 100%;
    height: ${RFValue(48)}px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    
`;

