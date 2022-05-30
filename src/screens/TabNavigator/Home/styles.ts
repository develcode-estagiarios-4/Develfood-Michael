import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

    margin-bottom: 70px;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 0 ${RFValue(20)}px;
    margin-top: ${RFValue(320)}px;
`;


export const List = styled.FlatList`
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
`;

export const BannerWrapper = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 12 },
})`
    flex: 1;
    position: absolute;
    margin-top: ${RFValue(10)}px;
    //background-color: red;
`;

export const Banner = styled.Image`
    margin-right: ${RFValue(8)}px;
    width: ${RFValue(310)}px;
    height: ${RFValue(135)}px;
    border-radius: 10px;
`;

export const TitleWrapper = styled.View`
    position: absolute;
    margin-top: ${RFValue(256)}px;
    margin-left: ${RFValue(14)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${RFValue(14)}px;
    font-weight: bold;
`;

export const RestaurantList = styled.FlatList``;
