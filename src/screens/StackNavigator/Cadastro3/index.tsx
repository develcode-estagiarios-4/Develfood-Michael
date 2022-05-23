import React, { useRef, useState } from 'react';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Container, StepsDoneImage, Wrapper } from './styles';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { cpf as cpfvalidator } from 'cpf-cnpj-validator';
import { MaskedInput } from '@components/MaskedInput';

export function Cadastro3({ navigation }: any) {

    const schema = yup.object().shape({
        apelidoEndereco: yup
            .string()
            .min(3, 'O mínimo de caracteres é 3')
            .required('Campo obrigatório'),
        cep: yup
            .string()
            .min(3, 'O mínimo de caracteres é 3')
            .notOneOf(
                [yup.ref('nome')],
                'Nome e sobrenome não podem ser iguais'
            )
            .required('Campo obrigatório'),
        cpf: yup
            .string()
            .test('is-cpf', 'aaaaaa', (value: any) =>
                cpfvalidator.isValid(value)
            ),
        telefone: yup.string().required('Campo obrigatório'),
    });

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function handleContinue() {
        let nome = getValues('nome');
        let sobrenome = getValues('sobrenome');
        let cpf: string = getValues('cpf');
        let telefone = getValues('telefone');

        console.log(
            `nome: ${nome}, sobrenome: ${sobrenome}, cpf: ${cpf}, telefone: ${telefone}`
        );
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header
                    source={require('@assets/icons/back-arrow.png')}
                    onPress={() => {
                        navigation.pop();
                    }}
                />
                <StepsDoneImage
                    source={require('@assets/icons/CadastroConcluido1.png')}
                />
                <Wrapper>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'nome'}
                                control={control}
                                error={errors.nome && errors.nome.message}
                                source={require('@assets/icons/pessoa.png')}
                                placeholder={'Nome'}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name={'nome'}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'sobrenome'}
                                control={control}
                                error={
                                    errors.sobrenome && errors.sobrenome.message
                                }
                                source={require('@assets/icons/pessoa.png')}
                                placeholder={'Sobrenome'}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name={'sobrenome'}
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                name={'cpf'}
                                control={control}
                                error={errors.cpf && errors.cpf.message}
                                source={require('@assets/icons/credencial.png')}
                                placeholder={'CPF'}
                                keyboardType="numeric"
                                value={cpfvalidator.format(value)}
                                onChangeText={onChange}
                                onEndEditing={() => clearErrors('cpf')}
                                maxLength={14}
                            />
                        )}
                        name={'cpf'}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <MaskedInput
                                name={'telefone'}
                                type={'cel-phone'}
                                control={control}
                                error={
                                    errors.telefone && errors.telefone.message
                                }
                                source={require('@assets/icons/telefone.png')}
                                placeholder={'Telefone'}
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                        name={'telefone'}
                    />

                    <Button
                        title="Continuar"
                        onPress={handleSubmit(handleContinue)}
                    />
                </Wrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
}
