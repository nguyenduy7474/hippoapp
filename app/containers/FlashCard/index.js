import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import CardFlip from 'react-native-card-flip';
import { useRef, useState } from 'react';
import ProgressHeader from '../../components/Progress';
import i18n from '../../i18n';
import { 
    inputbackgroundcolor, 
    definitionbackground, 
    tabbarcolor, 
    meaningbackground, 
    subtextcolor, 
    flashcardbackground
} from '../../contants/style';
import { BlurView } from "@react-native-community/blur";
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

const windowHeight = Dimensions.get('window').height;


const textColor = "#5e5e5e"

export default function FlashCard() {
    const [answers, setAnswers] = useState("")
    const [blur, setBlur] = useState(true)
 
    const card = useRef()

    const flipCard = () => {
        card.current.flip()
    }

    const answer = () => {
    }

    const removeblur = () => {
        setBlur(false)
    }
    


    return (
        <View style={styles.container}>
            <StatusBarComponent color="white"/>
            <ProgressHeader number={4}/>
            <View style={styles.bodycontainer}>
                <View>
                    <CardFlip style={styles.cardContainer} ref={card} >
                        <TouchableOpacity style={styles.card} onPress={flipCard} >
                            <Text style={styles.label}>Test</Text>

                            <TouchableOpacity style={styles.remindsentence} onPress={removeblur} >
                                <Text style={styles.blurtext}>Since the library is a JS-based solution, to install the latest version of</Text>
                                {blur ? (
                                    <BlurView
                                        style={styles.absolute}
                                        blurType="light"
                                        blurAmount={5}
                                        reducedTransparencyFallbackColor="white"
                                    />
                                ): ""}
                                
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card2} onPress={flipCard} >
                            <Text style={styles.label2}>Thử nghiệm</Text>
                        </TouchableOpacity>
                    </CardFlip>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAnswers}
                        value={answers}
                        placeholder={`${i18n.t('words')}(${i18n.t('require')})`}
                    />
                </View>
                <TouchableOpacity style={styles.buttonadd} onPress={answer}>
                    <Text style={styles.buttontext}>Kiểm tra</Text>
                </TouchableOpacity>
            </View>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white"
    },
    cardContainer: {
      width: "100%",
      height: windowHeight/2,
      alignSelf: "center",
      zIndex: 10
    },
    card: {
      height: "100%",
      backgroundColor: flashcardbackground,
      borderRadius: 10,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
      display: "flex",
      justifyContent: "center"
    },
    card2: {
        height: "100%",
        backgroundColor: meaningbackground,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
      },
    label: {
      textAlign: 'center',
      fontSize: 35,
      fontWeight: "bold",
      fontFamily: 'System',
      color: "white",
      backgroundColor: 'transparent',
    },
    label2: {
        lineHeight: 470,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
      },    
    input: {
        backgroundColor: inputbackgroundcolor,
        marginTop: 20,
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: 20,
        color: textColor,
        paddingLeft: 10,
        zIndex: 5
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
    bodycontainer: {
        marginHorizontal: 10,
        height: windowHeight - statusBarHeight - 50,
        display: "flex",
        justifyContent: "space-between"
    },
    remindsentence: {
        position: "absolute",
        fontSize: 14,
        bottom: 20,
        width: "fit-content",
        height: "auto",
        padding: 10,
        alignSelf: "center",
        marginHorizontal: 20
    },
    blurtext:{
        fontSize: 14,
        color: "white",
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 10,
    }
  });