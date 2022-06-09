import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0 ${RFValue(15)}px;
`;

export const RestaurantWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //background-color: red;
    padding: ${RFValue(30)}px 0;
`;

export const TitleWrapper = styled.View`
    align-items: flex-start;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.divider};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 25px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.extraLarge};
    font-family: ${({ theme }) => theme.fonts.secondaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
`;

export const SubtitleCategory = styled.Text`
    font-size: ${({ theme }) => theme.sizes.medium};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    color: ${({ theme }) => theme.colors.text_gray};
`;

export const PlatesWrapper = styled.View`
    padding: ${RFValue(15)}px 0;
`;

