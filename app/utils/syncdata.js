import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetch } from "@react-native-community/netinfo";

import { postOcrm } from '../api/ocrmapi/apimethod';
import { getListWord } from '../api';

const syncQuizToServer = async () => {

}

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
    await AsyncStorage.setItem("listworddata", JSON.stringify(listWord.data))
}

const syncWordData = async (haveInternet) => {
    try{
        if(!haveInternet){
            let state = await fetch()
            if(!state.isConnected){
                return
            }
        }
        await syncWordToServer()
        await syncQuizToServer()
        await syncWordFromServer()
    }catch(error){
        console.info("🚀 ~ file: syncdata.js:17 ~ syncWordData ~ error:", error)
    }
}

export default syncWordData