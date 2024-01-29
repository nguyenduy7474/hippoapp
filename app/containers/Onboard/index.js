import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Button } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import i18n from '../../i18n';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { updateFirstSigned } from '../../api';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const toHome = async () => {
        await updateFirstSigned()
        router.push({ pathname: "containers/Home", params: { signed: 1 } });
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

    const doneButton = ({...props})=>{

        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text style={{ fontWeight: "bold", fontSize: scale(16)}}>{i18n.t('start')}</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
      <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            showNext={false}
            onDone={toHome}
            onSkip={toHome}
            // onSkip={handleDone}
            // bottomBarHighlight={false}
            DoneButtonComponent={doneButton}
            containerStyles={{paddingHorizontal: 15}}
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie:{
        width: width*0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    }
})