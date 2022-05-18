import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: ${RFValue(60)}px;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  bottom: 0;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.icon_gray};
  padding-bottom: ${RFValue(10)}px;
  padding-top: ${RFValue(5)}px;
`;