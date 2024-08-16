import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { getLocales } from 'expo-localization';
import { loadLanguageCode } from '../utils/loadlanguagecode';
// const serverUrl = "https://613f-113-161-33-136.ngrok-free.app"
const serverUrl = "https://node.hoitto.online"
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
}

const loginCrm = ({ email, userid, firstname }) => {
    return new Promise((ok, notok) => {
        const url = `${serverUrl}/getusertoken`
        const data = { email, userid, firstname }
        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:24 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

const logOut = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/logout`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:42 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const getUserInfo = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/getuserinfor`
        let token = await AsyncStorage.getItem("token")
        if(!token){
            ok(false)
            return
        }
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:38 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const checkTokenUseable = (token) => {
    return new Promise((ok, notok) => {
        const url = `${serverUrl}/checktokenuseable`
        const data = { token }
        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:32 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

const updateWord = ({ 
    wordName = "", 
    word,
    languagecode,
    wordtype,
    definition, 
    remindSentence
}) => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/updateword`
        const datasend = {
            wordName,
            word,
            word_language: languagecode,
            word_type: wordtype,
            definition,
            remindSentence
        }
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(urlCheck, datasend, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:54 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const getListWord = () => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/getlistword`
        let token = await AsyncStorage.getItem("token")
        if(!token){
            ok({})
            return
        }
        headers.Authorization = token

        axios.post(urlCheck, {}, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:70 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const getWord = ({ wordName }) => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/getword`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(urlCheck, { wordName }, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: fb.js:12 ~ checkTokenWork ~ error:", error.response.data)
        })
    })
}

const deleteWord = ({ wordName }) => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/deleteword`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(urlCheck, { wordName }, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:103 ~ returnnewPromise ~ error:", error)
        })
    })
}

const getQuestionsQuiz = () => {
    return new Promise(async (ok, notok) => {
        const url = `${serverUrl}/getquestion`
        let token = await AsyncStorage.getItem("token")
        const data = { token }
        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:117 ~ returnnewPromise ~ error:", error.response)
            notok(error)
        })
    })
}

const getSchedule = () => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/getscheduleremider`
        const token = await AsyncStorage.getItem("token")
        let language = await AsyncStorage.getItem('languagecode');
        headers.Authorization = token
        tokenDevice = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });
        if(!language){
            if(getLocales()[0].languageCode.toLowerCase() == "vi"){
                language = "vn"
            }else{
                language = getLocales()[0].languageCode.toLowerCase()
            }
        }
        axios.post(urlCheck, { 
            "tokenDevice": tokenDevice.data,
            "language": language
        }, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: fb.js:12 ~ checkTokenWork ~ error:", error.response.data)
        })
    })
}

const updateSchedule = (dataSchedule) => {
    return new Promise(async (ok, notok) => {
        let token = await AsyncStorage.getItem("token")
        const url = `${serverUrl}/updateschedule`
        const data = { token, dataSchedule }
        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:217 ~ returnnewPromise ~ error:", error)
        })
    })
}

const checkfirsttime = async () => {
    let userInfor = await getUserInfo()
    return userInfor
}

const updateFirstSigned = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/updatefirstsigned`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:200 ~ returnnewPromise ~ error:", error)
        })
    })
}

const endQuiz = ({ questionname, dataquiz, done = 0 }) => {
    dataquiz = dataquiz.map(item => {
        return {
            word: item.word,
            correct: item.correct != undefined ? item.correct : -1
        }
    })
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/endquiz`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(url, { questionname, dataquiz: JSON.stringify(dataquiz), done: done } ,{ headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:222 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const getTranslateJson = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/gettranslatedata`

        axios.get(url, {})
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:237 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const deleteUser = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/deleteuserdata`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:276 ~ returnnewPromise ~ error:", error)
        })
    })
}

const getReminderContent = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/getremindercontent`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token
        let languagecode = await AsyncStorage.getItem("languagecode")
        const datasend = {
            languagecode
        }

        axios.post(url, datasend, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:292 ~ returnnewPromise ~ error:", error)
        })
    })
}

const checkVersionUpdate = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/checkversionupdate`
        let token = await AsyncStorage.getItem("token")
        if(!token){
            ok("")
            return
        }
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:308 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const appUpdated = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/appupdate`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:324 ~ returnnewPromise ~ error:", error)
        })
    })
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

const getReminderVocabulary = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/getremindervocabulary`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:344 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

const getWordType = (target) => {
    return new Promise((ok, notok) => {
        const url = `${serverUrl}/translatewordtype`
        const data = { target }
        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:418 ~ returnnewPromise ~ error:", error)
        })
    })
}

const translateWord = (word, source) => {
    return new Promise(async (ok, notok) => {
        const url = `${serverUrl}/translate`
        let target = await AsyncStorage.getItem("sourceLanguageCode")
        if(!target){
            let listcode = await loadLanguageCode()
            target = listcode.srLanguageCode
        }

        const data = { word, source, target }

        axios.post(url, data)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:441 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

const updateLanguageAllWord = (languagecode) => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/updateallwordlanguage`
        let token = await AsyncStorage.getItem("token")
        let target = await AsyncStorage.getItem("targetLanguagecode")
        headers.Authorization = token
        const datasend = {
            languagecode: target
        }

        axios.post(url, datasend, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:344 ~ returnnewPromise ~ error:", error)
        })
    })
}

const checkCompleteQuizToday = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/checkcompletequiztoday`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:344 ~ returnnewPromise ~ error:", error)
        })
    })
}

export {
    loginCrm,
    checkTokenUseable,
    updateWord,
    getListWord,
    getWord,
    deleteWord,
    getQuestionsQuiz,
    updateSchedule,
    getSchedule,
    endQuiz,
    checkfirsttime,
    updateFirstSigned,
    getTranslateJson,
    deleteUser,
    logOut,
    getReminderContent,
    checkVersionUpdate,
    appUpdated,
    changeLanguageModule,
    updateLanguageCodeLearn,
    getReminderVocabulary,
    getWordType,
    translateWord,
    updateLanguageAllWord,
    checkCompleteQuizToday
}