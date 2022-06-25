import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)`
    position: absolute;
    background-color: ${({ theme }) => theme.colors.header};
    flex-direction: row;
    height: ${RFValue(50)}px;
    width: 100%;
    align-items: center;
    padding: 10px;
    padding-top: 10px;
    z-index: 1;
`;

export const ButtonContainer = styled.View`
    height: ${RFValue(56)}px;
    flex-direction: row;
    width: 100%;
    margin-top: ${RFValue(5)}px;
`;

export const UselessView = styled.View`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
    tintColor: theme.colors.icon_white,
})`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.small}px;
    color: ${(props) => props.theme.colors.text_white};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
`;
