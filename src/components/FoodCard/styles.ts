import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View.attrs({
    elevation: 8,
})`
    width: 100%;
    height: ${RFValue(110)}px;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 15px;
    //justify-content: center;
    align-items: center;
    padding: 15px;
`;

export const Wrapper = styled.View`
    width: ${RFValue(185)}px;
    margin-left: 15px;
`;

export const FoodImage = styled.Image.attrs({ resizeMode: 'cover' })`
    width: ${RFValue(80)}px;
    height: ${RFValue(80)}px;
    border-radius: 15px;
`;

export const Title = styled.Text.attrs({})`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.large};
`;

export const Description = styled.Text`
    text-align: justify;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.medium};
`;

export const AddButton = styled.TouchableOpacity`
`;
