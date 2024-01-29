import axios from 'axios';

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
            console.info("🚀 ~ file: fb.js:15 ~ returnnewPromise ~ error:", error.response.data)
            ok(false)
        })
    })
}

const getProfile = (token) => {
    return new Promise((ok, notok) => {
        const urlCheck = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
        axios.get(urlCheck)
        .then(function (response) {
            ok(response.data)
        })
        .catch(function (error) {
            console.info("🚀 ~ file: fb.js:28 ~ returnnewPromise ~ error:", error)
        })
    })
}

export {
    checkTokenWork,
    getProfile
}