import { Pressable, Text, View, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState, useRef, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { updateListWordSelector } from '../../redux/selector';
import { getListWord } from '../../api';
import { tabbarcolor, themeColor3 } from '../../contants/style';
import checkSpecialCharacter from '../../utils/checkSpecialCharacter';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

export default function ListWordsComponent({ searchtext, orderType, setTotalWord }) {
    const [dataWordSource, setDataWordSource] = useState([])
    const [dataword, setDataword] = useState([])
    const list = useRef(null);
    const updateListWord = useSelector(updateListWordSelector)

    const getDataWord = async () => {
        let listWord = await getListWord()
        if(listWord){
            setDataWordSource(listWord.data)
            setTotalWord(listWord.data.length)
        }
    }

    useEffect(() => {
        if(!checkSpecialCharacter(searchtext)){
            if(dataWordSource.length == 0){
                return
            }
            let listSearch = dataWordSource.filter(item => {
                let re = new RegExp(searchtext,"i");
                if(re.test(item.word)){
                    return true
                }
            })
            if(Platform.OS != 'android'){
                list.current?.prepareForLayoutAnimationRender();
                // After removing the item, we can start the animation.
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }

            listSearch.sort((a, b) => {
                let dateA = new Date(a.modified);
                let dateB = new Date(b.modified);
                
                if(orderType.icon == "arrowup"){
                    if (dateA > dateB) return -1; // Change to -1 for descending order
                    if (dateA < dateB) return 1;  // Change to 1 for descending order
                }else{
                    if (dateA < dateB) return -1; // Change to -1 for ascending order
                    if (dateA > dateB) return 1;  // Change to 1 for ascending order
                }
                return 0;
            })
            setDataword(listSearch)
        }else{
            console.info("🚀 ~ chứa ký tự đặc biệt")
        }
    }, [searchtext, dataWordSource])

    useEffect(() => {
        setDataword([])
    }, [updateListWord])

    useEffect(() => {
        setDataword([])
    }, [orderType])

    useEffect(() => {
        if(dataword.length == 0){
            getDataWord()
        }
    }, [dataword])

    return (
        <View style={styles.container}>
            {dataword.length > 0 ? (
                <FlashList
                    data={dataword}
                    renderItem={({ item, index }) => renderItem({...item, index})}
                    estimatedItemSize={dataword.length}
                    numColumns={2}
                    keyExtractor={item => item.name.toString()}
                    ref={list}
                    contentContainerStyle={{
                        paddingBottom: 15
                    }}
                />
            ): (
                <LottieView
                    autoPlay={true}
                    style={{
                        width: "100%"
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../../assets/lottie/notfound.json')}
                />
            )}

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignSelf:"center",
        paddingHorizontal: 10,
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
