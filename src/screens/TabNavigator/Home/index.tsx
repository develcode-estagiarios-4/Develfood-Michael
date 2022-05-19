import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from '@services/useFetch';
import { Container, HeaderView, ScrollView, Title } from './styles';
import { ActivityIndicator, Button } from 'react-native';
import { usePost } from '@services/usePost';
import { useDelete } from '@services/useDelete';
import { usePut } from '@services/usePut';
import { HeaderHome } from '@components/Header';
import { AuthContext } from '../../../context/auth';

export function Home({ navigation }: any) {
    const { data, loading, error } = useFetch('/95040500/json/');

    const { logIn, token } = useContext(AuthContext);

    return (
        <Container>
            <HeaderHome />
            {loading ? (
                <ActivityIndicator
                    style={{ flex: 1 }}
                    size={'large'}
                />
            ) : (
                <ScrollView>
                    <Title>get</Title>
                    <Title>
                        {data.logradouro} {'\n'} {'\n'} {data.bairro} {'\n'}{' '}
                        {'\n'}
                        {data.localidade}
                    </Title>

                    <Title>post</Title>
                    <Button
                        title="criar usuario"
                        onPress={() => {
                            usePost(
                                '/public/v2/users',
                                {
                                    email: 'irineu@gmail.com',
                                    gender: 'male',
                                    name: 'xablau',
                                    status: 'active',
                                },
                                {
                                    headers: {
                                        Authorization:
                                            'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                                    },
                                }
                            );
                        }}
                    />
                    <Title>delete</Title>
                    <Button
                        title="deletar usuario"
                        onPress={() => {
                            useDelete('/public/v2/users/11706', {
                                headers: {
                                    Authorization:
                                        'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                                },
                            });
                        }}
                    />
                    <Title>put</Title>
                    <Button
                        title="atualizar usuario"
                        onPress={() => {
                            usePut(
                                '/public/v2/users/11706',
                                {},

                                {
                                    headers: {
                                        Authorization:
                                            'Bearer daf3a258b8841c825fae207d9a61a5f5d69bcdaac7086cb868b59da6efc9f25f',
                                    },
                                }
                            );
                        }}
                    />
                </ScrollView>
            )}
        </Container>
    );
}
