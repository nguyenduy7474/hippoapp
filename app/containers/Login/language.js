import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import { themeColor2 } from '../../contants/style';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { getLocales, getCalendars } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';
import FlashMessage from "react-native-flash-message";
import i18n from '../../i18n';

const vncode = "vn"

export default function Language() {
    const [languagecode, setLanguagecode] = useState("")
    const flashmessage = useRef(null)

    const changeLanguage = async (languagecode) => {
        setLanguagecode(languagecode)
        await AsyncStorage.setItem('languagecode', languagecode)
        flashmessage.current.showMessage({
            message: i18n.t('changelanguage'),
            type: "success",
        });
    }

    const loadLanguage = async(languagecode) => {
        const value = await AsyncStorage.getItem('languagecode');
        if(!value){
            setLanguagecode(getLocales()[0].regionCode.toLowerCase())
        }else{
            setLanguagecode(value)
        }
    }

    useEffect(() => {
        loadLanguage(languagecode)
    }, [])


    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {
                backgroundColor: languagecode == vncode ? themeColor2 : "white",
                borderColor: languagecode == vncode ? "white" : themeColor2
            }]} onPress={() => changeLanguage("vn")}>
                <Image source={require('../../../assets/images/vietnamflag.png')} style={styles.flag}/>
                <Text style={[styles.buttontext, {color: languagecode == vncode ? "white" : themeColor2}]}>Tiếng việt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {
                backgroundColor: languagecode != vncode ? themeColor2 : "white",
                borderColor: languagecode != vncode ? "white" : themeColor2
            }]} onPress={() => changeLanguage("en")}>
                <Image source={require('../../../assets/images/usaflag.png')} style={styles.flag}/>
                <Text style={[styles.buttontext, {color: languagecode != vncode ? "white" : themeColor2 }]}>English</Text>
            </TouchableOpacity>
            <FlashMessage 
                ref={flashmessage} 
                floating={true}
                position="bottom"
                icon="success"
                style={{
                    top: 40
                }}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        paddingVertical: scale(10),
        width: "48%",
        alignItems: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 2
    },
    buttontext: {
        fontSize: scale(14),
        fontWeight: "bold"
    },
    flag: {
        width: 30,
        height: 30,
        marginRight: 10
    }
})
