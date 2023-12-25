import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { inputbackgroundcolor, tabbarcolor } from '../../contants/style';
import Constants from 'expo-constants';
import { FlashList } from '@shopify/flash-list';
import { scale } from 'react-native-size-matters';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { router } from 'expo-router';


const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const colorCorrect = tabbarcolor
const colorWrong = "#f25246"

export default function QuizItem({ question, scrollTo, nextIndex, answerResult, lose }) {
    const [doneAnswer, setDoneAnswer] = useState(false)
    const [clickAnswer, setClickAnswer] = useState(-1)
    const [countcorrect, setCountCorrect] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState("white")
    const [textColor, setTextColor] = useState("black")
    const [data, setData] = useState(question)
    const [buttonBackgroundColor, setBbuttonBackgroundColor] = useState("#f0f0f0")
    const [correct, setCorrect] = useState(-1)
    const [buttonText, setButtonText] = useState("Kiểm tra")
    
    const answer = () => {
        if(lose == 0){
            router.back()
            return
        }
        if(doneAnswer){
            scrollTo(nextIndex)
        }else{
            if(data.result != clickAnswer){ // wrong answer
                answerResult(false)
                setCorrect(0)
                setBackgroundColor(colorWrong)
                setBbuttonBackgroundColor(colorWrong)
                setTextColor("white")
            }else{ // correcr answer
                setCorrect(1)
                answerResult(true)
                setCountCorrect(countcorrect + 0.1)
                setBackgroundColor(colorCorrect)
                setTextColor("white")
            }
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
            <TouchableOpacity style={[styles.itemAnswer, {
                backgroundColor: color ? color : "white",
                borderColor: bordercolor,
            }]}
                onPress={() => chooseAnswer(index)}
                disabled={ doneAnswer ? true : false}
            >
                <Text style={[styles.textanswer, {
                    color: colortext,
                    fontWeight: color ? "bold" : "",
                }]}>{item}</Text>
                {correct == 1 || (correct == 0 && data.result == index) ? (
                    <Image source={require('../../../assets/images/checkwhite.png')} style={{ width: scale(22), height: scale(22), marginRight: 10}}/>
                ): ""}
                {correct == 0 && data.result != index? (
                    <Image source={require('../../../assets/images/closewhite.png')} style={{ width: scale(18), height: scale(18), marginRight: 10}}/>
                ): ""}
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if(lose == 0){
            setButtonText("Trở lại")
        }else if(doneAnswer){
            setButtonText("Tiếp tục")
        }
    }, [lose, doneAnswer])

    return (
        <View style={styles.container}>
            <View style={styles.bodycontainer}>
                <View style={styles.subbodycontainer}>
                    <Text style={styles.question}>What is definition for this word?</Text>
                    <View style={[styles.data, {backgroundColor: backgroundColor}]}>
                        <Text style={[styles.datatext, {color: textColor}]}>{data.word}</Text>
                    </View>

                    <FlashList 
                        data={data.answer}
                        renderItem={({item, index}) => renderAnswer({item, index})}
                        keyExtractor={(item) => item.toString()}
                        estimatedItemSize={4}
                        extraData={[clickAnswer, correct]}
                        scrollEnabled={false}
                    />
                </View>
                {lose == 0 ? (
                    <View style={styles.messageView}>
                        <Text style={styles.messageText}>You lose this time!</Text>
                        <Text style={styles.messageText}>Take a deep breath! You can do this again.</Text>    
                    </View>
                ) : ""}


                <TouchableOpacity style={[styles.buttonadd, {
                    
                    backgroundColor: buttonBackgroundColor,
                    borderColor: clickAnswer != -1 || doneAnswer ? "white" : inputbackgroundcolor,
                    borderWidth: clickAnswer != -1 || doneAnswer ? 0 : 1
                }]} 
                    onPress={answer}
                    disabled={clickAnswer == -1 && !doneAnswer ? true : false}
                >
                    <Text style={[styles.buttontext, {
                        color: clickAnswer != -1 || doneAnswer ? "white" : "black",
                    }]}>{ buttonText }</Text>
                </TouchableOpacity>
            </View>


        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: windowWidth,
        height: "100%",
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
        fontSize: 20,
        fontWeight: "bold"
    },
    question: {
        fontSize: 20,
    },
    data: {
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        paddingVertical: windowHeight/10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: inputbackgroundcolor
    },
    datatext: {
        fontSize: scale(28),
        fontWeight: "bold"
    },
    itemAnswer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "",
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
        fontSize: scale(14),
        fontWeight: "bold"
    }
})
