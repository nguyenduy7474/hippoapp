import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import React from 'react';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { isTablet } from 'react-native-device-info';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';


export default React.memo(function TopMenu({ signed = true, leftdata, syncLoading}) {
    const [icon, setIcon] = useState(require('../../assets/lottie/sync.json'))
    const [size, setSize] = useState(30)
    const onPressProfile = () => {
        if(signed){
            router.push('containers/Profile')
        }else{
            router.replace('/containers/Login');
        }
    }

    useEffect(() => {
        if(syncLoading == 0){
            setSize(30)
            setIcon(require('../../assets/lottie/sync.json'))
        }
        if(syncLoading == 1){
            setSize(30)
            setIcon(require('../../assets/lottie/sync.json'))
        }
        if(syncLoading == 2){
            setIcon(require('../../assets/lottie/checked.json'))
            setSize(50)
        }
    }, [syncLoading])

    return (
        <View style={styles.container}>
            {typeof leftdata == "number" ? (
                <Text style={{
                    color: "white",
                    fontSize: isTablet() ? scale(12) : scale(18)
                }}>{leftdata}</Text>
            ): (
                <Text></Text>
            )}
            <View style={styles.topright}>
                {syncLoading != undefined ? (
                    <LottieView
                        style={{
                            marginRight: 10,
                            width: size,
                            height: size
                        }}
                        autoPlay={true}
                        loop={false}
                        progress={0}
                        useNativeDriver={true}
                        source={icon}
                    />
                ): null}

                <TouchableOpacity onPress={onPressProfile}>
                    <Image source={require('../../assets/icon.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    );
})

const styles = StyleSheet.create({
    topright: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        height: 50,
        width: "100%",
        backgroundColor: tabbarcolor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50
    }
})
