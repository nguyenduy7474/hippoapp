import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadLanguageCode } from '../utils/loadlanguagecode';
// const serverUrl = "https://613f-113-161-33-136.ngrok-free.app"
const serverUrl = "https://node.hoitto.online"

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

export {
    loginCrm,
    checkTokenUseable,
    getQuestionsQuiz,
    updateSchedule,
    getWordType,
    translateWord,
}