import { Pressable, Text, View, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { tabbarcolor, themeColor3 } from '../../contants/style';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState, useRef } from 'react';
import { router } from 'expo-router';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DATA = [
    {
        name: "a1",
        word: "Test",
        definition: "Thử nghiệmas das asd as das as das das  asd as as sa as as"
    },
    {
        name: "a2",
        word: "Computer",
        definition: "Máy tính"
    },
    {
        name: "a3",
        word: "Phone",
        definition: "Điện Thoại"
    },
];

const renderItem = ({ name, word, definition, index }) => {
    const paddingNum = 5
    const paddingRight = index == 0 || index%2 == 0 ? paddingNum : 0
    const paddingLeft = index %2 == 0 ? 0 : paddingNum

    const editWord = () => {
        router.push({ pathname: "containers/AddWord", params: { word_name: name } });
    }

    return (
        <View style={[styles.itemcontainer, {paddingRight: paddingRight, paddingLeft: paddingLeft}]}>
            <TouchableOpacity style={styles.card} onPress={editWord}>
                <Text style={styles.cartext}>{word}</Text>
                <Text style={styles.cartextdefi}>{definition.length > 35 ? definition.substr(0, 35) + "..." : definition}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function ListWordsComponent({ searchtext}) {
    const [dataword, setDataword] = useState(DATA)
    const list = useRef(null);

    useEffect(() => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(!format.test(searchtext)){
            let listSearch = DATA.filter(item => {
                let re = new RegExp(searchtext,"i");
                if(re.test(item.word)){
                    return true
                }
            })
            list.current?.prepareForLayoutAnimationRender();
            // After removing the item, we can start the animation.
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setDataword(listSearch)

        }
    }, [searchtext])

    return (
        <View style={styles.container}>
            <FlashList
                data={dataword}
                renderItem={({ item, index }) => renderItem({...item, index})}
                estimatedItemSize={200}
                numColumns={2}
                keyExtractor={item => item.word}
                ref={list}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignSelf:"center",
        paddingHorizontal: 10
    },
    itemcontainer: {
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        height: 150,
        marginBottom: 10
    },
    card: {
        backgroundColor: tabbarcolor,
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
        paddingVertical: 50,
        paddingHorizontal: 5,
        borderRadius: 10,
        height:"100%",
    },
    cartext: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    cartextdefi: {
        color: "white",
        fontSize: 15,
        marginTop: 5
    },
})
