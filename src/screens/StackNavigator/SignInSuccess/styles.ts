import { Button } from '@components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${RFValue(30)}px;
    padding-top: ${RFValue(95)}px;
`;


export const StepsDoneImage = styled.Image`
    width: ${RFValue(192)}px;
    height: ${RFValue(210)}px;
    align-self: center;
    margin-bottom: ${RFValue(30)}px;
`;

export const Wrapper = styled.View`
    //background-color: chartreuse;
    padding: 0 ${RFValue(4)}px;
`;


export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.huge};
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    text-align: center;
`;

export const Subtitle = styled.Text`
    font-size: ${({ theme }) => theme.sizes.verySmall};
    color: ${({ theme }) => theme.colors.text_gray};
    font-family: ${({ theme }) => theme.fonts.secondaryMed};
    text-align: justify;
`;

export const OkButton = styled(Button).attrs({ elevation: 9 })`
    margin-top: ${RFValue(90)}px;
`;
