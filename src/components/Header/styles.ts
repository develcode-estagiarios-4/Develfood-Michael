import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${props => props.theme.colors.background_red};
    width: 100%;
    height: ${RFValue(65)};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
`;

