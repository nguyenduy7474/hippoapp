import { Pressable, StyleSheet, Text, View } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import LearnItemLarge from '../../components/LearnItemlarge';
import { router } from 'expo-router';
import i18n from '../../i18n';
import { getQuestionsQuiz } from '../../api';
import { saveQuestiosQuiz } from '../../redux/action';
import { useDispatch } from 'react-redux';

export default function LearnNow() {
    const dispatch = useDispatch()

    const flashcardLearn = () => {
        router.push('containers/FlashCard')
    }

    const quizLearn = async () => {
        // let dataQuiz = await getQuestionsQuiz()
        // dispatch(saveQuestiosQuiz(dataQuiz))
        router.push('containers/Quiz')
    }
    

    return (
        <View>
            <StatusBarComponent />
            <TopMenu />
            <LearnItemLarge 
                title={i18n.t('quiz')}
                description={i18n.t('quizdescription')}
                imagesrc={require("../../../assets/images/quiz.png")}
                color={["#662D8C", "#ED1E79"]}
                onpress={quizLearn}
            />
            <LearnItemLarge 
                title={i18n.t('flash_card')}
                description={i18n.t('flashcarddescription')}
                imagesrc={require("../../../assets/images/flashcards.png")}
                iconposition="top"
                onpress={flashcardLearn}
                color={["#136a8a", "#267871"]}
                style={{ opacity: 0.5 }}
                disabled={true}
            />
{/*             <LearnItem 
                title="Strike"
                description="Ban5 se4 xem ban5 se4 xem ban5 se4 xam"
                imagesrc={require("../../../assets/images/strike.png")}
                iconposition="top"
            /> */}
        </View>
      );
}

const styles = StyleSheet.create({

})
