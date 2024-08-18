import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import * as Device from 'expo-device';
import { scale } from 'react-native-size-matters';
import FlashMessage from "react-native-flash-message";
import LottieView from 'lottie-react-native';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginFeature from '../../utils/login';
import Language from './language';
import i18n from '../../i18n';
import ButtonLogin from '../../components/ButtonLogin';
import { themeColor } from '../../contants/style';
import { getProfile } from '../../api';

const deviceos = Device.osName
const statusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const [iosLoginCheck, setIosLoginCheck] = useState(true)
    const [logined, setlogined] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fontsLoaded] = useFonts({
        'commic': require('../../../assets/fonts/comicz.ttf'),
    });
    const flashmessage = useRef()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (logined) {
            router.replace('/containers/Home');
        }
    }, [logined])

    useEffect(() => {
        AppleAuthentication.isAvailableAsync().then((checkLoginAvailable) => {
            if (!checkLoginAvailable) {
                setIosLoginCheck(false)
            }
        })
        i18n.onChange(() => {
            if(i18n.t('login_with_fb').indexOf("[missing") == -1){
                setLoaded(true)
            }
        });
    }, [])

    if (!fontsLoaded) {
        return null
    }

    const showmessage = () => {
        flashmessage.current.showMessage({
            message: i18n.t('changelanguage'),
            type: "success",
        });
    }

    const loginFacebook = () => {
        setLoading(true)
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            async function (result) {
                
                if (result.isCancelled) {
                    setLoading(false)
                    console.log("Login cancelled");
                } else {
                    
                    let typeLogin = "fb-login"
                    let dataToken = await AccessToken.getCurrentAccessToken()
                    let dataProfile = await getProfile(dataToken.accessToken)
                    var datasave = JSON.parse(JSON.stringify(dataProfile))
                    datasave.accessToken = dataToken.accessToken
                    datasave.typeLogin = typeLogin

                    AsyncStorage.setItem("logindata", JSON.stringify(datasave))
                    let result = await loginFeature(datasave, typeLogin)
                    if(result){
                        setlogined(true)
                    }
                    
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const loginGoogle = async () => {
        try {
            setLoading(true)
            let typeLogin = "google-login"
            GoogleSignin.configure({
                // webClientId: '912000429184-d93qqn2fa57c9ijm0tpe9qgrku6corv2.apps.googleusercontent.com',
                iosClientId: '912000429184-qvldcep1aa6e6aak76sp2truv2cvp60t.apps.googleusercontent.com',
                forceCodeForRefreshToken: true
            });
            let userInfo = await GoogleSignin.signIn()
            if(!userInfo.accessToken){
                userInfo = await GoogleSignin.getCurrentUser();
            }
            var datasave = JSON.parse(JSON.stringify(userInfo))
            datasave.accessToken = datasave.idToken
            datasave.typeLogin = typeLogin
            
            AsyncStorage.setItem("logindata", JSON.stringify(datasave))
            let result = await loginFeature(datasave, typeLogin)
            if(result){
                setlogined(true)
            }
        } catch (error) {
            console.log("🚀 ~ file: index.js:126 ~ loginGoogle ~ error:", JSON.parse(JSON.stringify(error)))
            setLoading(false)
            switch (error.code) {
            case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
                // no saved credential found, try creating an account
                break;
            case statusCodes.SIGN_IN_CANCELLED:
                console.info("Không cấp quyền")
                break;
            case statusCodes.ONE_TAP_START_FAILED:
                // Android and Web only, you probably have hit rate limiting. You can still call the original Google Sign In API in this case.
                break;
            default:
            // something else happened
            }
        }
    }

    const loginApple = async () => {
        setLoading(true)
        try {
            let typeLogin = "apple-login"
            let credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            var datasave = JSON.parse(JSON.stringify(credential))
            datasave.typeLogin = typeLogin
            
            AsyncStorage.setItem("logindata", JSON.stringify(datasave))
            let result = await loginFeature(datasave, typeLogin)
            if(result){
                setlogined(true)
            }
            // signed in
        } catch (e) {
            setLoading(false)
            if (e.code === 'ERR_REQUEST_CANCELED') {
                console.info("Không cấp quyền")
                
            } else {
                // handle other errors
            }
        }
    }

    return (
        <LinearGradient
            // Button Linear Gradient
            colors={[themeColor, "#00547B"]}
            style={styles.container}
        >
            <StatusBar
                barStyle="light-content"
            />
            {loaded || i18n.t('login_with_fb').indexOf("[missing") == -1 ? (
                <>
                    <View style={styles.toppart}>
                        <Image
                            style={styles.image}
                            source={require('../../../assets/images/logo.jpeg')}
                            contentFit="contain"
                            transition={500}
                        />
                        <Text style={styles.title}>{i18n.t('welcome')}!</Text>
                    </View>
                    <View style={styles.bottompart}>
                        <Text style={styles.quote}>"{i18n.t('quoteopenapp')}"</Text>
{/*                         <ButtonLogin
                            text={i18n.t('login_with_fb')}
                            color="white"
                            iconname="logo-facebook"
                            iconcolor="white"
                            backgroundcolor="#31519a"
                            onPress={loginFacebook}
                        /> */}
                        <ButtonLogin
                            text={i18n.t('login_with_google')}
                            color="white"
                            iconname="logo-google"
                            iconcolor="white"
                            backgroundcolor="#d0463b"
                            onPress={loginGoogle}
                        />
                        <ButtonLogin
                            text={i18n.t('login_with_apple')}
                            color="white"
                            iconname="logo-apple"
                            iconcolor="white"
                            backgroundcolor="black"
                            onPress={loginApple}
                            disabled={!iosLoginCheck ? true : false}
                        />
                    </View>
                </>
            ): (
                <View style={{ flex: 1, backgroundColor: "white"}}>
                </View>
            )}

            <View style={styles.footer}>
                <Language 
                    showmessage={showmessage}
                />
            </View>
            {loading ? (
                <>
                    <View style={styles.loading}>
                    </View>
                    <LottieView
                        autoPlay={true}
                        style={{
                            width: scale(200),
                            position: "absolute",
                            zIndex: 10,
                            alignSelf: "center",
                            height: "100%"
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../../../assets/lottie/loading.json')}
                    />
                </>
            ): ""}

            <FlashMessage 
                ref={flashmessage} 
                floating={true}
                position="bottom"
                icon="success"
                style={{
                    bottom: scale(50)
                }}
            />
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding: 10,
    },
    quote: {
        color: "#bfbfbf",
        fontSize: scale(16),
        marginBottom: 15,
        fontFamily: 'commic'
    },
    title: {
        fontFamily: 'commic',
        fontSize: scale(30),
        color: "white",

        textAlign: "center"
    },
    toppart: {
        marginTop: statusBarHeight,
        alignItems: "center"
    },
    bottompart: {
        backgroundColor: "white",
        flex: 1,
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
        paddingTop: "5%"
    },
    image: {
        height: 100,
        width: 100,
        backgroundColor: themeColor,
        borderRadius: 10
    },
    footer: {
        width: "100%",
        paddingBottom: deviceos == "Android" ? 10 : 20,
        backgroundColor: "white",
        paddingHorizontal: 10
    },
    loading: {
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
        zIndex: 5
    }
});

{/* <View style={styles.container}>

<Link href="/containers/Home">Home</Link>
</View> */}

export default Login    