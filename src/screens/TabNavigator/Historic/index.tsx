import React, { useContext } from 'react'
import { Text } from 'react-native'
import { AuthContext } from '@context/auth';
import { Container } from './styles'
import { useFetch } from '@services/useFetch';

export function Historic({ navigation }: any) {

    const {userId, token} = useContext(AuthContext);

    const { data, fetchData } = useFetch(
        `/request/costumer?id=${userId}&page=0&quantity=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return (
        <Container>
            <Text style={{ fontSize: 36 }}>Histórico</Text>

        </Container>
    )
}
