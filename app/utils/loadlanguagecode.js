import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReminderVocabulary } from '../api';
import language from '../contants/language.json'

export const loadLanguageCode = async () => {
    let tgLanguageCode = await AsyncStorage.getItem("targetLanguagecode")
    let srLanguageCode = await AsyncStorage.getItem("sourceLanguageCode")
    let tgCountryCode = await AsyncStorage.getItem("targetcountrycode")
    let srCountryCode = await AsyncStorage.getItem("sourcecountrycode")
    if (!tgLanguageCode && !tgCountryCode){
        let reminderVocabularyData = await getReminderVocabulary()
        if(reminderVocabularyData.source_language){
            srLanguageCode = reminderVocabularyData.source_language
            await AsyncStorage.setItem("sourceLanguageCode", reminderVocabularyData.source_language || "")
            let dataLanguage = language.filter(item => item.code == reminderVocabularyData.source_language)
            if(dataLanguage.length > 0){
                srCountryCode = dataLanguage[0].countrycode
                await AsyncStorage.setItem("sourcecountrycode", dataLanguage[0].countrycode || "")
            }
        }
        if(reminderVocabularyData.target_language){
            tgLanguageCode = reminderVocabularyData.target_language
            await AsyncStorage.setItem("targetLanguagecode", reminderVocabularyData.target_language || "")
            let dataLanguage = language.filter(item => item.code == reminderVocabularyData.target_language)
            if(dataLanguage.length > 0){
                tgCountryCode = dataLanguage[0].countrycode
                await AsyncStorage.setItem("targetcountrycode", dataLanguage[0].countrycode || "")
            }
        }
    }

    return {
        tgLanguageCode,
        tgCountryCode,
        srLanguageCode,
        srCountryCode
    }
}