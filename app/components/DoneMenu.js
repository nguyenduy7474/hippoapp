import { View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { themeColor } from '../contants/style';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import i18n from '../i18n';

export default function DoneMenu() {

    const goback = () => {
        router.back()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goback}>
                <Text style={styles.donetitle}>{i18n.t('back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goback}>
                <Text style={styles.donetitle}>{i18n.t('save')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: themeColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    donetitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }
})
