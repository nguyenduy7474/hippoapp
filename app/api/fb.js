import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkTokenWork = (token) => {
    return new Promise((ok, notok) => {
        const urlCheck = `https://graph.facebook.com/me?access_token=${token}`
        axios.get(urlCheck)
        .then(function (response) {
            if(response.data.name){
                ok(true)
            }else{
                ok(false)
            }
        })
        .catch(function (error) {
            console.info("🚀 ~ file: fb.js:12 ~ checkTokenWork ~ error:", error)
        })
    })

}

export {
    checkTokenWork
}