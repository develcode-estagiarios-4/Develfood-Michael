import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const window = Dimensions.get('window');

export const Container = styled.View`
    position: absolute;
    width: ${window.width - RFValue(20)}px;
    z-index: 1;
    margin: ${RFValue(10)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    font-size: ${({ theme }) => theme.sizes.medium}px;
    color: ${({ theme }) => theme.colors.text_white};
    position: absolute;
`;

export const Rect = styled(RectButton).attrs({
    elevation: 3,
})`
    background-color: ${({ theme }) => theme.colors.button};
    width: 100%;
    height: ${RFValue(44)}px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const BadgeWrapper = styled.View`
    background-color: blueviolet;
    
`;

export const Badge = styled.View`
    background-color: white;
    position: absolute;
    left: ${RFValue(33)}px;
    top: ${RFValue(4)}px;
    width: ${RFValue(17)}px;
    height: ${RFValue(17)}px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const BadgeNumber = styled.Text`
    color: ${({ theme }) => theme.colors.text_red};
    font-size: ${RFValue(10)}px;
    font-family: ${({ theme }) => theme.fonts.primaryMed};
`;

export const Icon = styled.Image.attrs({ resizeMode: 'contain' })`
    width: ${RFValue(25)}px;
    height: ${RFValue(25)}px;
    position: absolute;
    left: 15px;
`;

export const PriceWrapper = styled.View`
    position: absolute;
    right: 15px;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${({ theme }) => theme.sizes.medium}px;
    color: ${({ theme }) => theme.colors.text_white};
`;

