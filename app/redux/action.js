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