import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const RestaurantImage = styled.Image`
    width: 70;
    height: 70;
    border-radius: 50;
`;

export const ImageWrapper = styled.View`
    width: 70;
    height: 70;
    background-color: red;
`;

export const RestaurantWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //background-color: red;
    padding-bottom: ${RFValue(25)}px;
    padding-top: ${RFValue(18)}px;
`;

export const TitleWrapper = styled.View`
    align-items: flex-start;
`;

export const Separator = styled.View`
    width: ${RFPercentage(50)};
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 25px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.very_large};
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

export const LoadWrapper = styled.View`
    height: ${RFPercentage(50)}px;
    align-items: center;
    justify-content: center;
`;
