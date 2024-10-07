import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
}


const getOcrm = (method) => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/${method}`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.get(url, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            notok(error)
        })
    })
}

const postOcrm = (method, datasend) => {
    return new Promise(async (ok, notok) => {
        const url = `${ocrmUrl}/api/method/${method}`
        let token = await AsyncStorage.getItem("token")
        headers.Authorization = token

        axios.post(url, datasend, { headers })
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            notok(error)
        })
    })
}

export {
    getOcrm,
    postOcrm
}