import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const BannerWrapper = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 12 },
})`
    flex: 1;
    position: absolute;
    top: ${RFValue(15)}px;
    //background-color: red;
`;

export const Banner = styled.Image`
    margin-right: ${RFValue(8)}px;
    width: ${RFValue(310)}px;
    height: ${RFValue(135)}px;
    border-radius: 10px;
`;


export const Content = styled.View`
    
    //justify-content: center;
    //align-items: center;
    //padding: 0 ${RFValue(20)}px;
    margin-top: ${RFValue(175)}px;
    //align-items: center;
`;

export const View = styled.View`
    padding: 0 20px;
    margin: 15px 0;
`;

export const Categories = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 12 },
})`
    
`;


export const List = styled.View`
    background-color: steelblue;
    width: 100%;
    padding: 25px;

`;


export const TitleWrapper = styled.View`
   //background-color: yellow;
   padding: 0 20px;
   margin-bottom: 15px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${RFValue(14)}px;
    font-weight: bold;
`;



export const RestaurantList = styled.FlatList`
    //background-color: cadetblue;
    width: 100%;
`;
