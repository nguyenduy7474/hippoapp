import { Pressable, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import ProgressHeader from '../../components/Progress';
import { definitionbackground, inputbackgroundcolor, tabbarcolor } from '../../contants/style';
import Constants from 'expo-constants';
import { FlashList } from '@shopify/flash-list';
import { scale } from 'react-native-size-matters';
import { useRef, useState } from 'react';
import { Image } from 'expo-image';
import QuizItem from './quizItem';


const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const DATA = [
    {
        word: "Shoe",
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
        answer: ["Cục sạc", "Dây điện", "Tường", "Vé"],
        result: 3
    }
]

export default function Quiz() {
    const [progresspercent, setProgresspercent] = useState(0)
    const [heartnum, setHeartnum] = useState(2)
    const [lose, setLose] = useState(-1)

    const quizitem = useRef()

    const scrollToItem = (index) => {
        quizitem.current.scrollToIndex({ animated: true, index: index })
    }

    const answerResult = (result) => {

        if(result){
            let nextprogress = progresspercent + 1/DATA.length
            setProgresspercent(nextprogress)
        }else{
            if(heartnum == 1){
                setLose(0)
            }
            setHeartnum(heartnum - 1)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBarComponent color="white"/>
            <ProgressHeader 
                progresspercent={progresspercent}
                heartnum={heartnum}
            />
            <FlashList 
                data={DATA}
                renderItem={({item, index}) => 
                    <QuizItem 
                        question={item} 
                        nextIndex= {index != DATA.length - 1 ? index + 1 : false}
                        scrollTo={scrollToItem}
                        answerResult={answerResult}
                        lose={lose}
                />}
                keyExtractor={(item) => item.word}
                estimatedItemSize={10}
                horizontal={true}
                bounces={true}
                pagingEnabled
                scrollEnabled={false}
                extraData={[progresspercent, lose]}
                ref={quizitem}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: windowWidth,
        height: windowHeight - statusBarHeight - 50,
    },
})
