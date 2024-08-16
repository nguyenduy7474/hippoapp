import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Button, Linking } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { scale } from 'react-native-size-matters';
import i18n from '../i18n';
import { isTablet } from 'react-native-device-info';

export default function GobackMenu({ signed = true, screenname }) {

    const goBack = () => {
        router.back()
    }

    const openZaloGroup = () => {        
        Linking.openURL("https://zalo.me/g/uurivd642")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.buttonHeader}>
                <Image source={require('../../assets/images/back.png')} style={{ width: isTablet() ? scale(18) : scale(25), height: isTablet() ? scale(18) : scale(25)}}/>
            </TouchableOpacity>
            <View style={styles.viewtitle}>
                <Text style={styles.title}>{i18n.t(screenname)}</Text>
            </View>
            <TouchableOpacity onPress={openZaloGroup} style={{ marginRight: 10, backgroundColor: "white", borderRadius: 10, zIndex: 2 }}>
                <Image source={require('../../assets/images/zalo_icon.png')} style={{ width: isTablet() ? scale(16) : scale(24), height: isTablet() ? scale(16) : scale(24)}}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonHeader: {
        marginLeft: 10, 
        padding: 10, 
        paddingLeft: 0, 
        width: scale(30), 
        zIndex: 2
    },
    container: {
        height: 50,
        width: "100%",
        backgroundColor: tabbarcolor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    viewtitle: {
        position: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        zIndex: 1
    },
    title: {
        fontSize: isTablet() ? scale(14) : scale(16),
        color: "white",
        fontWeight: "bold"
    }
})
