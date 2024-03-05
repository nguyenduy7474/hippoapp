import axios from 'axios';

const checkTokenWorkGG = (token) => {
    return new Promise((ok, notok) => {
        const urlCheck = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
        axios.get(urlCheck)
        .then(function (response) {
            if(response.data.email){
                ok(true)
            }else{
                ok(false)
            }
        })
        .catch(function (error) {
            console.info("🚀 ~ file: google.js:15 ~ returnnewPromise ~ error:", error.response)
            ok(false)
        })
    })
}

export {
    checkTokenWorkGG
}