const checkSpecialCharacter = (string) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if(!format.test(string)){
        return false
    }else{
        return true
    }
}

export default checkSpecialCharacter