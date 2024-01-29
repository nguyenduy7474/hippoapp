import { loginCrm } from "../api"
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginFeature = async (dataToken, typeLogin) => {
    if(typeLogin == "fb-login"){
        let tokenOcrm = await loginCrm({ email: dataToken.email, userid: dataToken.id, firstname: dataToken.name })
        AsyncStorage.setItem("token", tokenOcrm.token)
        return true
    }
    if(typeLogin == "apple-login"){
        let tokenOcrm = await loginCrm({ 
            email: dataToken.email, 
            userid: dataToken.user, 
            firstname: `${dataToken.fullName.givenName} ${dataToken.fullName.familyName}` 
        })
        AsyncStorage.setItem("token", tokenOcrm.token)
        return true
    }
    if(typeLogin == "google-login"){
        let tokenOcrm = await loginCrm({ 
            email: dataToken.user.email, 
            userid: dataToken.user.id, 
            firstname: dataToken.user.name
        })
        AsyncStorage.setItem("token", tokenOcrm.token)
        return true
    }
}



export default loginFeature