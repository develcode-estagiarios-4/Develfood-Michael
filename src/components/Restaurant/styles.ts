import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: ${RFValue(156)}px;
    height: ${RFValue(173)}px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${RFValue(8)}px;
`;

export const RestaurantImage = styled.Image`
    width: ${RFValue(156)}px;
    height: ${RFValue(127)}px;
`;

export const Content = styled.View`
    width: 100%;
    padding-left: ${RFValue(12)}px;
    height: ${RFValue(69)}px;
    background-color: ${({ theme }) => theme.colors.background};
    position: absolute;
    bottom: 0;
    border-radius: ${RFValue(8)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${RFValue(14)}px;
    font-weight: bold;
    margin-top: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text_dark};
`;

export const Description = styled.View`
    margin-right: ${RFValue(12)}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text_gray};
`;

export const Avaliation = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.icon_red};
`;
