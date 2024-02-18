import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Constants from 'expo-constants';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

import QuizItem from './quizItem';
import StatusBarComponent from '../../components/StatusBar'
import ProgressHeader from '../../components/Progress';
import { saveQuestionsQuizSelector } from '../../redux/selector';
import { endQuiz, getQuestionsQuiz } from '../../api';
import { scale } from 'react-native-size-matters';
import i18n from '../../i18n';

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const failQuestion = 2
const countQuestion = 10
/* const DATA = [
    {
        word: "Shoe",
        remind_sentence: "I have new shoe",
        answer: ["Giày", "Điện thoại", "Chuột", "Bàn phím"],
        result: 0
    },
    {
        word: "Mouse",
        answer: ["Giày", "Điện thoại", "Chuột", "Bàn phím"],
        result: 2
    },
    {
        word: "Ticket",
        remind_sentence: "Buy a ticket movie",
        answer: ["Cục sạc", "Dây điện", "Tường", "Vé"],
        result: 3
    }
] */

export default function Quiz() {
    const [progresspercent, setProgresspercent] = useState(0)
    const [heartnum, setHeartnum] = useState(failQuestion)
    const [lose, setLose] = useState(-1)
    const [dataquiz, setDataQuiz] = useState([])
    const [done, setDone] = useState(false)
    const [dayquestion, setDayquestion] = useState(true)
    const [countCorrect, setCountCorrect] = useState(0)
    const [nowCount, setNowCount] = useState(0)
    const [dataQuizFetchData, setDataQuizFetchData] = useState({})
    const [notvocabulary, setNotvocabulary] = useState(false)

    const quizitem = useRef()
    const scrollToItem = (index) => {
        quizitem.current.scrollToIndex({ animated: true, index: index })
    }

    const answerResult = (result) => {
        if(result){
            let nextprogress
            nextprogress = progresspercent + 1/(dataquiz.length)
            

            if(dataquiz.length < 12){
            }else{
                nextprogress = progresspercent + 1/(dataquiz.length - failQuestion)
            }

            setCountCorrect(countCorrect+1)
            setProgresspercent(nextprogress)
        }else{
            if(dataQuizFetchData.hastoday){
                if(heartnum == 0){
                    // endQuiz()
                    setLose(0)
                    return
                }
                setHeartnum(heartnum - 1)
            }

        }

        if(nowCount + 1 == dataquiz.length){
            setDone(true)
        }
        setNowCount(nowCount+1)
    }

    const endQuizEarly = async () => {
        let correct = dataquiz.filter(item => item.correct == 1)

        if(correct.length == 0){
            router.back()
            return
        }
        let res = await endQuiz({ 
            questionname: dataQuizFetchData.questionsDoc.name, 
            dataquiz, 
            done: 1
        })

        router.replace({ pathname: "containers/Congratulations", params: { task_today: res.data.task_today, correct: correct.length } });
        return
    }

    const loadData = async () => {
        let dataQuizFetch = await getQuestionsQuiz()
        if(!dataQuizFetch.result.data.questionsDoc){
            setNotvocabulary(true)
            return
        }
        
        let listDataQuestion = shuffle(JSON.parse(JSON.stringify(dataQuizFetch.result.data.questionsDoc.listData)))
        if(dataQuizFetch.result.data.questionsDoc.task_today){
            setDayquestion(true)
        }else{
            setDayquestion(false)
        }
        
/*         listDataQuestion.map(item => {
            console.info("🚀 ~ file: index.js:81 ~ useEffect ~ item.result:", item.result)
        }) */
        setDataQuiz(listDataQuestion)
        setDataQuizFetchData(dataQuizFetch.result.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBarComponent color="white"/>
            <ProgressHeader 
                progresspercent={progresspercent}
                heartnum={heartnum}
                dayquestion={dayquestion}
                number={countCorrect}
                endQuiz={endQuizEarly}
                lose={lose}
            />
            {dataQuizFetchData && dataQuizFetchData.questionsDoc && dataquiz.length > 0 ? (
                <FlashList 
                    data={dataquiz}
                    renderItem={({item, index}) => 
                        <QuizItem 
                            question={item} 
                            nextIndex= {index != dataquiz.length - 1 ? index + 1 : false}
                            index={index}
                            scrollTo={scrollToItem}
                            answerResult={answerResult}
                            dataquiz={dataquiz}
                            setDataQuiz={setDataQuiz}
                            lose={lose}
                            questionname={dataQuizFetchData.questionsDoc.name}
                            done={done}
                    />}
                    keyExtractor={(item) => item.word}
                    estimatedItemSize={1}
                    horizontal={true}
                    bounces={true}
                    scrollEnabled={false}
                    extraData={[dataquiz, progresspercent, lose, done]}
                    ref={quizitem}
                />
            ): (
                <>
                    {notvocabulary ? (
                        <Text style={styles.addVocabulary}>{i18n.t('add_vocabulary')}</Text>
                    ): (
                        <LottieView
                        autoPlay={true}
                        style={{
                            width: scale(200),
                            position: "absolute",
                            zIndex: 10,
                            alignSelf: "center",
                            height: "100%"
                        }}
                        source={require('../../../assets/lottie/loading.json')}
                    />
                    )}
                </>
            )}
            
        </View>
      );
}

const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: windowWidth,
        height: windowHeight - statusBarHeight - 50,
    },
    addVocabulary: {
        alignSelf: "center",
        fontSize: scale(20),
        marginTop: scale(20)
    }
})
