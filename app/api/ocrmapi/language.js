import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
}

const changeLanguageModule = (languagecode) => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/changelanguage`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token
        const datasend = {
            languagecode
        }

        axios.post(url, datasend, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:344 ~ returnnewPromise ~ error:", error)
        })
    })
}

const updateLanguageCodeLearn = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/updatelanguagelearn`
        let token = await AsyncStorage.getItem("token")
        let targetLanguageCode = await AsyncStorage.getItem("targetLanguagecode")
        let sourceLanguageCode = await AsyncStorage.getItem("sourceLanguageCode")
        headers.Authorization = token

        const datasend = {
            targetLanguageCode: targetLanguageCode || "",
            sourceLanguageCode: sourceLanguageCode || ""
        }

        axios.post(url, datasend, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:344 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

export {
    changeLanguageModule,
    updateLanguageCodeLearn
}