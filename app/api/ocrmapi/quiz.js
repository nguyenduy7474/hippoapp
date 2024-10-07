import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ocrmUrl = "https://hoitto.online"
let headers = {
    "Content-Type": "application/json"
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
    endQuiz,
    checkCompleteQuizToday
}

