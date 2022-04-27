import React from 'react'
import { Button, Text, View } from 'react-native'

export function Favorites({ navigation }: any) {
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: 'blue' }}>
            <Text style={{ fontSize: 36 }}>Favoritos</Text>
        </View>
    )
}