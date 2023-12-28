import { Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';

import StatusBarComponent from '../../components/StatusBar'
import DoneMenu from '../../components/DoneMenu';
import { Image } from 'expo-image';
import { useState } from 'react';
import i18n from '../../i18n';
import { inputbackgroundcolor, themeColor2 } from '../../contants/style';
import { scale } from 'react-native-size-matters';

const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;

const textColor = "#5e5e5e"

export default function AddWord() {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [remindSentence, setRemindSentence] = useState("")

    const { word_name } = useLocalSearchParams();

    const saveWord = () => {
        console.info("🚀 ~ file: index.js:23 ~ saveWord ~ saveWord:")
        router.back()
    }

    const onDelete = () => {

    }

    return (
        <View style={styles.container}>
            <StatusBarComponent />
            <DoneMenu 
                onDelete={onDelete}
            />
            <View style={styles.topView}>
                <Image source={require('../../../assets/images/writebook.png')} style={styles.image}/>
                <Text style={styles.textdes}>{i18n.t('guildaddword')}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWord}
                    value={word}
                    placeholder={`${i18n.t('words')}(${i18n.t('require')})`}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDefinition}
                    value={definition}
                    placeholder={`${i18n.t('definition')}(${i18n.t('require')})`}
                />
                <TextInput
                    style={styles.inpputMultiple}
                    onChangeText={setRemindSentence}
                    multiline={true}
                    numberOfLines={10}
                    value={remindSentence}
                    placeholder={i18n.t('sentence')}
                />
                <TouchableOpacity style={styles.buttonadd} onPress={saveWord}>
                    <Text style={styles.buttontext}>{i18n.t('save')}</Text>
                </TouchableOpacity>
            </View>

        </View>
      );
}

const styles = StyleSheet.create({
    inpputMultiple: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10,
        textAlignVertical: 'top',
        height: scale(100)
    },
    input: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        marginTop: 20,
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: scale(16),
        color: textColor,
        paddingLeft: 10
    },
    textdes: {
        fontSize: scale(16),
        textAlign: "center",
        width: "70%",
        marginTop: 20,
        color: textColor
    },
    topView: {
        paddingHorizontal: 10,
        paddingTop: 50,
        alignItems:"center",
        height: windowHeight - statusBarHeight - 50,
    },
    image: {
        width: scale(100),
        height: scale(100),
    },
    buttonadd: {
        backgroundColor: themeColor2,
        width: "100%",
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        bottom: scale(50)
    },
    buttontext: {
        color: "white",
        fontSize: scale(16),
        fontWeight: "bold"
    }
})