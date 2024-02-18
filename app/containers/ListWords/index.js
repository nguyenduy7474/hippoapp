import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SplashScreen } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu'
import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import ListWordsComponent from './listWords';
import Search from './search';
import i18n from '../../i18n';
import { checkNewVersion } from '../../utils/checkversion';


const TopComponent = ({ onChangeText, signed}) => {

    const addNewWord = () => {
        if(signed){
            router.push("containers/AddWord")
        }else{
            router.replace('/containers/Login');
        }
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
        setTimeout(async () => {
            let hasopen = await AsyncStorage.getItem("hasopen") 
            if(!hasopen){
                router.replace("/containers/Onboard")
            }
        }, 200)
        checkNewVersion().then((needsUpdate) => {
            // setModalVisible(true)
            if (needsUpdate) {
                setModalVisible(true)
            }
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
