import { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, ToastAndroid } from 'react-native';
import { themeColor } from '../../contants/style';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import ButtonLogin from '../../components/ButtonLogin';
import { Image } from 'expo-image';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Language from './language';
import i18n from '../../i18n';
import Constants from 'expo-constants';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import * as Device from 'expo-device';
import { scale } from 'react-native-size-matters';

const deviceos = Device.osName
const statusBarHeight = Constants.statusBarHeight;


const Login = () => {
    const [iosLoginCheck, setIosLoginCheck] = useState(true)
    const [logined, setlogined] = useState(false)
    const [fontsLoaded] = useFonts({
        'commic': require('../../../assets/fonts/comicz.ttf'),
    });

    useEffect(() => {
        if (logined) {
            router.replace('/containers/Home');
        }
    }, [logined])

    useCallback(async () => {
        AppleAuthentication.isAvailableAsync().then((checkLoginAvailable) => {
            if (!checkLoginAvailable) {
                setIosLoginCheck(false)
            }
        })
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    const loginFacebook = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            async function (result) {

                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    let dataToken = await AccessToken.getCurrentAccessToken()
                    let dataProfile = await Profile.getCurrentProfile()
                    var datasave = JSON.parse(JSON.stringify(dataProfile))
                    datasave.accessToken = dataToken.accessToken
                    datasave.typeLogin = "fb-login"

                    SecureStore.setItemAsync("logindata", JSON.stringify(datasave))
                    setlogined(true)
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const loginGoogle = () => {
        console.log("gg")
    }

    const loginApple = async () => {
        try {

            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.info("🚀 ~ file: index.js:75 ~ loginApple ~ credential:", credential)
            credential.typeLogin = "apple-login"
            SecureStore.setItemAsync("logindata", JSON.stringify(credential))
            setlogined(true)
            // signed in
        } catch (e) {
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
                <ButtonLogin
                    text={i18n.t('login_with_fb')}
                    color="white"
                    iconname="logo-facebook"
                    iconcolor="white"
                    backgroundcolor="#31519a"
                    onPress={loginFacebook}
                />
                <ButtonLogin
                    text={i18n.t('login_with_google')}
                    color="white"
                    iconname="logo-google"
                    iconcolor="white"
                    backgroundcolor="#d0463b"
                    onPress={loginGoogle}
                />
                {iosLoginCheck ? (
                    <ButtonLogin
                        text={i18n.t('login_with_apple')}
                        color="white"
                        iconname="logo-apple"
                        iconcolor="white"
                        backgroundcolor="black"
                        onPress={loginApple}
                    />
                ) : ""}
            </View>
            <View style={styles.footer}>
                <Language />
            </View>
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
    }
});

{/* <View style={styles.container}>

<Link href="/containers/Home">Home</Link>
</View> */}

export default Login    