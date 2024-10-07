import { getOcrm, postOcrm } from "./apimethod"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListWord } from "./word";

const syncWordToServer = () =>{
    return new Promise(async (ok, notok) => {
        let newupdateword = await AsyncStorage.getItem("newupdateword")
        newupdateword = JSON.parse(newupdateword)
        if(newupdateword && newupdateword.length > 0){
            const method = "syncwordfrommobile"
            let datasend = {
                listupdateword: newupdateword
            }
            postOcrm(method, datasend).then((data) => {
                ok()
            }).catch((error) => {
                console.info("🚀 ~ file: syncdata.js:22 ~ postOcrm ~ error:", error)
                notok(error)
            })
        }else{
            ok()
        }
    })
}

const syncWordFromServer = async () => {
    let listWord = await getListWord()
    console.info("🚀 ~ file: syncdata.js:32 ~ syncWordFromServer ~ listWord:", listWord)
    // AsyncStorage.setItem("token", tokenOcrm.token)
}
