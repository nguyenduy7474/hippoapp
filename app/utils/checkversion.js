import { Platform } from "react-native";
import VersionCheck, { checkVersion } from "react-native-check-version";

export const checkNewVersion = async () => {
    const version = await checkVersion();
    
    if (version.needsUpdate) {
       return true
    }
    return false
}

export const getStoreUrl = async () => {
    let url = "https://apps.apple.com/app/hoitto/id6473771467"

    if(Platform.OS == "Android"){
        url = await VersionCheck.getPlayStoreUrl()
    }

    return url
}
