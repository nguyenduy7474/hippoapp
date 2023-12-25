import { I18n } from 'i18n-js';
import vn from './locales/vi.json'
import en from './locales/en.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const i18n = new I18n({ vn, en });
i18n.defaultLocale = "en";
getUserPreferableLocale();

async function getUserPreferableLocale(){
    let lang = await AsyncStorage.getItem('languagecode');
    i18n.locale = lang
    return lang
}

export default i18n