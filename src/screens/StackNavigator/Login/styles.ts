import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
`;

export const Pizza = styled.Image`
    position: absolute;
    right: 0;
    top: 0;
`;

export const Hamburguer = styled.Image`
    position: absolute;
    left: 0;
    top: 0;
`;

export const Wrapper = styled.View`
    width: 100%;
    padding: 40px;
`;

export const LogoWrapper = styled.View`
    width: 100%;
    align-items: center;
`;

export const Logo = styled.Image`
    margin-bottom: 15px;
`;

export const Form = styled.View`
    
`;

export const Input = styled.View`
    borderWidth: 1;
    borderColor: #E5E5E5;
    borderRadius: 10;
    margin-bottom: 12px;
                    
`;

export const Particles = styled.Image`
    position: absolute;
    bottom: 0;
`;


