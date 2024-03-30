import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import CountryFlag from "react-native-country-flag";
import AsyncStorage from '@react-native-async-storage/async-storage';

import StatusBarComponent from '../../components/StatusBar';
import GobackMenu from '../../components/gobackMenu';
import i18n from '../../i18n';
import { definitionbackground, tabbarcolor } from '../../contants/style';
import language from '../../contants/language.json'
import { updateLanguageCodeLearn, getReminderVocabulary, updateLanguageAllWord } from '../../api';
import updateListWordType from '../../utils/updatelistwordtype';
import { loadLanguageCode } from '../../utils/loadlanguagecode';
import FlashMessage from 'react-native-flash-message';
import UpdateAllWord from './modalupdateallword';

export default function Preferences() {

    const flashmessage = useRef()
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)

    
    const [languageCode, setLanguae] = useState({
        targetLanguagecode: "",
        targetCountrycode: "",
        sourceLanguagecode: "",
        sourceCountrycode: "",
    })

    const renderItem = item => {
        
        return (
            <View style={styles.item}>
                <CountryFlag isoCode={item.countrycode} size={scale(25)} style={{ borderRadius: scale(5), marginRight: scale(5) }} />
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };

    const updateLanguageCode = async (data) => {
        await AsyncStorage.setItem("targetLanguagecode", data.targetLanguagecode || "")
        await AsyncStorage.setItem("sourceLanguageCode", data.sourceLanguagecode || "")
        await AsyncStorage.setItem("targetcountrycode", data.targetCountrycode || "")
        await AsyncStorage.setItem("sourcecountrycode", data.sourceCountrycode || "")
        await updateListWordType(data.targetLanguagecode)

        await updateLanguageCodeLearn()
    }

    const loadData = async () => {

        const { tgLanguageCode, tgCountryCode, srLanguageCode, srCountryCode} = await loadLanguageCode()
        setLanguae({
            targetLanguagecode: tgLanguageCode,
            targetCountrycode: tgCountryCode,
            sourceLanguagecode: srLanguageCode,
            sourceCountrycode: srCountryCode,
        })
    }

    const closeModal = () => {
        setIsVisibleModal(false)
    }

    const accept = async () => {
        await updateLanguageAllWord()
        setIsVisibleModal(false)
        flashmessage.current.showMessage({
            message: "Cập nhật thành công",
            type: "success",
        });
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <StatusBarComponent />
            <GobackMenu screenname="preferences" />
            <View style={styles.container}>
                <Text style={styles.textLabel}>{i18n.t('target_language')}</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={language}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="code"
                    placeholder="Chọn ngôn ngữ"
                    searchPlaceholder="Tìm ngôn ngữ..."
                    value={languageCode.targetLanguagecode}
                    flatListProps={{
                        initialNumToRender: 43
                    }}
                    onChange={item => {
                        let data = {
                            ...languageCode,
                            targetLanguagecode: item.code,
                            targetCountrycode: item.countrycode
                        }
                        setLanguae(data)
                        updateLanguageCode(data)
                    }}
                    renderLeftIcon={() => (
                            <View style={{ marginRight: scale(5) }}>
                                <CountryFlag isoCode={languageCode.targetCountrycode || ""} size={scale(30)} style={{ borderRadius: scale(5) }} />
                            </View>
                        )
                    }
                    renderItem={renderItem}
                />
                <Text style={styles.textLabel}>{i18n.t('source_language')}</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={language}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="code"
                    placeholder="Chọn ngôn ngữ"
                    searchPlaceholder="Tìm ngôn ngữ..."
                    value={languageCode.sourceLanguagecode}
                    onChange={item => {
                        let data = {
                            ...languageCode,
                            sourceLanguagecode: item.code,
                            sourceCountrycode: item.countrycode
                        }
                        setLanguae(data)
                        updateLanguageCode(data)
                    }}
                    renderLeftIcon={() => (
                        <View style={{ marginRight: scale(5) }}>
                            <CountryFlag isoCode={languageCode.sourceCountrycode || ""} size={scale(30)} style={{ borderRadius: scale(5) }} />
                        </View>
                    )}
                    renderItem={renderItem}
                />
                <View style={{ 
                    position: "absolute",
                    width: "100%",
                    margin: 10,
                    bottom: scale(50)
                }}>
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
                    <TouchableOpacity style={styles.buttonadd} onPress={() => setIsVisibleModal(true)}>
                        <Text style={styles.buttontext}>{i18n.t('update_all_word')}</Text>
                    </TouchableOpacity>
                </View>
                <UpdateAllWord
                    isVisibleModal={isVisibleModal}
                    loading={loading}
                    closeModal={closeModal}
                    accept={accept}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    textLabel: {
        fontSize: scale(16),
        fontWeight: "bold",
        marginVertical: scale(10),
        color: definitionbackground
    },
    dropdown: {
        height: scale(50),
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
    },
    icon: {
        marginRight: 5,
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
    placeholderStyle: {
        fontSize: scale(16),
    },
    selectedTextStyle: {
        fontSize: scale(16),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: scale(16),
    },
})

