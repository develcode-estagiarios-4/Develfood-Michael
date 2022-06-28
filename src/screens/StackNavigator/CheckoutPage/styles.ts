import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const dimensions = Dimensions.get('window');

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0 ${RFValue(15)}px;
`;

export const MapWrapper = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    background-color: blue;
    padding: ${RFValue(15)}px 0;
`;

export const MapImage = styled.Image`
    width: ${RFValue(70)}px;
    height: ${RFValue(70)}px;
    border-radius: 10px;
`;

export const MapInfoWrapper = styled.View`
    flex: 1;
    margin-left: ${RFValue(10)}px;
    
`;

export const Image = styled.Image`
    width: ${RFValue(70)}px;
    height: ${RFValue(70)}px;
    border-radius: 50px;
    background-color: magenta;
`;

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 25px;
`;

export const RestaurantWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${RFValue(25)}px;
    padding-top: ${RFValue(18)}px;
    background-color: yellow;
   
    padding-bottom: ${RFValue(20)}px;
`;

export const SubtitleCategory = styled.Text`
    font-size: ${({ theme }) => theme.sizes.medium}px;
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    color: ${({ theme }) => theme.colors.text_gray};
`;

export const MyItemsWrapper = styled.View`
   
    height: ${RFValue(60)}px;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin-left: ${RFValue(110)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.very_large}px;
`;

export const LittleTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.large}px;
`;

export const OrderList = styled.View`
    width: ${dimensions.width * 1.13}px;
    height: undefined;
    padding-bottom: ${RFValue(50)}px;
    padding-left: ${RFValue(20)}px;
    background-color: ${({ theme }) => theme.colors.gray};
    margin-left: ${RFValue(15)}px;
    border-radius: ${RFValue(80)}px;
`;
