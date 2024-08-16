import { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { tabbarcolor, themeColor, themeColor2 } from '../../contants/style';
import i18n from '../../i18n';
import { isTablet } from 'react-native-device-info';

const searchColor = "#616161"

export default function Search({ onChangeText }) {
    const [value, setValue] = useState("")
    useEffect(() => {
        onChangeText(value)
    }, [value])

    return (
        <View style={styles.container}>  
            <Ionicons name='search-outline' size={isTablet() ? 35 : 25} color={searchColor}/>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder={i18n.t('searchword')}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        marginTop: 10,
        paddingVertical: 20,
        paddingLeft: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        fontSize: isTablet() ? 30 : 20,
        color: searchColor,
        marginLeft: 5,
        fontWeight: "bold",
        width: "100%"
    }
})
