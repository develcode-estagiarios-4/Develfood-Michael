import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const TabBarLabel = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryReg};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text_gray};
    margin-top: ${RFValue(-10)}px;
`;