import { I18n } from 'i18n-js';
import { getLocales, getCalendars } from 'expo-localization';
import { getTranslateJson } from '../api';

import vn from './locales/vi.json'
import en from './locales/vi.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

let defaultlanguage = "en"
var i18n
// 
var i18n = new I18n({
    "vn": {"settings": "Cài đặt"},
    "en": {"settings": "Settings"}
})
loadTranslateData(i18n)

i18n.defaultLocale = defaultlanguage;
getUserPreferableLocale();

async function loadTranslateData(i18n){
    let data = await getTranslateJson()
    
    for(let i=0; i< data.length; i++){
        let objLanguage = {}
        objLanguage[data[i].name] = JSON.parse(data[i].language_json)
        i18n.store(objLanguage)
    }
}

async function getUserPreferableLocale(){
    let lang = await AsyncStorage.getItem('languagecode');
    if(!lang && getLocales()[0].languageCode.toLowerCase() == "vi"){
        lang = "vn"
    }
    i18n.locale = lang
    return lang
}

export default i18n