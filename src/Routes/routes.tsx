import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Settings } from '../screens/Tab Navigator/Settings';
import RNBootSplash from 'react-native-bootsplash';
import { Image } from 'react-native';
import { Icon } from '../components/TabBarIcons/styles';
import { TabBarIcon } from '../components/TabBarIcons';

export function AppRoutes() {
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 3000);
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: 60,
                    borderRadius: 15,
                    paddingBottom: 10,
                    padding: 10
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image
                                source={require('../assets/icons/home.png')}
                                style={{ width: 20, height: 20, tintColor: "red", resizeMode: 'contain' }}
                            />
                        ) : (
                            <Image
                                source={require('../assets/icons/home.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        );
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarLabel: 'Início',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image
                                source={require('../assets/icons/heart.png')}
            
                                style={{ width: 20, height: 20, tintColor: "red", resizeMode: 'contain' }}
                            />
                        ) : (
                            <Image
                                source={require('../assets/icons/heart.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        );
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarLabel: 'Favoritos',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <TabBarIcon focused={focused} name={'history'}/>
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarLabel: 'Histórico',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return focused ? (
                            <Image
                                source={require('../assets/icons/profile.png')}
                                
                                style={{ width: 20, height: 20, tintColor: "red", resizeMode: 'contain' }}
                            />
                        ) : (
                            <Image
                                source={require('../assets/icons/profile.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        );
                    },
                    tabBarActiveTintColor: 'red',
                    tabBarBadge: 2,
                    tabBarLabel: 'Perfil',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
        </Tab.Navigator>
    );
}
