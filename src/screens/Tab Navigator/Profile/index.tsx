import React from 'react'
import { Button, Text, View } from 'react-native'

export function Profile({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'cyan' }}>
            <Text style={{ fontSize: 36 }}>Configurações</Text>
        </View>
    )
}
