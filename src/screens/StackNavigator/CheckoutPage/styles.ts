import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const dimensions = Dimensions.get('window');

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const MapWrapper = styled.View`
    width: 100%;
    height: ${RFValue(100)}px;
    flex-direction: row;
    padding: ${RFValue(15)}px;
    align-items: center;
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

export const ImageRest = styled.Image`
    width: ${RFValue(70)}px;
    height: ${RFValue(70)}px;
    border-radius: 50px;
`;

export const Separator = styled.View`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 25px;
    margin: 0 ${RFValue(15)}px;
`;

export const RestaurantWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFValue(15)}px;
    margin-bottom: ${RFValue(10)}px;
`;

export const SubtitleCategory = styled.Text`
    font-size: ${({ theme }) => theme.sizes.medium}px;
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    color: ${({ theme }) => theme.colors.text_gray};
`;

export const MyItemsWrapper = styled.View`
    height: ${RFValue(55)}px;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.very_large}px;
`;

export const LittleTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.medium}px;
`;

export const EvenLittleTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.small}px;
`;

export const LittleSubtitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_gray};
    font-size: ${({ theme }) => theme.sizes.small}px;
`;

export const OrderList = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    margin-left: ${RFValue(15)}px;
    border-top-left-radius: ${RFValue(80)}px;
`;
