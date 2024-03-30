import {
    Platform,
    StyleSheet,
    Text, 
    TextInput, 
    View, 
    TouchableOpacity, 
    Dimensions, 
    KeyboardAvoidingView, 
    ScrollView,
    PixelRatio, 
    Switch
} from 'react-native';
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';
import FlashMessage from "react-native-flash-message";
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import CountryPicker from 'react-native-country-picker-modal'
import CountryFlag from "react-native-country-flag";
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';


import StatusBarComponent from '../../components/StatusBar'
import DoneMenu from '../../components/DoneMenu';
import i18n from '../../i18n';
import { inputbackgroundcolor, themeColor2, tabbarcolor, colorWrong } from '../../contants/style';
import checkSpecialCharacter from '../../utils/checkSpecialCharacter';
import { updateWord, getWord, deleteWord, translateWord } from '../../api';
import { updateListWordAction } from '../../redux/action';
import languagejson from '../../contants/language.json'
import updateListWordType from '../../utils/updatelistwordtype';
import DeleteWordModal from './modaldeleteword';
import TransalteWordModal from './translatewordmodal';
import { loadLanguageCode } from '../../utils/loadlanguagecode';

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;

const textColor = "#5e5e5e"

var transalteWordTimeout

export default function AddWord() {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [remindSentence, setRemindSentence] = useState("")
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [languageCode, setLanguageCode] = useState(null)
    const [countryCode, setCountryCode] = useState("")
    const [wordtypedata, setWordTypeData] = useState([])
    const [wordtype, setWordType] = useState("")
    const [loadingTranslateWord, setLoadingTranslateWord] = useState(false)
    const [isVisibleModalTranslate, setIsVisibleModalTranslate] = useState(false)
    const [dataTranslate, setDataTranslate] = useState({})
    const [srCountryCode, setSrCountryCode] = useState("")

    const { word_name } = useLocalSearchParams();
    const flashmessage = useRef()
    const dispatch = useDispatch()
    const listWordType = ["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection", "Determiners"]

    const saveWord = async () => {
        if (!word || !definition) {
            flashmessage.current.showMessage({
                message: i18n.t('word_definition_cannot_blank'),
                type: "danger",
            });
            return
        }
        if (checkSpecialCharacter(word) || checkSpecialCharacter(definition)) {
            flashmessage.current.showMessage({
                message: i18n.t('word_have_special_character'),
                type: "danger",
            });
            return
        }

        let result = await updateWord({
            wordName: word_name || "",
            languagecode: languageCode,
            wordtype,
            word,
            definition,
            remindSentence
        })
        if (result.data.success == 2) { // trùng
            flashmessage.current.showMessage({
                message: i18n.t('word_exist'),
                type: "danger",
            });
        }
        if (result.data.success == 1) { // Thành công
            dispatch(updateListWordAction(Math.floor(Math.random() * 90000) + 10000))
            if (!word_name) {
                setWordType("")
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
        let currentWord = await getWord({ wordName: word_name })
        setWord(currentWord.word)
        setDefinition(currentWord.definition)
        setRemindSentence(currentWord.remind_sentence)
        
        setLoadingTranslateWord(true)
        let sourceCountrycode = await AsyncStorage.getItem("sourcecountrycode")
        setSrCountryCode(sourceCountrycode)
        
        if(currentWord.word_language){
            await loadWordtype(currentWord.word_language)
            setLanguageCode(currentWord.word_language)
            let dataLanguage = languagejson.filter(item => item.code == currentWord.word_language)
            setCountryCode(dataLanguage[0].countrycode)
            let data = await translateWord(currentWord.word.toLowerCase(), currentWord.word_language)
            setDataTranslate(data)
        }

        setWordType(currentWord.word_type)
        setLoadingTranslateWord(false)
    }

    const confirmDelete = () => {
        setIsVisibleModal(true)
    }

    const deleteWordNow = async () => {
        setLoading(true)
        await deleteWord({ wordName: word_name })
        dispatch(updateListWordAction(Math.floor(Math.random() * 90000) + 10000))
        router.back()
    }

    const closeModal = () => {
        setIsVisibleModal(false)
    }

    const updateTargetLanguage = async (item) => {
        setLanguageCode(item.code)
        setCountryCode(item.countrycode)

        // await updateListWordType(item.code)
        loadWordtype(item.code)
        typeWord(word, item.code)
    }

    const loadLanguage = async () => {
        let tgLanguageCode = await AsyncStorage.getItem("targetLanguagecode")
        let tgCountryCode = await AsyncStorage.getItem("targetcountrycode")
        if(!tgLanguageCode || !tgCountryCode){
            let data = await loadLanguageCode()
            tgLanguageCode = data.tgLanguageCode
            tgCountryCode = data.tgCountryCode
        }
        let sourceCountrycode = await AsyncStorage.getItem("sourcecountrycode")

        setSrCountryCode(sourceCountrycode)
        setLanguageCode(tgLanguageCode)
        setCountryCode(tgCountryCode)
    }

    const loadWordtype = async (target) => {
        
        if(!target){
            target = await AsyncStorage.getItem("targetLanguagecode")
        }

        let listwordtype = await AsyncStorage.getItem("listwordtype")
        if(listwordtype){
            listwordtype = JSON.parse(listwordtype)
        }
        if(!listwordtype || !listwordtype[target]){
            listwordtype = await updateListWordType(target)
        }

        if(listwordtype){
            if(listwordtype[target]){
                setWordType("")
                setWordTypeData(listwordtype[target])
            }
        }
    }

    const typeWord = (value, language) => {
        setWord(value)
        if(transalteWordTimeout){
            clearTimeout(transalteWordTimeout)
        }
        if(value){
            setLoadingTranslateWord(true)

            transalteWordTimeout = setTimeout(async () => {
                if(!language){
                    language = languageCode
                }

                let data = await translateWord(value.toLowerCase(), language)
                setDataTranslate(data)
                setLoadingTranslateWord(false)
            }, 500)
        }

    }

    const openModalTranslate = () => {
        setIsVisibleModalTranslate(true)
    }

    const closeModalTranslate = () => {
        setIsVisibleModalTranslate(false)
    }

    const useDefinition = () => {
        setIsVisibleModalTranslate(false)
        setDefinition(dataTranslate.translation)
    }

    const loadDataNewWord = async() => {
        await loadLanguage()
        await loadWordtype()
    }

    useEffect(() => {
        
        if (word_name) {
            getCurrentWord()
        }else{
            loadDataNewWord()
        }
        
    }, [])

    const renderItem = item => {
        
        return (
            <View style={styles.item}>
                <CountryFlag isoCode={item.countrycode} size={scale(25)} style={{ borderRadius: scale(5), marginRight: scale(5) }} />
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };

    return (

        <View style={styles.container}>
            <StatusBarComponent />
            <DoneMenu
                onDelete={word_name ? confirmDelete : false}
            />
            <KeyboardAvoidingView
                keyboardVerticalOffset={0}
                behavior={Platform.OS == "ios" ? "padding" : null}
                enabled
            >
                <ScrollView >
                    <View style={styles.topView}>
                        <Image source={require('../../../assets/images/writebook.png')} style={styles.image} />
                        <Text style={styles.textdes}>{i18n.t('guildaddword')}</Text>

                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={languagejson}
                            search={true}
                            maxHeight={300}
                            labelField="name"
                            valueField="code"
                            searchField="name"
                            placeholder="Chọn ngôn ngữ"
                            searchPlaceholder="Tìm ngôn ngữ..."
                            autoScroll={true}
                            flatListProps={{
                                initialNumToRender: 37
                            }}
                            value={languageCode}
                            onChange={item => {
                                updateTargetLanguage(item)
                            }}
                            renderLeftIcon={() => (
                                    <View style={{ marginRight: scale(5) }}>
                                        {countryCode ? (
                                            <CountryFlag isoCode={countryCode || ""} size={scale(30)} style={{ borderRadius: scale(5) }} />
                                        ): null}
                                    </View>
                                )
                            }
                            renderItem={renderItem}
                        />

                        <RNPickerSelect
                                onValueChange={setWordType}
                                items={wordtypedata}
                                style={pickerStyle}
                                value={wordtype}
                                placeholder={{ "label": i18n.t('word_type') }}
                            />
                        <View
                            style={styles.wordView}
                        >
                            <TextInput
                                style={[styles.input, { 
                                    width: "85%", 
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0
                                }]}
                                onChangeText={typeWord}
                                value={word}
                                // autoFocus
                                placeholder={`${i18n.t('words')}(${i18n.t('require')})`}
                            />
                            <View style={[styles.input, {
                                width: "15%",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                alignItems: "center",
                                justifyContent: "center"
                            }]}>
                                {languageCode 
                                && word 
                                && loadingTranslateWord
                                ? (
                                    <LottieView
                                        autoPlay={true}
                                        style={{
                                            width: "100%",
                                            position: "absolute",
                                            zIndex: 10,
                                        }}
                                        // Find more Lottie files at https://lottiefiles.com/featured
                                        source={require('../../../assets/lottie/loadingtranslate.json')}
                                    />
                                ): null}
                                {languageCode 
                                && word 
                                && !loadingTranslateWord 
                                && Object.keys(dataTranslate).length > 0 ? (
                                    <TouchableOpacity
                                        onPress={openModalTranslate}
                                        style={{
                                            width: "100%",
                                            position: "absolute",
                                            zIndex: 10,
                                        }}
                                    >
                                        <LottieView
                                            autoPlay={true}
                                            loop={false}
                                            style={{
                                                width: "100%"
                                            }}
                                            // Find more Lottie files at https://lottiefiles.com/featured
                                            source={require('../../../assets/lottie/info.json')}
                                        />
                                    </TouchableOpacity>
                                ): null} 
                            </View>

                        </View>



                        <TextInput
                            style={styles.input}
                            onChangeText={setDefinition}
                            value={definition}
                            placeholder={`${i18n.t('definition')}(${i18n.t('require')})`}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setRemindSentence}
                            value={remindSentence}
                            placeholder={i18n.t('sentence')}
                        />
                        <View style={{ bottom: scale(50), position: "absolute", width: "100%" }}>
                            <FlashMessage
                                ref={flashmessage}
                                floating={true}
                                position="bottom"
                                icon="success"
                                style={{
                                    bottom: Platform.OS === 'android' ? scale(50) : scale(20),
                                    width: "100%",
                                    alignSelf: "center"
                                }}
                            />
                            <TouchableOpacity style={styles.buttonadd} onPress={saveWord}>
                                <Text style={styles.buttontext}>{i18n.t('save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <DeleteWordModal 
                isVisibleModal={isVisibleModal}
                loading={loading}
                closeModal={closeModal}
                deleteWordNow={deleteWordNow}
            />
            {word ? (
                <TransalteWordModal 
                    isVisibleModalTranslate={isVisibleModalTranslate}
                    closeModal={closeModalTranslate}
                    useDefinition={useDefinition}
                    dataTranslate={dataTranslate}
                    srCountryCode={srCountryCode}
                    tgCountryCode={countryCode}
                    wordtypedata={wordtypedata}
                />
            ): null}

            
        </View>
    );
}

const pickerStyle = StyleSheet.create({
    inputIOS: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10,
        marginTop: 20
    },
    inputAndroid: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10,
        marginTop: 20
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
})

const styles = StyleSheet.create({
    container: {

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
        paddingTop: scale(25),
        alignItems: "center",
        height: windowHeight - statusBarHeight - 50,
    },
    image: {
        width: scale(80),
        height: scale(80),
    },
    buttonadd: {
        backgroundColor: tabbarcolor,
        width: "100%",
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        // position: "absolute",
        // bottom: scale(50)
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
    },
    smallview: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        marginTop: 20,
        height: scale(50)
    },
    dropdown: {
        height: scale(50),
        backgroundColor: inputbackgroundcolor,
        borderRadius: 10,
        padding: 12,
        width: "100%",
        marginTop: 20
    },
    placeholderStyle: {
        fontSize: scale(16),
    },
    selectedTextStyle: {
        fontSize: scale(16),
        color: textColor
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: scale(16),
        color: textColor
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: scale(16),
    },
    wordView: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        
    }
})