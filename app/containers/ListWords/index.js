import { Text, View, StyleSheet, TouchableOpacity, Modal, Linking, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SplashScreen } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { addEventListener } from "@react-native-community/netinfo";

import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu'
import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import ListWordsComponent from './listWords';
import Search from './search';
import i18n from '../../i18n';
import { checkNewVersion, getStoreUrl } from '../../utils/checkversion';
import { checkVersionUpdate } from '../../api';
import { scale } from 'react-native-size-matters';
import { isTablet } from 'react-native-device-info';
import syncWordData from '../../utils/syncdata';

const TopComponent = ({ onChangeText, signed, orderType, changeOrderType }) => {

    const addNewWord = async () => {
        router.push("containers/AddWord")
    }

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity style={styles.buttonadd} onPress={addNewWord}>
                <Ionicons name='add-circle-outline' size={32} color={"white"} />
                <Text style={styles.buttontext}>{i18n.t('newword')}</Text>
            </TouchableOpacity>
            <Search onChangeText={onChangeText} />
            <View style={styles.orderView}>
                <Text></Text>
                <TouchableOpacity
                    onPress={changeOrderType}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <AntDesign name={orderType.icon} size={16} color="black" />
                    <Text style={styles.orderText}>{orderType.text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ModalUpdate = ({ modalVisible }) => {
    const toStore = () => {
        getStoreUrl().then((url) => {
            Linking.openURL(url)
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
            </View>
            <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{i18n.t('need_update')}</Text>
                    <TouchableOpacity style={styles.updatebutton} onPress={toStore}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>{i18n.t('update_button')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}

export default function ListWords({ signed = true }) {
    const [searchtext, setSearchtext] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [totalWord, setTotalWord] = useState(0)
    const [syncLoading, setSyncLoading] = useState(0) //0: không sync, 1: đang sync, 2: đã sync
    const [orderType, setOrderType] = useState({
        "text": i18n.t('newest'),
        "icon": "arrowup"
    })

    const changeOrderType = () => {
        if (orderType.icon == "arrowup") {
            setOrderType({
                "text": i18n.t('oldest'),
                "icon": "arrowdown"
            })
        } else {
            setOrderType({
                "text": i18n.t('newest'),
                "icon": "arrowup"
            })
        }
    }

    const onChangeText = (data) => {
        setSearchtext(data)
    }

    useEffect(() => {
        if(syncLoading == 1){
            syncWordData(true).then(() => {
                setSyncLoading(2)
            })
        }
    }, [syncLoading])

    useEffect(() => {
        SplashScreen.hideAsync();
        checkNewVersion().then((needsUpdate) => {
            if (needsUpdate) {
                setModalVisible(true)
                return
            }
            checkVersionUpdate().then((data) => {
                if (typeof data == "object" && !data.updateversion) {
                    router.replace("/containers/NewVersion")
                }

            })
        })
        const unsubscribe = addEventListener(async (state) => {
            if (state.isConnected) {
                setSyncLoading(1)
            } else {
                setSyncLoading(0)
            }
        });
        return () => unsubscribe();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBarComponent />
            <TopMenu 
                signed={signed} 
                leftdata={totalWord} 
                syncLoading={syncLoading}
            />
            <TopComponent onChangeText={onChangeText} signed={signed} orderType={orderType} changeOrderType={changeOrderType} />
            {signed ? (
                <ListWordsComponent 
                    searchtext={searchtext} 
                    orderType={orderType} 
                    setTotalWord={setTotalWord} 
                    syncLoading={syncLoading}
                />
            ) : null}

            <ModalUpdate modalVisible={modalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    orderText: {
        fontSize: isTablet() ? scale(10) : scale(14),
    },
    orderView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: scale(5)
    },
    updatebutton: {
        backgroundColor: tabbarcolor,
        padding: 15,
        borderRadius: 10,
        marginTop: 25
    },
    buttonadd: {
        backgroundColor: meaningbackground,
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        paddingVertical: isTablet() ? 30 : 18,
        alignSelf: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

    },
    buttontext: {
        color: "white",
        fontSize: isTablet() ? 30 : 20,
        fontWeight: "bold"
    },
    centeredView: {
        position: "absolute",
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        zIndex: 3,
        opacity: 0.5
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
    }
})
