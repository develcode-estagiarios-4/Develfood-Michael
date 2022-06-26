import { Dimensions, useWindowDimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const window = Dimensions.get('window');

export const Container = styled.View.attrs({
    elevation: 4,
})`
    width: ${window.width - RFValue(40)}px;
    height: ${window.height * 0.15}px;
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
    font-size: ${({ theme }) => theme.sizes.medium}px;
`;

export const Description = styled.Text`
    text-align: justify;
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_gray};
`;

export const Footer = styled.View`
    width: 100%;
    height: ${window.height * 0.04}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: ${({ theme }) => theme.sizes.medium}px;
`;

export const CounterWrapper = styled.View`
    flex-direction: row;
    height: 100%;
    
    justify-content: center;
    align-items: center;
`;

export const TrashIcon = styled.Image.attrs({ resizeMode: 'contain' })`
    width: ${RFValue(15)}px;
    height: ${RFValue(15)}px;
    margin-right: 10px;
`;

export const Counter = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    color: ${({ theme }) => theme.colors.text_white};
    font-size: ${({ theme }) => theme.sizes.medium}px;
    align-self: center;
    padding: 0 ${RFValue(9)}px; ;
`;

export const NumberWrapper = styled.View`
    background-color: ${({ theme }) => theme.colors.background_red};
    height: ${RFValue(25)}px;
    justify-content: center;
    border-radius: 5px;
`;

export const AddButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
    hitSlop: 20,
})``;

export const PlusButton = styled.Text.attrs({})`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.large}px;
    position: absolute;
`;

export const PlusWrapper = styled.View`
    width: ${RFValue(15)}px;
    height: 100%;
    justify-content: center;
    margin-left: 10px;
`;

export const MinusWrapper = styled.View`
    width: ${RFValue(15)}px;
    height: 100%;
    justify-content: center;
    margin-right: 10px;
`;

export const MinusButton = styled.Text.attrs({})`
    font-family: ${({ theme }) => theme.fonts.primaryReg};
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${({ theme }) => theme.sizes.extraLarge}px;
    position: absolute;
    align-self: center;
`;
