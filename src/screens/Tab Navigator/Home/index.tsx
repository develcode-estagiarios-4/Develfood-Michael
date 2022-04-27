import React from 'react';
import { Container, Title } from './styles';
import api from '../../../services/api';

export function Home({ navigation }: any) {
    api.get('/users/Michael-Junges-Develcode/repos').then((response) => { console.log(response.data) });

    return (
        <Container>
            <Title>Início</Title>
        </Container>
    );
}
