import { Stack } from 'expo-router';
import { tabbarcolor, themeColor } from './contants/style';
import i18n from './i18n';
import store from "./redux/store";
import { Provider } from "react-redux";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token.data;
  }

export default function Layout() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
/*     useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {  
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.info("🚀 ~ file: _layout.js:70 ~ useEffect ~ response:", response.notification.request.content.data)
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []); */

    return (
        <Provider store={store}>
            <Stack screenOptions={{
                headerStyle:{
                    backgroundColor: tabbarcolor,
                    height: 50
                },
                headerTintColor:"white",
                headerTitleStyle:{
                    fontWeight: "bold"
                }
            }}>
                <Stack.Screen name="containers/Login/index" options={{headerShown: false}}/>
                <Stack.Screen name="containers/Home/index" options={{headerShown: false}}/>
                <Stack.Screen name="containers/Congratulations/index" options={{headerShown: false}}/>
                <Stack.Screen name="containers/Onboard/index" options={{headerShown: false}}/>  
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="containers/FlashCard/index" options={{
                        headerShown: false,
                        gestureDirection: "vertical",
                        gestureEnabled: true,
                    }} 
                />
                <Stack.Screen name="containers/Quiz/index" options={{
                        headerShown: false,
                        gestureDirection: "vertical",
                        gestureEnabled: true,
                    }} 
                />
                <Stack.Screen name="containers/Profile/index" options={{
                        headerTitle: i18n.t('settings'),
                        gestureDirection: "horizontal",
                        gestureEnabled: true
                    }} 
                />
                <Stack.Screen name="containers/AddWord/index" options={{
                        headerTitle: '',
                        gestureDirection: "vertical",
                        gestureEnabled: true,
                        headerShown: false
                    }} 
                />
            </Stack>
        </Provider>
    )
}