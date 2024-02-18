import * as SecureStore from 'expo-secure-store';
import * as AppleAuthentication from 'expo-apple-authentication';
import { checkTokenWork, checkTokenWorkGG } from '../api';
import { checkTokenUseable } from "../api/ocrm";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckLogin = () => {
    return new Promise(async (ok, notok) => {
        let credentialLogin = await AsyncStorage.getItem("logindata")
        credentialLogin = JSON.parse(credentialLogin)
        if(!credentialLogin){
            ok(false)
            return
        }

        if(credentialLogin.typeLogin == "apple-login"){
            let checkTokenOcrm = await checkTokenUseableFeature()
            if(!checkTokenOcrm){
                clearData()
                ok(false)
                return
            }
            let checkState = await AppleAuthentication.getCredentialStateAsync(credentialLogin.user)
            if(checkState == 1){
                ok(true)
            }else{
                clearData()
                ok(false)
            }
        }

        if(credentialLogin.typeLogin == "fb-login"){
            let checkTokenOcrm = await checkTokenUseableFeature()
            if(!checkTokenOcrm){
                clearData()
                ok(false)
                return
            }
            let checkLogin = await checkTokenWork(credentialLogin.accessToken)
            if(!checkLogin){
                clearData()
                ok(false)
                return
            }
            ok(true)
            
        }

        if(credentialLogin.typeLogin == "google-login"){
            let checkTokenOcrm = await checkTokenUseableFeature()
            if(!checkTokenOcrm){
                clearData()
                ok(false)
                return
            }
            let checkLogin = await checkTokenWorkGG(credentialLogin.accessToken)
            if(!checkLogin){
                clearData()
                ok(false)
                return
            }
            ok(true)
            
        }
    })
}

const clearData = () => {
    AsyncStorage.clear()
    //SecureStore.deleteItemAsync("logindata")
    //SecureStore.deleteItemAsync("token")
}

const checkTokenUseableFeature = async () => {
    let tokenOcrm = await AsyncStorage.getItem("token")
    if(tokenOcrm){
        let check = await checkTokenUseable(tokenOcrm)
        if(check.success){
            return true
        }
        return false
    }

    return false
}

export default CheckLogin