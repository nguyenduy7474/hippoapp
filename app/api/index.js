import { checkTokenWork, getProfile } from "./fb";
import {
    getSchedule, 
    checkfirsttime, 
    updateFirstSigned,
    getTranslateJson,
    deleteUser,
    logOut,
    getReminderContent,
    checkVersionUpdate,
    appUpdated,
    getReminderVocabulary,
} from "./ocrmapi/ocrm";

import {
    updateWord,
    getListWord,
    getWord,
    deleteWord,
    updateLanguageAllWord
} from "./ocrmapi/word";

import {
    changeLanguageModule,
    updateLanguageCodeLearn
} from "./ocrmapi/language";

import {
    endQuiz,
    checkCompleteQuizToday
} from "./ocrmapi/quiz";

import {
    loginCrm,
    checkTokenUseable,
    getQuestionsQuiz,
    updateSchedule,
    getWordType,
    translateWord,
} from "./nodeapi";

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
    changeLanguageModule,
    updateLanguageCodeLearn,
    getReminderVocabulary,
    getWordType,
    translateWord,
    updateLanguageAllWord,
    checkCompleteQuizToday,
    checkTokenUseable
}