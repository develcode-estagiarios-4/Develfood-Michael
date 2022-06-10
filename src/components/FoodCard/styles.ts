import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
    elevation: 8,
})`
    width: ${RFValue(296)}px;
    height: ${RFValue(110)}px;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 15px;
    //justify-content: center;
    align-items: center;
    //padding: 15px;
`;

export const Wrapper = styled.View`
    width: 65%;
    height: ${RFValue(110)}px;
    padding-right: ${RFValue(15)}px;
    justify-content: center;
    //align-items: center;
    //background-color: yellow;
`;

export const ImageWrapper = styled.View`
    width: 35%;
    height: ${RFValue(110)}px;
    align-items: center;
    justify-content: center;
    //background-color: green;
`;

export const FoodImage = styled.Image.attrs({ resizeMode: 'cover' })`
    width: ${RFValue(85)}px;
    height: ${RFValue(85)}px;
    border-radius: 15px;
`;

export const Title = styled.Text.attrs({})`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${RFValue(14)}px;
`;

export const DescriptionWrapper = styled.View``;

export const Description = styled.Text`
    text-align: justify;
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_gray};
    font-size: ${RFValue(10)}px;
`;

export const Footer = styled.View`
height: ${RFValue(30)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.small};
`;

export const AddButton = styled.TouchableOpacity``;
