export const updateListWordAction = (data) => {
    return {
        type: "listWord/updateListWord",
        payload: data
    }
}

export const saveQuestiosQuiz = (data) => {
    return {
        type: "quiz/saveQuestionsQuiz",
        payload: data
    }
}

export const saveUserInfor = (data) => {
    return {
        type: "profile/saveUserInfor",
        payload: data
    }
}

export const checkFirstTimeOpenApp = (data) => {
    return {
        type: "profile/checkFirstTimeOpenApp",
        payload: data
    }
}

export const checkCompleteQuiz = (data) => {
    return {
        type: "quiz/checkcompletequiz",
        payload: data
    }
}