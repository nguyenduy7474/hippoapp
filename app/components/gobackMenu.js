import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { scale } from 'react-native-size-matters';
import i18n from '../i18n';

export default function GobackMenu({ signed = true, screenname }) {

    const goBack = () => {
        router.back()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={{ marginLeft: 10, padding: 10, paddingLeft: 0, width: scale(30), zIndex: 2 }}>
                <Image source={require('../../assets/images/back.png')} style={{ width: scale(25), height: scale(25)}}/>
            </TouchableOpacity>
            <View style={styles.viewtitle}>
                <Text style={styles.title}>{i18n.t(screenname)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        fontSize: scale(16),
        color: "white",
        fontWeight: "bold"
    }
})
