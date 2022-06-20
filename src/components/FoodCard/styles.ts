import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const window = Dimensions.get('window');

export const Container = styled.View.attrs({
    elevation: 4,
})`
    width: ${window.width - RFValue(40)}px;
    height: ${window.height * 0.15};
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 15px;
    align-items: center;
    margin-bottom: ${RFValue(12)}px;
    align-self: center;
`;

export const Wrapper = styled.View`
    width: 65%;
    height: ${RFValue(85)}px;
    padding-right: ${RFValue(18)}px;
    justify-content: center;
`;

export const ImageWrapper = styled.View`
    width: 35%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const FoodImage = styled.Image.attrs({ resizeMode: 'cover' })`
    width: ${RFValue(85)}px;
    height: ${RFValue(85)}px;
    border-radius: 15px;
`;

export const Title = styled.Text.attrs({})`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.medium};
`;

export const Description = styled.Text`
    text-align: justify;
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_gray};
    font-size: ${RFValue(10.5)}px;
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
    font-size: ${({ theme }) => theme.sizes.medium};
`;

export const AddButton = styled.TouchableOpacity``;
