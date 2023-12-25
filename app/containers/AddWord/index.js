import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import DoneMenu from '../../components/DoneMenu';
import { Image } from 'expo-image';
import { useState } from 'react';
import i18n from '../../i18n';
import { useLocalSearchParams } from 'expo-router';
import { inputbackgroundcolor } from '../../contants/style';

const textColor = "#5e5e5e"

export default function AddWord() {
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [remindSentence, setRemindSentence] = useState("")

    const { word_name } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <StatusBarComponent />
            <DoneMenu />
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
        fontSize: 20,
        color: textColor,
        paddingLeft: 10,
        textAlignVertical: 'top',
        height:200
    },
    input: {
        backgroundColor: inputbackgroundcolor,
        width: "100%",
        marginTop: 20,
        paddingVertical: 20,
        borderRadius: 10,
        fontSize: 20,
        color: textColor,
        paddingLeft: 10
    },
    textdes: {
        fontSize: 18,
        textAlign: "center",
        width: "70%",
        marginTop: 20,
        color: textColor
    },
    topView: {
        paddingHorizontal: 10,
        marginTop: 50,
        alignItems:"center"
    },
    image: {
        width: 100,
        height: 100,
    }
})