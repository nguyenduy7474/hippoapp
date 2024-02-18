import { checkVersion } from "react-native-check-version";

export const checkNewVersion = async () => {
    const version = await checkVersion();
    
    if (version.needsUpdate) {
       return true
    }
    return false
}
