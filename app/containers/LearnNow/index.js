import { Pressable, StyleSheet, Text, View } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import LearnItemLarge from '../../components/LearnItemlarge';
import { router } from 'expo-router';

export default function LearnNow() {

    const flashcardLearn = () => {
        router.push('containers/FlashCard')
    }

    const quizLearn = () => {
        router.push('containers/Quiz')
    }

    return (
        <View>
            <StatusBarComponent />
            <TopMenu />
            <LearnItemLarge 
                title="Quiz"
                description="Ban5 se4 xem ban5 se4 xem ban5 se4 xam"
                imagesrc={require("../../../assets/images/quiz.png")}
                color={["#662D8C", "#ED1E79"]}
                onpress={quizLearn}
            />
            <LearnItemLarge 
                title="Flash Card"
                description="Ban5 se4 xem ban5 se4 xem ban5 se4 xam"
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
