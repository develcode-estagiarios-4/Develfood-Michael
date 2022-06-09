import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';

export const Container = styled.View`
    background-color: ${(props) => props.theme.colors.background};
    flex-direction: row;
    justify-content: space-between;
    height: ${RFValue(50)}px;
    align-items: center;
    padding: ${RFValue(15)}px;
`;

export const UselessView = styled.View`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const MapContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled.Image.attrs({
    resizeMode: 'contain',
    tintColor: theme.colors.icon_dark,
})`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
`;

export const Like = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: ${RFValue(22)}px;
    height: ${RFValue(22)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${(props) => props.theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
`;
