import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`;

export const HeaderView = styled.View`
    
`;

export const ScrollView = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    padding: 24px;
`;

export const Title = styled.Text`
    font-size: 24px;
`;
