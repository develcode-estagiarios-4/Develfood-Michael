import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
    ButtonContainer,
    Container,
    Icon,
    MapContainer,
    Title,
} from './styles';

export function HeaderHome() {
    return (
        <Container>
            <ButtonContainer >
                <BorderlessButton  >
                    <MapContainer>
                        <Icon
                            source={require('../../assets/icons/pinMap.png')}
                        />
                        <Title>Rua Gen. Arcy da Rocha Nob. 667</Title>
                    </MapContainer>
                </BorderlessButton>

                <BorderlessButton>
                    <Icon source={require('../../assets/icons/basket.png')} />
                </BorderlessButton>
            </ButtonContainer>
        </Container>
    );
}
