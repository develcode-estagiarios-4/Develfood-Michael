import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const window = Dimensions.get('window');

export const Container = styled.View`
    position: absolute;
    width: ${window.width}px;
    z-index: 1;
    bottom: ${RFValue(45)}px;
    padding: ${RFValue(15)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primaryMed};
    font-size: ${({ theme }) => theme.sizes.medium}px;
    color: ${({ theme }) => theme.colors.text_white};
`;

export const Rect = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.button};
    width: 100%;
    height: ${RFValue(44)}px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${RFValue(15)}px;
`;

export const Icon = styled.Image.attrs({ resizeMode: 'contain' })`
    width: ${RFValue(20)}px;
    height: ${RFValue(20)}px;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
    font-size: ${({ theme }) => theme.sizes.medium}px;
    color: ${({ theme }) => theme.colors.text_white};
`;
