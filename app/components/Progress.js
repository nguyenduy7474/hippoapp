import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { themeColor, tabbarcolor, subtextcolor } from '../contants/style';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as Progress from 'react-native-progress';
import { scale } from 'react-native-size-matters';
import i18n from '../i18n';
const windowWidth = Dimensions.get('window').width;

export default function ProgressHeader({ number = undefined, progresspercent, heartnum = 3, endQuiz, dayquestion = false, lose = -1 }) {

    const goBack = () => {
        router.back()
    }

    const endQuizNow = async () => {
        await endQuiz()
        // router.back()
    }

    return (
        <View style={styles.container}>
            {dayquestion ? (
                <TouchableOpacity onPress={goBack}  disabled={lose == 0 ? true : false}>
                    <Image source={require('../../assets/images/close.png')} style={{ width: scale(20), height: scale(20)}}/>
                </TouchableOpacity>
            ): null }
            {dayquestion ? (
                <Progress.Bar 
                    progress={progresspercent} 
                    width={windowWidth/1.6}
                    color={tabbarcolor}
                    unfilledColor={subtextcolor}
                    borderWidth={0}
                    height={20}
                    borderRadius={50}
                />
            ): (
                <Text style={styles.point}>{number}</Text>
            )}
            {dayquestion ? (
                <View style={styles.heart}>
                    <Text style={styles.heattext}>{heartnum}</Text>
                    <Image source={require('../../assets/images/heart.png')} style={{ width: scale(20), height: scale(20)}}/>
                </View>
            ): (
                <TouchableOpacity onPress={endQuizNow} style={styles.buttonDone}>
                    <Text style={{ color: "white", fontWeight: "bold"}}>{i18n.t("end_early")}</Text>
                </TouchableOpacity>
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    heart:{
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    heattext:{
        fontSize: 25,
        fontWeight: "bold",
        marginRight: 5
    },
    point: {
        fontSize: 25,
        fontWeight: "bold",
        color: tabbarcolor
    },
    buttonDone:{
        backgroundColor: tabbarcolor,
        padding: 5,
        borderRadius:5
    }
})
