import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import i18n from '../../i18n';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { appUpdated, getReminderContent } from '../../api';
import { Image } from 'expo-image';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const isAndroid = Platform.OS === 'android'

const { width, height } = Dimensions.get('window');

export default function NewVersionScreen() {
    const [pages, setPages] = useState([])

    const toHome = async () => {
        await appUpdated()
        router.replace("/containers/Home");
    }

    const Skip = ({ isLight, skipLabel, ...props }) => (
        <Pressable
            style={{
                paddingLeft: scale(10)
            }}
            {...props}
        >
            <Text style={{ fontSize: scale(16) }}>{i18n.t('skip')}</Text>
        </Pressable>
    );
    const Next = ({ isLight, ...props }) => (
        <Pressable
            style={{
                paddingRight: scale(10)
            }}
            {...props}
        >
            <Text style={{ fontSize: scale(18), fontWeight: "bold" }}>{i18n.t('next')}</Text>
        </Pressable>
    );

    const doneButton = ({ ...props }) => {

        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text style={{ fontWeight: "bold", fontSize: scale(16) }}>{i18n.t('start')}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getReminderContent().then((data) => {
            let pagesInfor = []
            for(let i=0; i< data.new_version_update.length; i++){
                let rowdata = data.new_version_update[i]

                pagesInfor.push({
                    backgroundColor: rowdata.background_color,
                    image: (
                        <View style={styles.lottie}>
                            {rowdata.lottie_link_json ? (
                                <Lottie source={{ uri:rowdata.lottie_link_json }} autoPlay loop />
                            ): (
                                <Image
                                    style={styles.image}
                                    source={rowdata.image_link}
                                    height={"100%"}
                                    transition={500}
                                />
                            )}
                        </View>
                    ),
                    title: rowdata.title,
                    subtitle: rowdata.sub_title,
                })
            }

            setPages(pagesInfor)
        })
    }, [])


    return (
        <View style={styles.container}>
            {pages.length > 0 ? (
                <Onboarding
                    SkipButtonComponent={Skip}
                    NextButtonComponent={Next}
                    showNext={false}
                    onDone={toHome}
                    onSkip={toHome}
                    // onSkip={handleDone}
                    // bottomBarHighlight={false}
                    DoneButtonComponent={doneButton}
                    containerStyles={{ paddingHorizontal: 15 }}
                    pages={pages}
                />
            ) : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    doneButton: {
        height: "100%",
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        borderRadius: 15
    }
})