import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import i18n from '../../i18n';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const [loaded, setLoaded] = useState(false)

    const toHome = async () => {
        // await updateFirstSigned()
        // await AsyncStorage.setItem("hasopen", "true")
        router.replace("/containers/Login");
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
        i18n.onChange(() => {
            if (i18n.t('greeting').indexOf("[missing") == -1) {
                setLoaded(true)
            }
        });
    }, [])


    return (
        <View style={styles.container}>
            {loaded || i18n.t('greeting').indexOf("[missing") == -1 ? (
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
                    pages={[
                        {
                            backgroundColor: '#a7f3d0',
                            image: (
                                <View style={styles.lottie}>
                                    <Lottie source={require('./animations/hello.json')} autoPlay loop />
                                </View>
                            ),
                            title: i18n.t('greeting'),
                            subtitle: i18n.t('greeting_sub'),
                        },
                        {
                            backgroundColor: '#ACC8E5',
                            image: (
                                <View style={styles.lottie}>
                                    <Lottie source={require('./animations/calendar.json')} autoPlay loop />
                                </View>
                            ),
                            title: i18n.t('calendar_onboard'),
                            subtitle: i18n.t('calendar_onboard_sub'),
                        },
                        {
                            backgroundColor: '#fef3c7',
                            image: (
                                <View style={styles.lottie}>
                                    <Lottie source={require('./animations/work.json')} autoPlay loop />
                                </View>
                            ),
                            title: i18n.t('learning_system_onboard'),
                            subtitle: i18n.t('learning_system_onboard_sub'),
                        },
                        {
                            backgroundColor: '#ACC8E5',
                            image: (
                                <View style={styles.lottie}>
                                    <Lottie source={require('./animations/dontquit.json')} autoPlay loop />
                                </View>
                            ),
                            title: i18n.t('dontquit_onboard'),
                            subtitle: i18n.t('dontquit_onboard_sub'),
                        },
                    ]}
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
    }
})