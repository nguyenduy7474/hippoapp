import * as SecureStore from 'expo-secure-store';
import * as AppleAuthentication from 'expo-apple-authentication';
import { checkTokenWork } from '../api';

const CheckLogin = () => {
    return new Promise(async (ok, notok) => {
        let credentialLogin = await SecureStore.getItemAsync("logindata")
        credentialLogin = JSON.parse(credentialLogin)
        if(!credentialLogin){
            ok(false)
            return
        }

        if(credentialLogin.typeLogin == "apple-login"){
            let checkState = await AppleAuthentication.getCredentialStateAsync(JSON.parse(credentialApple).user)
            if(checkState == 1){
                ok(true)
            }else{
                ok(false)
            }
        }

        if(credentialLogin.typeLogin == "fb-login"){
            let checkLogin = await checkTokenWork(credentialLogin.accessToken)
            if(checkLogin){
                ok(true)
            }else{
                ok(false)
            }
            
        }
    })
}

export default CheckLogin