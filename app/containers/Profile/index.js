import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
var pjson = require('../../../package.json');
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import FlashMessage from "react-native-flash-message";
import { useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";

import { saveUserInforSelector } from '../../redux/selector';
import i18n from '../../i18n';
import Language from '../Login/language';
import { colorWrong } from '../../contants/style';
import { deleteUser, logOut } from '../../api';
import StatusBarComponent from '../../components/StatusBar';
import GobackMenu from '../../components/gobackMenu';

export default function Profile() {
    const flashmessage = useRef()
    const userInfor = useSelector(saveUserInforSelector)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        await logOut()
        let lang = await AsyncStorage.getItem('languagecode');
        let hasopen = await AsyncStorage.getItem('hasopen');
        AsyncStorage.clear()
        if (lang) {
            await AsyncStorage.setItem("languagecode", lang)
        }
        if(hasopen){
            await AsyncStorage.setItem("hasopen", hasopen)
        }
        // SecureStore.deleteItemAsync("logindata")
        // SecureStore.deleteItemAsync("token")
        router.replace({ pathname: "containers/Login", params: { logout: true } })
    }

    const preferences = () => {
        router.push('containers/Preferences')
    }

    const deleteAccountAsk = () => {
        setIsVisibleModal(true)
    }

    const deleteAccountNow = async () => {
        setIsVisibleModal(false)
        setLoading(true)
        let res = await deleteUser()
        if(res.success){
            logout()
        }
    }

    const showmessage = () => {
        flashmessage.current.showMessage({
            message: i18n.t('changelanguage'),
            type: "success",
        });
    }

    const closeModal = () => {
        setIsVisibleModal(false)
    }

    return (
        <>
            <StatusBarComponent />
            <GobackMenu screenname="settings"/>
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.textinfo}>{userInfor.first_name}</Text>
                    <Text style={styles.subtextinfo}>{userInfor.email}</Text>
                </View>

                <TouchableOpacity style={styles.buttonadd} onPress={preferences}>
                    <Text style={styles.buttontext}>{i18n.t('option')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonadd} onPress={logout}>
                    <Text style={styles.buttontext}>{i18n.t('logout')}</Text>
                </TouchableOpacity>

                <View style={styles.langview}>
                    <Language showmessage={showmessage} />
                </View>
                <Text style={styles.subtextinfo}>{i18n.t('version')}: {pjson.version}</Text>

                <TouchableOpacity onPress={deleteAccountAsk}>
                    <Text style={styles.subtextinfoDelete}>{i18n.t('delete_account')}</Text>
                </TouchableOpacity>

                <FlashMessage
                    ref={flashmessage}
                    floating={true}
                    position="bottom"
                    icon="success"
                />
                <Modal isVisible={isVisibleModal}>
                    <View style={styles.modal}>
                        <Text style={styles.titleModal}>{i18n.t('confirm_delete_account')}</Text>
                        <Text style={styles.subtitleModal}>{i18n.t('take_a_while')}</Text>
                        
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity
                                style={[styles.buttonModal, { backgroundColor: "grey" }]}
                                onPress={closeModal}
                            >
                                <Text style={styles.buttonTextModal}>{i18n.t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonModal, { backgroundColor: colorWrong, marginLeft: 20 }]}
                                onPress={deleteAccountNow}
                            >
                                <Text style={styles.buttonTextModal}>{i18n.t('delete')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            {loading ? (
                <>
                    <View style={styles.loading}>
                    </View>
                    <LottieView
                        autoPlay={true}
                        style={{
                            width: scale(200),
                            position: "absolute",
                            zIndex: 10,
                            alignSelf: "center",
                            height: "100%",
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../../../assets/lottie/loading.json')}
                    />
                </>
            ): null}
        </>
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
    subtextinfoDelete: {
        marginTop: 10,
        color: "red"
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
    },
    titleModal: {
        fontSize: scale(16),
        marginBottom: 5
    },
    subtitleModal: {
        fontSize: scale(12),
        marginBottom: 20,
        color: "grey"
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingVertical: 30,
        alignItems: "center"
    },
    buttonModal: {
        padding: 10,
        paddingVertical: 15,
        borderRadius: 5,
        width: "40%",
        alignItems: "center"
    },
    buttonTextModal: {
        fontSize: scale(14),
        color: "white"
    },
    loading: {
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        opacity: 0.5,
        zIndex: 5
    }
})
