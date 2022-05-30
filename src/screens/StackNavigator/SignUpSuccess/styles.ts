import { Button } from '@components/Button';
import { Dimensions, useWindowDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${RFValue(35)}px;
    padding-top: ${RFValue(90)}px;
`;


export const StepsDoneImage = styled.Image`
    width: ${RFValue(192)}px;
    height: ${RFValue(210)}px;
    align-self: center;
    margin-bottom: ${RFValue(30)}px;
`;

export const Wrapper = styled.View`
    padding: 0 ${RFValue(15)}px;
`;

export const TitleWrapper = styled.View`
    flex-direction: row;
    justify-content: space-evenly;

`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.sizes.hiperMegaExtraLarge};
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.secondaryBold};
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
