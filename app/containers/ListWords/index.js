import { Text, View, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SplashScreen } from 'expo-router';

import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu'
import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import ListWordsComponent from './listWords';
import Search from './search';
import i18n from '../../i18n';
import { checkNewVersion, getStoreUrl } from '../../utils/checkversion';
import { checkVersionUpdate } from '../../api';


const TopComponent = ({ onChangeText, signed}) => {

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

    const onChangeText = (data) => {
        setSearchtext(data)
    }

    useEffect(() => {
        SplashScreen.hideAsync();

        checkNewVersion().then((needsUpdate) => {
            // setModalVisible(true)
            if (needsUpdate) {
                setModalVisible(true)
                return
            }
            checkVersionUpdate().then((data) => {
                console.info("🚀 ~ file: index.js:80 ~ checkVersionUpdate ~ data:", data)
                if(typeof data == "object" && !data.updateversion){
                    router.replace("/containers/NewVersion")
                }

            })
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBarComponent />
            <TopMenu signed={signed}/>
            <TopComponent onChangeText={onChangeText} signed={signed}/>
            {signed ? (
                <ListWordsComponent searchtext={searchtext} />
            ): null}
            
            <ModalUpdate modalVisible={modalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
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
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttontext: {
        color: "white",
        fontSize: 20,
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
