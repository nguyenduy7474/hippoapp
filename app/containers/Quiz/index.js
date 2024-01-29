import { View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import QuizItem from './quizItem';
import StatusBarComponent from '../../components/StatusBar'
import ProgressHeader from '../../components/Progress';
import { saveQuestionsQuizSelector } from '../../redux/selector';
import { endQuiz } from '../../api';

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
    const dataQuiz = useSelector(saveQuestionsQuizSelector)
    const [dataquiz, setDataQuiz] = useState([])
    const [done, setDone] = useState(false)
    const [dayquestion, setDayquestion] = useState(true)

    const quizitem = useRef()
    const scrollToItem = (index) => {
        quizitem.current.scrollToIndex({ animated: true, index: index })
    }

    const answerResult = (result) => {
        if(result){
            let nextprogress
            if(dataquiz.length == countQuestion + failQuestion){
                nextprogress = progresspercent + 1/(dataquiz.length - failQuestion)
                if( nextprogress == 1 - ((1/(dataquiz.length - failQuestion)) * ( failQuestion - heartnum)) ){
                    setDone(true)
                }
            }else{
                nextprogress = progresspercent + 1/dataquiz.length
                if( nextprogress == 1 - ((1/dataquiz.length) * ( failQuestion - heartnum)) ){
                    setDone(true)
                }
            }

            setProgresspercent(nextprogress)
        }else{
            if(heartnum == 0){
                // endQuiz()
                setLose(0)
                return
            }
            setHeartnum(heartnum - 1)
        }
    }

    const endQuiz = () => {
        console.info("done")
    }

    useEffect(() => {
        let listDataQuestion = shuffle(JSON.parse(JSON.stringify(dataQuiz.result.data.questionsDoc.listData)))
        if(dataQuiz.result.data.questionsDoc.task_today){
            setDayquestion(true)
        }else{
            setDayquestion(false)
        }
        
        listDataQuestion.map(item => {
            console.info("🚀 ~ file: index.js:81 ~ useEffect ~ item.result:", item.result)
        })
        setDataQuiz(listDataQuestion)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBarComponent color="white"/>
            <ProgressHeader 
                progresspercent={progresspercent}
                heartnum={heartnum}
                dayquestion={dayquestion}
                number={0}
                endQuiz={endQuiz}
                lose={lose}
            />
            {dataquiz.length > 0 ? (
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
                            questionname={dataQuiz.result.data.questionsDoc.name}
                            done={done}
                    />}
                    keyExtractor={(item) => item.word}
                    estimatedItemSize={10}
                    horizontal={true}
                    bounces={true}
                    pagingEnabled
                    scrollEnabled={false}
                    extraData={[dataquiz, progresspercent, lose, done]}
                    ref={quizitem}
                />
            ): ""}

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
})
