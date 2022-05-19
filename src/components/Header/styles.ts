import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${props => props.theme.colors.background_red};
    flex-direction: row;
    height: ${RFValue(78)}px;
    align-items: center;
    padding: 10px;
`;

export const ButtonContainer = styled.View`
    height: ${RFValue(56)}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: ${RFValue(5)}px;
    
`;

export const MapContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.Image.attrs({
    resizeMode: "contain",
    tintColor: "#fff"
})`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.text_white};
`;