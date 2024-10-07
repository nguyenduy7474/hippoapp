import { Pressable, Text, View, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateListWordSelector } from '../../redux/selector';
import { getListWord } from '../../api';
import { tabbarcolor, themeColor3 } from '../../contants/style';
import checkSpecialCharacter from '../../utils/checkSpecialCharacter';
import { isTablet } from 'react-native-device-info';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Memoized RenderItem to prevent unnecessary re-renders
const RenderItem = memo(({ name, word, definition, index, editWord }) => {
    const paddingNum = 5;
    const paddingRight = index === 0 || index % 2 === 0 ? paddingNum : 0;
    const paddingLeft = index % 2 === 0 ? 0 : paddingNum;

    return (
        <View style={[styles.itemcontainer, { paddingRight: paddingRight, paddingLeft: paddingLeft }]}>
            <TouchableOpacity style={styles.card} onPress={editWord}>
                <Text style={styles.cartext}>{word}</Text>
                <Text style={styles.cartextdefi}>{definition.length > 35 ? `${definition.substr(0, 35)}...` : definition}</Text>
            </TouchableOpacity>
        </View>
    );
});

export default function ListWordsComponent({ searchtext, orderType, setTotalWord, syncLoading }) {
    const [dataWordSource, setDataWordSource] = useState([]);
    const [dataword, setDataword] = useState([]);
    const list = useRef(null);
    const updateListWord = useSelector(updateListWordSelector);
    console.log("wew")
    // Memoized function to prevent re-creation
    const getDataWord = useCallback(async () => {
        // let listWord = await getListWord();
        let listWord = await AsyncStorage.getItem("listworddata");
        listWord = JSON.parse(listWord);
        if (listWord) {
            setDataWordSource(listWord);
            setTotalWord(listWord.length);
        }
    }, [setTotalWord]);

    // Search words based on input
    useEffect(() => {
        if (!checkSpecialCharacter(searchtext)) {
            if (dataWordSource.length === 0) {
                return;
            }

            let listSearch = dataWordSource.filter(item => {
                const re = new RegExp(searchtext, "i");
                return re.test(item.word);
            });

            if (Platform.OS !== 'android') {
                list.current?.prepareForLayoutAnimationRender();
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }

            listSearch.sort((a, b) => {
                let dateA = new Date(a.modified);
                let dateB = new Date(b.modified);

                if (orderType.icon === "arrowup") {
                    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                } else {
                    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
                }
            });
            setDataword(listSearch);
        } else {
            console.info("🚀 ~ chứa ký tự đặc biệt");
        }
    }, [searchtext, dataWordSource, orderType]);

    useEffect(() => {
        getDataWord();
    }, [updateListWord, orderType, getDataWord]);

    useEffect(() => {
        if (syncLoading !== 1) {
            getDataWord();
        }
    }, [syncLoading, getDataWord]);

    const editWord = useCallback((name) => {
        router.push({ pathname: "containers/AddWord", params: { word_name: name } });
    }, []);

    return (
        <View style={styles.container}>
            {dataword.length > 0 ? (
                <FlashList
                    data={dataword}
                    renderItem={({ item, index }) => <RenderItem {...item} index={index} editWord={() => editWord(item.name)} />}
                    estimatedItemSize={dataword.length}
                    numColumns={2}
                    keyExtractor={item => item.name.toString()}
                    ref={list}
                    contentContainerStyle={{ paddingBottom: 15 }}
                />
            ) : (
                <LottieView
                    autoPlay={true}
                    style={{ width: "100%" }}
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
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    itemcontainer: {
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        height: isTablet() ? 200 : 150,
        marginBottom: 10,
    },
    card: {
        backgroundColor: tabbarcolor,
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        height: "100%",
        paddingHorizontal: 10,
    },
    cartext: {
        color: "white",
        fontSize: isTablet() ? 30 : 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    cartextdefi: {
        color: "white",
        fontSize: isTablet() ? 25 : 15,
        marginTop: 5,
    },
});