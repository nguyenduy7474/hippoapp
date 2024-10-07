import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { getLocales } from 'expo-localization';
import { getOcrm, postOcrm } from './apimethod';
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
}

const logOut = () => {
    return new Promise(async (ok, notok) => {
        const method = `logout`

        getOcrm(method).then((data) => {
            ok(data)
        }).catch(() => {
            notok(error)
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

const getSchedule = () => {
    return new Promise(async (ok, notok) => {
        const method = `getscheduleremider`
        let language = await AsyncStorage.getItem('languagecode');
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
        let datasend = { 
            "tokenDevice": tokenDevice.data,
            "language": language
        }

        postOcrm(method, datasend).then((data) =>{
            ok(data)
        }).catch(() =>{
            notok(error)
        })
    })
}

const checkfirsttime = async () => {
    let userInfor = await getUserInfo()
    return userInfor
}

const updateFirstSigned = () => {
    return new Promise(async (ok, notok) => {
        const method = `updatefirstsigned`

        getOcrm(method).then((data) => {
            ok(data)
        }).catch((error) => {
            notok(error)
        })

    })
}

const getTranslateJson = () => {
    return new Promise(async (ok, notok) => {
        const method = `gettranslatedata`

        getOcrm(method).then((data) => {
            ok(data.data)
        }).catch((error) => {
            notok(error)
        })
    })
}

const deleteUser = () => {
    return new Promise(async (ok, notok) => {
        const method = `deleteuserdata`

        getOcrm(method).then((data) => {
            ok(data.data)
        }).catch((error) => {
            notok(error)
        })
    })
}

const getReminderContent = () => {
    return new Promise(async (ok, notok) => {
        const method = `getremindercontent`
        let languagecode = await AsyncStorage.getItem("languagecode")
        const datasend = {
            languagecode
        }

        postOcrm(method, datasend).then((data) =>{
            ok(data.data)
        }).catch(() =>{
            notok(error)
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
        const method = `appupdate`

        getOcrm(method).then((data) => {
            ok(data.data)
        }).catch((error) => {
            notok(error)
        })
    })
}

const getReminderVocabulary = () => {
    return new Promise(async (ok, notok) => {
        const method = `getremindervocabulary`

        getOcrm(method).then((data) => {
            ok(data.data)
        }).catch((error) => {
            notok(error)
        })
    })
}

export {
    getSchedule,
    checkfirsttime,
    updateFirstSigned,
    getTranslateJson,
    deleteUser,
    logOut,
    getReminderContent,
    checkVersionUpdate,
    appUpdated,
    getReminderVocabulary,
}