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
    padding: ${RFValue(12)}px;
    
`;

export const UselessView = styled.View`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
    tintColor: theme.colors.icon_white,
})`
    width: ${RFValue(25)}px;
    height: ${RFValue(25)}px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.less_than_medium}px;
    color: ${(props) => props.theme.colors.text_white};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    margin-left: 15px;
`;
