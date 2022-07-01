import { SectionList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
    font-size: 24px;
    align-self: center;
`;

export const SectionHeader = styled.View`
    padding: ${RFValue(15)}px 0;
`;

export const SectionHeaderText = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.text_gray};
    font-family: ${props => props.theme.fonts.primaryReg};
`;

export const ItemSeparator = styled.View`
    height: ${RFValue(25)}px;
    width: 100%;
`;