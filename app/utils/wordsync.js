import AsyncStorage from '@react-native-async-storage/async-storage';

const saveWordLocal = async (wordObject = {}) => {
    if(!wordObject){
        return
    }
    
    let newupdateword = await AsyncStorage.getItem("newupdateword")
    let listworddata = await AsyncStorage.getItem("listworddata")
    listworddata = JSON.parse(listworddata)
    newupdateword = JSON.parse(newupdateword)
    
    listworddata = proccessWordExistInArray(listworddata, wordObject)
    if(!listworddata){
        return false
    }
    newupdateword = proccessWordExistInArray(newupdateword, wordObject)

    await AsyncStorage.setItem("newupdateword", JSON.stringify(newupdateword))
    await AsyncStorage.setItem("listworddata", JSON.stringify(listworddata))
    try{
        await syncWordData()
        return true
    }catch(error){
        console.info("🚀 ~ file: wordsync.js:25 ~ saveWordLocal ~ error:", error)
        return false
    }

}

function proccessWordExistInArray(array, wordObject){
    let hasadded = false
    if(!array){
        array = []
    }
    for(let i=0; i< array.length; i++){
        if(array[i].word.toLowerCase() == wordObject.word.toLowerCase()){
            if(array[i].wordName){
                return false
            }
            array[i] = wordObject
            hasadded = true
            break
        }
    }
    if(!hasadded){
        array.push(wordObject)
    }
    return array
}

export {
    saveWordLocal
}