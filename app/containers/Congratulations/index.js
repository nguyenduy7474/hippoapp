import { Pressable, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState, useRef, useCallback } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import i18n from '../../i18n';
import { scale } from 'react-native-size-matters';
import { tabbarcolor } from '../../contants/style';
import { isTablet } from 'react-native-device-info';

const windowHeight = Dimensions.get('window').height;

export default function Congratulations({ searchtext }) {
    const { task_today, correct, wrong } = useLocalSearchParams()

    const endquiz = () => {
        router.replace('/containers/Home')
    }

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay={true}
                style={{
                    width: "100%"
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../../assets/lottie/congratulation.json')}
            />
            <Text style={styles.congratulation}>{i18n.t('congratulation')}</Text>
            { task_today != 0 ? (
                <Text style={styles.congratulationsub}>{i18n.t('donetaskday')}</Text>
            ): (
                <Text style={styles.congratulationsub}>{i18n.t('endquiz', { correct_count: correct })}</Text>
            )}
            

            <TouchableOpacity style={styles.buttonadd} onPress={endquiz}>
                <Text style={styles.buttontext}>{i18n.t('done')}</Text>
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignSelf:"center",
        paddingHorizontal: 10,
        height: windowHeight,
        backgroundColor:"white",
        paddingTop: 100
    },
    buttontext: {
        color: "white",
        fontSize: scale(16),
        fontWeight: "bold"
    },
    buttonadd: {
        backgroundColor: tabbarcolor,
        width: "100%",
        alignItems: "center",
        paddingVertical: 18,
        alignSelf: "center",
        borderRadius: 10,
        position: "absolute",
        bottom: isTablet() ? scale(20) : scale(50)
    },
    congratulation: {
        alignSelf: "center",
        color: tabbarcolor,
        fontSize: scale(35),
        fontWeight: "bold"
    },
    congratulationsub: {
        alignSelf: "center",
        color: tabbarcolor,
        fontSize: isTablet() ? scale(20) : scale(25),
        marginTop: isTablet() ? scale(20) : scale(50)
    },
})
