import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { inputbackgroundcolor, tabbarcolor, colorWrong } from '../../contants/style';
import Constants from 'expo-constants';
import { scale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { BlurView } from "@react-native-community/blur";
import { endQuiz } from '../../api';
import i18n from '../../i18n';
import CountryFlag from 'react-native-country-flag';
import { Feather } from '@expo/vector-icons';
import { isTablet } from 'react-native-device-info';


const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const colorCorrect = tabbarcolor

export default function QuizItem({ 
    question, 
    scrollTo, 
    nextIndex, 
    answerResult, 
    lose, 
    done,
    dataquiz,
    setDataQuiz,
    index,
    questionname
}) {
    const [doneAnswer, setDoneAnswer] = useState(false)
    const [clickAnswer, setClickAnswer] = useState(-1)
    const [countcorrect, setCountCorrect] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState("white")
    const [textColor, setTextColor] = useState("black")
    const [data, setData] = useState({})
    const [buttonBackgroundColor, setBbuttonBackgroundColor] = useState("#f0f0f0")
    const [correct, setCorrect] = useState(-1)
    const [buttonText, setButtonText] = useState("check")
    const [blur, setBlur] = useState(true)
    const [disabledButton, setDisabledButton] = useState(false)

    const answer = async () => {
        
        if(lose == 0){
            setDisabledButton(true)
            await endQuiz({ questionname, dataquiz })
            router.back()
            return
        }
        if(done){
            let res = await endQuiz({ questionname, dataquiz, done: 1})
            let correct = dataquiz.filter(item => item.correct == 1)
            let wrong = dataquiz.filter(item => item.correct == 0)
            if(correct.length > 0){
                router.replace({ 
                    pathname: "containers/Congratulations", 
                    params: { 
                        task_today: res.data.task_today, 
                        correct: correct.length, 
                        wrong: wrong.length 
                    } 
                });
            }else{
                router.back()
            }
            return
        }
        if(doneAnswer){
            setBlur(true)
            setCorrect(-1)
            setBackgroundColor("white")
            setClickAnswer(-1)
            setTextColor("black")
            setDoneAnswer(false)
            setBbuttonBackgroundColor("#f0f0f0")
            scrollTo(nextIndex)
        }else{

            if(data.result != clickAnswer){ // wrong answer
                removeblur()
                answerResult(false)
                setCorrect(0)
                setBackgroundColor(colorWrong)
                setBbuttonBackgroundColor(colorWrong)
                setTextColor("white")
                dataquiz[index].correct = 0
                
            }else{ // correcr answer

                setCorrect(1)
                answerResult(true)
                setCountCorrect(countcorrect + 0.1)
                setBackgroundColor(colorCorrect)
                setTextColor("white")
                dataquiz[index].correct = 1
            }

            setDataQuiz(dataquiz)
            setDoneAnswer(true)
        }

    }

    const chooseAnswer = (index) => {
        if(!doneAnswer){
            setClickAnswer(index)
            setBbuttonBackgroundColor(tabbarcolor)
        }
    }

    const renderAnswer = ({ item, index }) => {
        let colortext
        let color
        let bordercolor

        if(correct != -1 &&data.result == index){
            color = colorCorrect
        }

        if(correct == 0 && index == clickAnswer){
            color = colorWrong
        }

        if(color){
            colortext = "white"
            bordercolor = color
        }else{
            colortext = clickAnswer == index ? tabbarcolor : "black"
            bordercolor = clickAnswer == index ? tabbarcolor : inputbackgroundcolor
        }

        return (
            <TouchableOpacity 
                style={[styles.itemAnswer, {
                    backgroundColor: color ? color : "white",
                    borderColor: bordercolor,
                }]}
                onPress={() => chooseAnswer(index)}
                disabled={ doneAnswer ? true : false}
                key={item}
            >
                <Text style={[styles.textanswer, {
                    color: colortext,
                    fontWeight: color ? "bold" : "black",
                }]}>{item}</Text>
                {correct == 1 || (correct == 0 && data.result == index) ? (
                    <Image source={require('../../../assets/images/checkwhite.png')} style={{ width: isTablet() ? scale(15) : scale(18), height: isTablet() ? scale(15) : scale(18), marginRight: 10}}/>
                ): ""}
                {correct == 0 && data.result != index? (
                    <Image source={require('../../../assets/images/closewhite.png')} style={{ width: isTablet() ? scale(13) : scale(15), height: isTablet() ? scale(13) : scale(15), marginRight: 10}}/>
                ): ""}
            </TouchableOpacity>
        )
    }

    const removeblur = () => {
        setBlur(false)
    }

    const editWord = () => {
        router.push({ pathname: "containers/AddWord", params: { word_name: data.name } });
    }

    useEffect(() => {

        if(lose == 0){
            setButtonText("back")
        }else if(done){
            setButtonText("end_early")
        }else if(doneAnswer){
            setButtonText("next")
        }
        
    }, [lose, doneAnswer, done])

    useEffect(() => {
        setData(question)
    }, [question])

    return (
        <View style={styles.container}>
            <View style={styles.bodycontainer}>
                <View style={styles.subbodycontainer}>
                    <View style={styles.questionView}>
                        <Text style={styles.question}>{i18n.t('what_definition')}</Text>
{/*                         <TouchableOpacity onPress={editWord}>
                            <Feather name="edit" size={scale(20)} color={tabbarcolor} />
                        </TouchableOpacity> */}
                    </View>
                    {data.answer && data.answer.length > 0 ? (
                        <>
                            <View style={[styles.data, {backgroundColor: backgroundColor}]}>
                                {data.word_countrycode ? (
                                    <CountryFlag isoCode={data.word_countrycode || ""} size={scale(20)} style={styles.countryflag} />
                                ): null}
                                {data.word_type ? (
                                    <Text style={[styles.wordtype, {color: textColor}]}>{data.word_type}</Text>
                                ): null}
                                <Text style={[styles.datatext, {color: textColor}]}>{data.word}</Text>
                                <TouchableOpacity style={styles.remindsentence} onPress={removeblur} >
                                    <Text style={[styles.blurtext, {color: textColor}]}>{data.remind_sentence}</Text>
                                    {data.remind_sentence && blur ? (
                                        <BlurView
                                            style={styles.absolute}
                                            blurType="light"
                                            blurAmount={4}
                                            overlayColor=''
                                            reducedTransparencyFallbackColor="white"
                                        />
                                    ): ""}
                                    
                                </TouchableOpacity>
                            </View>
                            {data.answer.map((item, index) => renderAnswer({item, index}))}
    {/*                         <FlashList 
                                data={data.answer}
                                renderItem={({item, index}) => renderAnswer({item, index})}
                                keyExtractor={(item) => item.toString()}
                                estimatedItemSize={4}
                                extraData={[clickAnswer, correct]}
                                scrollEnabled={false}
                            /> */}
                        </>
                    ): null}
                    
                </View>
                {lose == 0 ? (
                    <View style={styles.messageView}>
                        <Text style={styles.messageText}>{i18n.t('lose_this_time')}</Text>
                        <Text style={styles.messageText}>{i18n.t('take_deep_breath')}</Text>    
                    </View>
                ) : ""}


                <TouchableOpacity style={[styles.buttonadd, {
                    
                    backgroundColor: buttonBackgroundColor,
                    borderColor: clickAnswer != -1 || doneAnswer ? "white" : inputbackgroundcolor,
                    borderWidth: clickAnswer != -1 || doneAnswer ? 0 : 1
                }]} 
                    onPress={answer}
                    disabled={(clickAnswer == -1 && !doneAnswer) || disabledButton ? true : false}
                >
                    <Text style={[styles.buttontext, {
                        color: clickAnswer != -1 || doneAnswer ? "white" : "black",
                    }]}>{i18n.t(buttonText)}</Text>
                </TouchableOpacity>
            </View>


        </View>
      );
}

const styles = StyleSheet.create({
    questionView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        backgroundColor: "white",
        width: windowWidth,
        height: "100%",
    },
    countryflag: {
        borderRadius: scale(5),
        position: "absolute",
        left: scale(10),
        top: scale(10)
    },
    wordtype: {
        position: "absolute",
        right: scale(10),
        top: scale(10),
        fontSize: scale(18)
    },
    bodycontainer: {
        marginHorizontal: 10,
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "white"
    },
    subbodycontainer: {
        flex: 1
    },
    buttonadd: {
        backgroundColor: tabbarcolor,
        marginTop: 10,
        marginBottom: 30,
        alignItems: "center",
        paddingVertical: 18,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttontext: {
        color: "white",
        fontSize: isTablet() ? 34 : 20,
        fontWeight: "bold"
    },
    question: {
        fontSize: isTablet() ? scale(12) : scale(16),
    },
    data: {
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        paddingVertical: windowHeight/10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: inputbackgroundcolor,
    },
    datatext: {
        fontSize: scale(28),
        fontWeight: "bold"
    },
    itemAnswer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 3,
        paddingVertical: windowHeight/40,
        marginBottom:5,
        paddingHorizontal: 10,
        justifyContent: "space-between"
    },
    textanswer: {
        fontSize: scale(16),
        marginLeft: 10
    },
    messageView: {
        backgroundColor: "#5c5c5c",
        borderRadius: 10,
        padding: 10
    },
    messageText: {
        color: "white",
        fontSize: isTablet() ? scale(12) : scale(14),
        fontWeight: "bold"
    },
    remindsentence: {
        position: "absolute",
        fontSize: 14,
        bottom: 20,
        height: "auto",
        padding: 10,
        alignSelf: "center",
        marginHorizontal: 20,
    },
    blurtext:{
        fontSize: isTablet() ? 26 : 12,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 10
    }
})
