import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
    elevation: 9,
})`
    width: 100%;
    height: ${RFValue(105)}px;
    background-color: ${(props) => props.theme.colors.card};
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ImageWrapper = styled.View`
    width: 15%;
    height: 75%;
`;

export const InfoWrapper = styled.View`
    width: 75%;
    height: 80%;
    justify-content: space-evenly;
`;

export const RestaurantImage = styled.Image`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
    border-radius: ${RFValue(25)}px;
`;

export const Title = styled.Text`
    font-size: ${(props) => props.theme.sizes.large}px;
    color: ${(props) => props.theme.colors.text_dark};
    font-family: ${(props) => props.theme.fonts.primaryMed};
`;

export const CheckMark = styled.Image`
    width: ${RFValue(15)}px;
    height: ${RFValue(15)}px;
    border-radius: ${RFValue(25)}px;
`;

export const SubtitleWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-self: flex-start;
    align-items: center;
`;

export const Subtitle = styled.Text`
    font-size: ${(props) => props.theme.sizes.small}px;
    color: ${(props) => props.theme.colors.text_gray};
    font-family: ${(props) => props.theme.fonts.secondaryBold};
    text-align: left;
`;

export const OrderNumber = styled(Subtitle)`
    font-family: ${(props) => props.theme.fonts.secondaryReg};
`;
