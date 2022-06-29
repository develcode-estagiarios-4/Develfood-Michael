import { Header } from '@components/Header';
import React from 'react';
import {
    Container,
    OkButton,
    StepsDoneImage,
    Subtitle,
    Title,
    TitleWrapper,
    Wrapper,
} from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '@styles/theme';

export function SignUpSuccess() {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            containerStyle={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <Header
                color={theme.colors.headerSecondary}
                source={require('@assets/icons/x.png')}
                onPress={() =>
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                }
                title={'Cadastro'}
            />
            <Container>
                <StepsDoneImage
                    source={require('@assets/icons/CadastroFinalizado.png')}
                />

                <TitleWrapper>
                    <Title>Cadastro</Title>
                    <Title>finalizado!</Title>
                </TitleWrapper>

                <Wrapper>
                    <Subtitle>
                        Parabéns! Agora você pode aproveitar nossas ofertas e
                        serviços e economizar com super cupons Develfood.
                    </Subtitle>
                </Wrapper>
                <OkButton
                    title="Concluir"
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    }
                />
            </Container>
        </TouchableWithoutFeedback>
    );
}
