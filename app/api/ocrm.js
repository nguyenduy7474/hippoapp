import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// const serverUrl = "http://124.158.10.32:1999"
const serverUrl = "https://e8b3-2001-ee0-2ed-fe9c-c52a-8780-6947-6935.ngrok-free.app"
const ocrmUrl = "https://ocrmv3.oshima.vn"
let headers = {
    "Content-Type": "application/json"
}

const loginCrm = ({ email, userid, firstname }) => {
    return new Promise((ok, notok) => {
        const urlCheck = `${serverUrl}/getusertoken`
        axios.post(urlCheck, { email, userid, firstname })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:19 ~ returnnewPromise ~ error:", error)
        })
    })
}

const getUserInfo = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/getuserinfor`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:196 ~ returnnewPromise ~ error:", error)
        })
    })
}

const checkTokenUseable = (token) => {
    return new Promise((ok, notok) => {
        const urlCheck = `${serverUrl}/checktokenuseable`
        axios.post(urlCheck, { token })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:32 ~ returnnewPromise ~ error:", error)
        })
    })
}

const updateWord = ({ wordName = "", word, definition, remindSentence }) => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/updateword`
        const datasend = {
            wordName,
            word,
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
            console.info("🚀 ~ file: ocrm.js:54 ~ returnnewPromise ~ error:", error)
        })
    })
}

const getListWord = () => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/getlistword`
        let token = await AsyncStorage.getItem("token")
        console.info("🚀 ~ file: ocrm.js:65 ~ returnnewPromise ~ token:", token)
        headers.Authorization = token

        axios.post(urlCheck, {}, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:70 ~ returnnewPromise ~ error:", error)
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
            ok(response.data)
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
            console.info("🚀 ~ file: ocrm.js:100 ~ response.data:", response.data)
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:103 ~ returnnewPromise ~ error:", error)
        })
    })
}

const getQuestionsQuiz = () => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${serverUrl}/getquestion`
        let token = await AsyncStorage.getItem("token")
        axios.post(urlCheck, { token })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:117 ~ returnnewPromise ~ error:", error.response)
        })
    })
}

const getSchedule = () => {
    return new Promise(async (ok, notok) => {
        const urlCheck = `${ocrmUrl}/api/method/getscheduleremider`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token
        tokenDevice = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        });

        axios.post(urlCheck, { "tokenDevice": tokenDevice.data }, { headers })
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
        const urlCheck = `${serverUrl}/updateschedule`

        axios.post(urlCheck, { token, dataSchedule })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:19 ~ returnnewPromise ~ error:", error)
        })
    })
}

const endQuiz = async ({questionname, arrayQuestionResult}) => {
    console.info("🚀 ~ file: ocrm.js:159 ~ endQuiz ~ questionname:", questionname)
    arrayQuestionResult = arrayQuestionResult.map(item => {
        return {
            word: item.word,
            correct: item.correct
        }
    })
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/quizresult`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(url, { 
            questionname,
            arrayQuestionResult
        }, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: fb.js:12 ~ checkTokenWork ~ error:", error.response.data)
        })
    })
}

const checkfirsttime = async () => {
    let userInfor = await getUserInfo()
    return userInfor.signed
}

const updateFirstSigned = () => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/updatefirstsigned`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token
        console.info("🚀 ~ file: ocrm.js:211 ~ returnnewPromise ~ headers:", headers)

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:196 ~ returnnewPromise ~ error:", error.response.data)
        })
    })
}

const failQuiz = ({ questionname, dataquiz}) => {
    dataquiz = dataquiz.map(item => {
        return {
            word: item.word,
            correct: item.correct != undefined ? item.correct : -1
        }
    })
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/failquiz`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(url, { questionname, dataquiz: JSON.stringify(dataquiz) } ,{ headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: ocrm.js:196 ~ returnnewPromise ~ error:", error.response.data)
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
    failQuiz
}