import { checkTokenWork, getProfile } from "./fb";
import {
    loginCrm, 
    updateWord, 
    getListWord, 
    getWord, 
    deleteWord, 
    getQuestionsQuiz, 
    updateSchedule, 
    getSchedule, 
    endQuiz, 
    checkfirsttime, 
    updateFirstSigned,
    getTranslateJson,
    deleteUser,
    logOut,
    getReminderContent,
    checkVersionUpdate,
    appUpdated,
    changeLanguageModule
} from "./ocrm";
import { checkTokenWorkGG } from "./google";

export {
    checkTokenWork,
    checkTokenWorkGG,
    getProfile,
    loginCrm,
    updateWord,
    getListWord,
    getWord,
    deleteWord,
    getQuestionsQuiz,
    updateSchedule,
    getSchedule,
    checkfirsttime,
    updateFirstSigned,
    endQuiz,
    getTranslateJson,
    deleteUser,
    logOut,
    getReminderContent,
    checkVersionUpdate,
    appUpdated,
    changeLanguageModule
}