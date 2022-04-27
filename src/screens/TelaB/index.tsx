import React from 'react'
import { Button, Text, View } from 'react-native'

export function TelaB({ navigation }: any) {
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'blue' }}>
            <Text style={{ fontSize: 36 }}>Tela B</Text>
            <Button title='Ir para tela A' onPress={() => navigation.navigate('Tela A')} />
        </View>
    )
}