import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonIcon = styled(RectButton)`
  width: ${RFValue(75)}px;
  height: ${RFValue(75)}px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  width: ${RFValue(75)}px;
  font-size: ${RFValue(12)}px;
  text-align: center;
  margin-top: ${RFValue(-3)}px;
  color: ${({theme}) => theme.colors.text_gray};
  font-family: ${({theme}) => theme.fonts.primaryMed};
`;