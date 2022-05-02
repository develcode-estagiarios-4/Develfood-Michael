import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Profile } from '../screens/Tab Navigator/Profile';
import RNBootSplash from 'react-native-bootsplash';
import { TabBarIcon } from '../components/TabBarIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { Animated, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeConsumer } from 'styled-components/native';
import theme from '../styles/theme';

export function AppRoutes() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    const home = useRef(new Animated.Value(0)).current;
    const favorites = useRef(new Animated.Value(0)).current;
    const historic = useRef(new Animated.Value(0)).current;
    const profile = useRef(new Animated.Value(0)).current;

    const handleHomeAnimationOn = () => {
        Animated.timing(home, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleHomeAnimationOff = () => {
        Animated.timing(home, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleFavoritesAnimationOn = () => {
        Animated.timing(favorites, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleFavoritesAnimationOff = () => {
        Animated.timing(favorites, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleHistoricAnimationOn = () => {
        Animated.timing(historic, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleHistoricAnimationOff = () => {
        Animated.timing(historic, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleProfileAnimationOn = () => {
        Animated.timing(profile, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const handleProfileAnimationOff = () => {
        Animated.timing(profile, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: RFValue(60),
                    borderRadius: 20,
                    paddingBottom: 10,
                    padding: 10,
                },
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarLabelStyle: { fontSize: RFValue(12), fontFamily: 'Inter-Regular' },  
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Home'),
                                        handleFavoritesAnimationOff(),
                                        handleHistoricAnimationOff(),
                                        handleProfileAnimationOff(),
                                        handleHomeAnimationOn();
                                }}
                            >
                                <LottieView
                                    style={{
                                        height: RFValue(80),
                                        width: RFValue(80),
                                    }}
                                    source={require('../assets/icons/65033-home.json')}
                                    progress={home}
                                />
                            </Pressable>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Favorites'),
                                        handleHomeAnimationOff(),
                                        handleHistoricAnimationOff(),
                                        handleProfileAnimationOff(),
                                        handleFavoritesAnimationOn();
                                }}
                            >
                                <LottieView
                                    style={{
                                        height: RFValue(140),
                                        width: RFValue(140),
                                    }}
                                    source={require('../assets/icons/99800-heart-fav.json')}
                                    progress={favorites}
                                />
                                <Image
                                    source={require('../assets/icons/love.png')}
                                    style={{
                                        position: 'absolute',
                                        top: RFValue(52),
                                        left: RFValue(53),
                                        width: RFValue(36),
                                        height: RFValue(36),
                                        zIndex: -1,
                                        resizeMode: 'contain',
                                        tintColor: '#999',
                                    }}
                                />
                            </Pressable>
                        );
                    },
                    tabBarLabel: 'Favoritos',
                }}
            />
            <Tab.Screen
                name="Historic"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Historic'),
                                        handleFavoritesAnimationOff(),
                                        handleHomeAnimationOff(),
                                        handleProfileAnimationOff(),
                                        handleHistoricAnimationOn();
                                }}
                            >
                                <LottieView
                                    style={{
                                        height: RFValue(70),
                                        width: RFValue(70),
                                        marginBottom: RFValue(2),
                                    }}
                                    source={require('../assets/icons/65034-label.json')}
                                    progress={historic}
                                />
                            </Pressable>
                        );
                    },
                    tabBarLabel: 'Histórico',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Profile'),
                                        handleFavoritesAnimationOff(),
                                        handleHistoricAnimationOff(),
                                        handleHomeAnimationOff(),
                                        handleProfileAnimationOn();
                                }}
                            >
                                <LottieView
                                    style={{
                                        height: RFValue(70),
                                        width: RFValue(70),
                                        marginTop: RFValue(1),
                                    }}
                                    source={require('../assets/icons/65035-profile.json')}
                                    progress={profile}
                                />
                            </Pressable>
                        );
                    },
                    tabBarBadge: 2,
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}
