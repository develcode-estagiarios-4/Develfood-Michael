import { RFValue } from "react-native-responsive-fontsize";

export default {
    colors: {
        background: '#FFFFFF',
        background_red: '#C20C18',

        header: '#C20C18',
        button: '#C20C18',
        card: '#F0F0F5',
        input: '#BFBABA',

        text_white: '#FFFFFF',
        text_gray: '#BFBABA',
        text_dark: '#2B2B2E',
        text_purple: '#68484A',
        text_red: '#C20C18',

        icon_gray: '#BFBABA',
        icon_white: '#FFFFFF',
        icon_red: '#C20C18',
        icon_dark: '#2B2B2E',
    },

    fonts: {
        primaryReg: 'Inter-Regular',
        primaryMed: 'Inter-Medium',

        secondaryReg: 'Archivo-Regular',
        secondaryMed: 'Archivo-Medium',
        secondaryBold: 'Archivo-Bold',
    },

    sizes: {
        small: RFValue(12),
        intermediate: RFValue(13),
        medium: RFValue(14),
        large: RFValue(16),
        extraLarge: RFValue(20),
        hiperMegaExtraLarge: RFValue(24)
    },

    icons: {
        home: require('@assets/icons/home.png'),
        favorites: require('@assets/icons/heart.png'),
        historic: require('@assets/icons/historic.png'),
        profile: require('@assets/icons/profile.png'),
    },
};
