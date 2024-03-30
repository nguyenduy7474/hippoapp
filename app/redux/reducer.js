const initState = {
    updateListWord: 1,
    firsttimeopen: true,
    completequiz: false
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case "listWord/updateListWord":
            return{
                ...state,
                updateListWord: action.payload
            }
        case "quiz/saveQuestionsQuiz":
            return{
                ...state,
                questionquiz: action.payload
            }
        case "profile/saveUserInfor":
            return{
                ...state,
                userinfor: action.payload
            }
        case "profile/checkFirstTimeOpenApp":
            return{
                ...state,
                firsttimeopen: action.payload
            }
        case "quiz/checkcompletequiz":
            return{
                ...state,
                completequiz: action.payload
            }
        default:
            return state
    }
}

export default rootReducer