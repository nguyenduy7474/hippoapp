import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
var pjson = require('../../../package.json');
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import i18n from '../../i18n';
import Language from '../Login/language';

export default function Profile() {
    const logout = () => {
        SecureStore.deleteItemAsync("logindata")
        SecureStore.deleteItemAsync("email")
        router.replace({pathname: "containers/Login", params: { logout: true }})
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.textinfo}>Duy Nguyen</Text>
                <Text style={styles.subtextinfo}>nguyenduy7474@gmail.com</Text>
            </View>
{/*             <TouchableOpacity style={styles.buttonadd}>
                <Text style={styles.buttontext}>{i18n.t('preferences')}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonadd} onPress={logout}>
                <Text style={styles.buttontext}>{i18n.t('logout')}</Text>
            </TouchableOpacity>
            <View style={styles.langview}>
                <Language />
            </View>
            <Text style={styles.subtextinfo}>{i18n.t('version')}: {pjson.version}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    info: {
        marginTop: 10
    },
    textinfo: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subtextinfo: {
        marginTop: 10
    },
    buttonadd: {
        backgroundColor: "#e0e0e0",
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttontext: {
        color: "#787878",
        fontSize: 18,
        fontWeight: "bold"
    },
    langview: {
        width: "100%",
        marginTop: 10
    }
})
