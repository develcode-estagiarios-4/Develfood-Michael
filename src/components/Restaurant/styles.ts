import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
    elevation: 7,
})`
    width: ${RFValue(140)}px;
    height: ${RFValue(170)}px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${RFValue(15)}px;
    //margin-left: ${RFValue(15)}px;
    //margin-bottom: ${RFValue(10)}px;
`;

export const RestaurantImage = styled.Image.attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: undefined;
    aspect-ratio: 1;
    border-radius: ${RFValue(15)}px;
`;

export const Content = styled.View`
    width: 100%;
    padding-left: ${RFValue(12)}px;
    height: ${RFValue(60)}px;
    background-color: ${({ theme }) => theme.colors.background};
    position: absolute;
    bottom: 0;
    border-radius: ${RFValue(12)}px;
    justify-content: center;
`;

export const Title = styled.Text.attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 1,
})`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${RFValue(14)}px;
    font-weight: bold;
    padding-right: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.text_dark};
    margin-bottom: ${RFValue(2)}px;
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

export const AvaliationWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    
`;

export const Avaliation = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.icon_red};
    margin-left: ${RFValue(5)}px;
`;

export const Star = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: ${RFValue(10)}px;
    height: ${RFValue(10)}px;
`;
