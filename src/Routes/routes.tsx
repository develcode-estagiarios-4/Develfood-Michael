import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/TabNavigator/Home';
import { Favorites } from '@screens/TabNavigator/Favorites';
import { TabBar } from '@components/TabBar';
import { Profile } from '@screens/TabNavigator/Profile';
import { Historic } from '@screens/TabNavigator/Historic';

export function TabScreenRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator();

    return (
        <>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name="Inicio"
                    component={Home}
                />
                <Screen
                    name="Favoritos"
                    component={Favorites}
                />
                <Screen
                    name="Historico"
                    component={Historic}
                />
                <Screen
                    name="Perfil"
                    component={Profile}
                />
            </Navigator>
            <TabBar />
        </>
    );
}
