import { Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';
import FlashMessage from "react-native-flash-message";
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';

import StatusBarComponent from '../../components/StatusBar'
import DoneMenu from '../../components/DoneMenu';
import i18n from '../../i18n';
import { inputbackgroundcolor, themeColor2, tabbarcolor, colorWrong } from '../../contants/style';
import checkSpecialCharacter from '../../utils/checkSpecialCharacter';
import { updateWord, getWord, deleteWord } from '../../api';
import { updateListWordAction } from '../../redux/action';

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;

const textColor = "#5e5e5e"

export default function AddWord() {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [remindSentence, setRemindSentence] = useState("")
    const { word_name } = useLocalSearchParams();
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const flashmessage = useRef()
    const dispatch = useDispatch()
    
    const saveWord = async () => {
        if(!word || !definition){
            flashmessage.current.showMessage({
                message: i18n.t('word_definition_cannot_blank'),
                type: "danger",
            });
            return
        }
        if(checkSpecialCharacter(word) || checkSpecialCharacter(definition)){
            flashmessage.current.showMessage({
                message: i18n.t('word_have_special_character'),
                type: "danger",
            });
            return
        }

        let result = await updateWord({
            wordName: word_name || "",
            word,
            definition,
            remindSentence
        })
        if(result.data.success == 2){ // trùng
            flashmessage.current.showMessage({
                message: i18n.t('word_exist'),
                type: "danger",
            });
        }
        if(result.data.success == 1){ // Thành công
            dispatch(updateListWordAction(Math.floor(Math.random()*90000) + 10000))
            if(!word_name){
                setWord("")
                setDefinition("")
                setRemindSentence("")
            }
            flashmessage.current.showMessage({
                message: i18n.t('save_word'),
                type: "success",
            });
        }
        // router.back()
    }

    const getCurrentWord = async () => {
        let currentWord = await getWord({ wordName: word_name})
        setWord(currentWord.data.word)
        setDefinition(currentWord.data.definition)
        setRemindSentence(currentWord.data.remind_sentence)
    }

    const confirmDelete = () => {
        setIsVisibleModal(true)
    }

    const deleteWordNow = async () => {
        setLoading(true)
        await deleteWord({ wordName: word_name })
        dispatch(updateListWordAction(Math.floor(Math.random()*90000) + 10000))
        router.back()
    }

    const closeModal = () => {
        setIsVisibleModal(false)
    }

    useEffect(() => {
        if(word_name){
            getCurrentWord()
        }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBarComponent />
            <DoneMenu 
                onDelete={word_name ? confirmDelete : false}
            />
            <View style={styles.topView}>
                <Image source={require('../../../assets/images/writebook.png')} style={styles.image}/>
                <Text style={styles.textdes}>{i18n.t('guildaddword')}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWord}
                    value={word}
                    placeholder={`${i18n.t('words')}(${i18n.t('require')})`}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDefinition}
                    value={definition}
                    placeholder={`${i18n.t('definition')}(${i18n.t('require')})`}
                />
                <TextInput
                    style={styles.inpputMultiple}
                    onChangeText={setRemindSentence}
                    multiline={true}
                    numberOfLines={10}
                    value={remindSentence}
                    placeholder={i18n.t('sentence')}
                />
                <FlashMessage 
                    ref={flashmessage} 
                    floating={true}
                    position="bottom"
                    icon="success"
                    style={{
                        bottom: scale(70)
                    }}
                />
                <TouchableOpacity style={styles.buttonadd} onPress={saveWord}>
                    <Text style={styles.buttontext}>{i18n.t('save')}</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isVisibleModal}>
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
                                height: "100%"
                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../../../assets/lottie/loading.json')}
                        />
                    </>
                ): (
                    <View style={styles.modal}>
                        
                        <Text style={styles.titleModal}>{i18n.t('confirm_delete_word')}</Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <TouchableOpacity 
                                style={[styles.buttonModal, { backgroundColor: "grey" }]} 
                                onPress={closeModal}
                            >
                                <Text style={styles.buttonText}>{i18n.t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.buttonModal, { backgroundColor: colorWrong, marginLeft: 20}]}
                                onPress={deleteWordNow}
                            >
                                <Text style={styles.buttonText}>{i18n.t('delete')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                
            </Modal>

        </View>
      );
}

const styles = StyleSheet.create({
    inpputMultiple: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10,
        textAlignVertical: 'top',
        height: scale(100)
    },
    input: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        marginTop: 20,
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10
    },
    textdes: {
        fontSize: scale(16),
        textAlign: "center",
        width: "70%",
        marginTop: 20,
        color: textColor
    },
    topView: {
        paddingHorizontal: 10,
        paddingTop: 50,
        alignItems:"center",
        height: windowHeight - statusBarHeight - 50,
    },
    image: {
        width: scale(100),
        height: scale(100),
    },
    buttonadd: {
        backgroundColor: tabbarcolor,
        width: "100%",
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        bottom: scale(50)
    },
    buttontext: {
        color: "white",
        fontSize: scale(16),
        fontWeight: "bold"
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
    buttonText: {
        fontSize: scale(14),
        color: "white"
    },
    titleModal: {
        fontSize: scale(16),
        marginBottom: 20
    }
})