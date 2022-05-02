import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${props => props.theme.colors.background_red};
    
    height: ${RFValue(78)};
    
    
    padding-top: 20px;
`;

export const ButtonContainer = styled.View`
    height: ${RFValue(56)};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: ${RFValue(5)};
`;

export const MapContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.Image.attrs({
    resizeMode: "contain",
    tintColor: "#fff"
})`
    width: ${RFValue(35)};
    height: ${RFValue(35)};
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.text_white};
`;