import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonIcon = styled.TouchableOpacity`
  width: ${RFValue(75)}px;
  height: ${RFValue(60)}px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  width: ${RFValue(75)}px;
  font-size: ${RFValue(12)}px;
  text-align: center;
  color: ${({theme}) => theme.colors.icon_gray};
  font-family: ${({theme}) => theme.fonts.primaryReg};
`;