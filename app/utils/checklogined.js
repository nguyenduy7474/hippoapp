import * as SecureStore from 'expo-secure-store';
import * as AppleAuthentication from 'expo-apple-authentication';
import { checkTokenWork, checkTokenWorkGG, checkTokenUseable } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const loginGoogleSilent = async () => {
    setLoading(true)
    let typeLogin = "google-login"
    GoogleSignin.configure({
        webClientId: '912000429184-81pu3kl9ahb3g74r6nga88011oe2sdjh.apps.googleusercontent.com',
        iosClientId: '912000429184-qvldcep1aa6e6aak76sp2truv2cvp60t.apps.googleusercontent.com',
        forceCodeForRefreshToken: true
    });
    let userInfo = await GoogleSignin.signInSilently()
    if(!userInfo.accessToken){
        userInfo = await GoogleSignin.getCurrentUser();
    }
    var datasave = JSON.parse(JSON.stringify(userInfo))
    datasave.accessToken = datasave.idToken
    datasave.typeLogin = typeLogin
    
    await AsyncStorage.setItem("logindata", JSON.stringify(datasave))
}

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
                await loginGoogleSilent()
/*                 clearData()
                ok(false)
                return */
            }
            ok(true)
            
        }
    })
}

const clearData = () => {
    AsyncStorage.clear()
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