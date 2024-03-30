import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWordType } from '../api';

const updateListWordType = async (targetcode) => {
    let listwordtype = await AsyncStorage.getItem("listwordtype") || "{}"
    listwordtype = JSON.parse(listwordtype)
    if(!listwordtype[targetcode]){

        let datawordtype = await getWordType(targetcode)
        listwordtype[targetcode] = datawordtype[targetcode]
        await AsyncStorage.setItem("listwordtype", JSON.stringify(listwordtype) || "")
    }
    return listwordtype
}

export default updateListWordType