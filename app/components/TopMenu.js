import { View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function TopMenu() {

    const onPressProfile = () => {
        router.push('containers/Profile')
    }

    return (
        <View style={styles.container}>
            <Text></Text>
            <TouchableOpacity onPress={onPressProfile}>
                <Image source={require('../../assets/icon.png')} style={styles.icon} />
            </TouchableOpacity>
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
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50
    }
})
