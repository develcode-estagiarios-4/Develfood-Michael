import styled from "styled-components/native";

export const Container = styled.View.attrs({
    elevation: 5
})`
    width: 100%;
    height: 120px;
    background-color: ${(props) => props.theme.colors.background};
    border-radius: 15px;
`;

export const Title = styled.Text`
    font-size: ${(props) => props.theme.sizes.medium}px;
    color: ${(props) => props.theme.colors.text_dark};
    font-family: ${(props) => props.theme.fonts.primaryMed};
`;