const checkSpecialCharacter = (string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(string);
}

export default checkSpecialCharacter