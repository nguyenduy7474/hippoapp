import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetch } from "@react-native-community/netinfo";


import { getOcrm, postOcrm } from './apimethod';
import { saveWordLocal } from '../../utils/wordsync';
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
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
        const urlCheck = `updateword`
        const datasend = {
            wordName,
            word,
            word_language: languagecode,
            word_type: wordtype,
            definition,
            remindSentence,
            newupdateword: 1
        }
        let saved = await saveWordLocal(datasend)
        if(!saved){
            ok({ success : 2 })
            return 
        }
/*         fetch().then(state => {
            if(state.isConnected){
                postOcrm(urlCheck, datasend).then((data) => {
                    ok(data.data)
                }).catch((error) => {
                    console.info("🚀 ~ file: word.js:33 ~ postOcrm ~ error:", error)
                })
            }else{
                ok({ success: 1 })
            }
        }); */
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

export {
    updateWord,
    getListWord,
    getWord,
    deleteWord,
    updateLanguageAllWord
}