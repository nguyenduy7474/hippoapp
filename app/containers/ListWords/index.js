import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu'
import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import ListWordsComponent from './listWords';
import Search from './search';
import i18n from '../../i18n';


const TopComponent = ({ onChangeText }) => {

    const addNewWord = () => {
        router.push("containers/AddWord")
    }

    return (                
        <View style={{paddingHorizontal: 10}}>
            <TouchableOpacity style={styles.buttonadd} onPress={addNewWord}>
                <Ionicons name='add-circle-outline' size={32} color={"white"}/>
                <Text style={styles.buttontext}>{i18n.t('newword')}</Text>
            </TouchableOpacity>
            <Search onChangeText={onChangeText}/>    
        </View>
    )
}

export default function ListWords() {
    const [searchtext, setSearchtext] = useState("")

    const onChangeText = (data) => {
        setSearchtext(data)
    }

    return (
        <View style={{flex: 1}}>
            <StatusBarComponent />
            <TopMenu />
            <TopComponent onChangeText={onChangeText}/>
            <ListWordsComponent searchtext={searchtext}/>
        </View>
      );
}

const styles = StyleSheet.create({
    buttonadd: {
        backgroundColor: meaningbackground,
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttontext: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})
