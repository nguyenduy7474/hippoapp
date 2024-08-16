import Modal from "react-native-modal";
import {
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import { scale } from "react-native-size-matters";
import CountryFlag from "react-native-country-flag";
import { useEffect, useState } from "react";

import { definitionbackground, tabbarcolor } from "../../contants/style";
import { isTablet } from 'react-native-device-info';

const screenHeight = Dimensions.get("screen").height
const backgroundColorTrans = "#f2f2f2"

const Traslationsword = ({ translations }) => {
    let arrayData = []

    for (const [key, value] of Object.entries(translations)) {
        arrayData.push(
            <View style= {{ marginVertical: scale(10), flexDirection: "column" }} key={value}>
                <Text style={{
                    fontSize: scale(16),
                    fontWeight: "bold"
                }}>{key}</Text>
                <View style={{ flexDirection: "row", flexWrap: 'wrap'}}>
                    {
                        value.map(element => {
                            return (
                                <View style={styles.translationsstyleview} key={element}>
                                    <Text style={styles.translationsstyle}>{element}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    return (
        <View>
            { arrayData }
        </View>
    )
}

export default function TransalteWordModal({ 
    isVisibleModalTranslate,
    closeModal,
    useDefinition,
    dataTranslate,
    srCountryCode,
    tgCountryCode,
    wordtypedata
}) {
    const [datarender, setDatarender] = useState({})

    useEffect(() => {

        if(Object.keys(dataTranslate).length > 0){
            let dataTranslate2 = {}
            for(let i=0; i< Object.keys(dataTranslate.translations).length; i++){

                for(let j=0; j< wordtypedata.length; j++){
                    if(Object.keys(dataTranslate.translations)[i] == wordtypedata[j].wordtype){
                        dataTranslate2[wordtypedata[j].value] = dataTranslate.translations[wordtypedata[j].wordtype]
                    }
                }
            }

            setDatarender({
                ...dataTranslate,
                translations: dataTranslate2
            })
        }
    }, [dataTranslate])

    return (
        <Modal 
            isVisible={isVisibleModalTranslate} 
            hideModalContentWhileAnimating={true}
        >
            <View style={styles.modal}>
                <ScrollView style={styles.showdata}>
                    <View style={styles.wrapview}>
                        <View style={{ width: "50%"}}>
                            <CountryFlag 
                                isoCode={tgCountryCode || ""}
                                size={scale(30)}
                                style={{ borderRadius: scale(5)}}
                            />
                        </View>
                        <View style={{ width: "50%"}}>
                            <CountryFlag 
                                isoCode={srCountryCode || ""}
                                size={scale(30)}
                                style={{ borderRadius: scale(5)}}
                            />
                        </View>
                    </View>
                    {datarender ? (
                        <>
                            <View style={styles.wrapview}>
                                <View style={[styles.wordsquare, { paddingLeft: 0}]}>
                                    <Text style={styles.textdatavalue}>{datarender.word}</Text>
                                    {datarender.wordTranscription ? (
                                        <Text style={styles.wordtranscription}>/{datarender.wordTranscription}/</Text>
                                    ): null}
                                </View>
                                <View style={[styles.wordsquare, { backgroundColor: backgroundColorTrans}]}>
                                    <Text style={styles.textdatavalue}>{datarender.translation}</Text>
                                </View>
                            </View>
                            <Traslationsword translations={datarender.translations}/>
                        </>
                    ): null}


                </ScrollView>
                
                <View style={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    marginTop: scale(5), 
                    width: "100%",
                    paddingHorizontal: scale(40)
                }}>
                    <TouchableOpacity
                        style={[styles.buttonModal, { backgroundColor: "grey" }]}
                        onPress={closeModal}
                    >
                        <Text style={styles.buttonText}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonModal, { backgroundColor: tabbarcolor }]}
                        onPress={useDefinition}
                    >
                        <Text style={styles.buttonText}>Dùng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    translationsstyleview: {
        margin: isTablet() ? 10 : 5,
        marginLeft: 0,
        padding: isTablet() ? 15 : 10,
        backgroundColor: backgroundColorTrans,
        borderRadius: 5
    },
    translationsstyle: { 
        color: "black", 
        fontSize: scale(16)
    },
    wordtranscription: {
        fontSize: scale(14),
        color: definitionbackground
    },
    wordsquare: {
        width: "50%",
        height: "auto",
        minHeight: scale(80),
        borderRadius: 10,
        padding: scale(10)
    },
    wrapview: { 
        display: "flex", 
        flexDirection: "row", 
        marginBottom: scale(10),
    },
    textdatalabel: {
        fontSize: scale(16),
        marginRight: scale(5)
    },
    textdatavalue: {
        fontSize: scale(18),
        fontWeight: "bold",
        color: definitionbackground
    },
    showdata: {
        width: "100%",
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    buttontext: {
        color: "white",
        fontSize: scale(14),
        fontWeight: "bold"
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingVertical: 30,
        alignItems: "center",
        maxHeight: screenHeight - screenHeight / 5
    },
    buttonModal: {
        padding: 10,
        paddingVertical: 10,
        borderRadius: 5,
        width: "30%",
        alignItems: "center"
    },
    buttonText: {
        fontSize: scale(14),
        color: "white"
    },
    titleModal: {
        fontSize: scale(16),
        marginBottom: 20
    }
})
