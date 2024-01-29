const initState = {
    updateListWord: 1
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
        default:
            return state
    }
}

export default rootReducer