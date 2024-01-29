import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import { tabbarcolor, themeColor2 } from '../../contants/style';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { getLocales, getCalendars } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';

const vncode = "vn"

export default function Language({ showmessage }) {
    const [languagecode, setLanguagecode] = useState("")

    const changeLanguage = async (languagecode) => {
        setLanguagecode(languagecode)
        await AsyncStorage.setItem('languagecode', languagecode)
        showmessage()

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
                backgroundColor: languagecode == vncode ? tabbarcolor : "white",
                borderColor: languagecode == vncode ? "white" : tabbarcolor
            }]} onPress={() => changeLanguage("vn")}>
                <Image source={require('../../../assets/images/vietnamflag.png')} style={styles.flag}/>
                <Text style={[styles.buttontext, {color: languagecode == vncode ? "white" : tabbarcolor}]}>Tiếng việt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {
                backgroundColor: languagecode != vncode ? tabbarcolor : "white",
                borderColor: languagecode != vncode ? "white" : tabbarcolor
            }]} onPress={() => changeLanguage("en")}>
                <Image source={require('../../../assets/images/usaflag.png')} style={styles.flag}/>
                <Text style={[styles.buttontext, {color: languagecode != vncode ? "white" : tabbarcolor }]}>English</Text>
            </TouchableOpacity>

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
