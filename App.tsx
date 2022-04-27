import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelaA } from './src/screens/TelaA';
import { TelaB } from './src/screens/TelaB';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela A" component={TelaA} />
        <Stack.Screen name="Tela B" component={TelaB} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

