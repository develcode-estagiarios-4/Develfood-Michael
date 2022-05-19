import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const ImageWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const StepsDoneImage = styled.Image`
    width: ${RFValue(230)}px;
    height: ${RFValue(220)}px;
    position: absolute;
    align-self: center;
    top: ${RFValue(70)}px;
    
`;