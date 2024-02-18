import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import { router } from 'expo-router';
import i18n from '../i18n';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function DoneMenu({ onDelete }) {

    const goback = () => {
        router.back()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goback}>
                <Text style={styles.donetitle}>{i18n.t('back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.donetitle}>{onDelete ? <Ionicons name='trash-outline' size={32} color={"white"}/> : ""}</Text>
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
    },
    donetitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }
})
