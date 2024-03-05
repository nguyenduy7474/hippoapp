import { Stack, router } from 'expo-router';
import { tabbarcolor, themeColor } from './contants/style';
import i18n from './i18n';
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useState, useEffect, useRef } from 'react';
import { Platform, AppState } from 'react-native';
import { checkVersionUpdate } from './api';


import { saveQuestiosQuiz } from './redux/action';
import { getQuestionsQuiz } from './api';

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
  if (token) {
    return token.data;
  }
  return ""
}

export default function Layout() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const openQuiz = () => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      if (response.notification.request.content.data.quiz) {
        router.push('containers/Quiz')
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  const stateapp = () => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('AppState', nextAppState);
        checkVersionUpdate().then((data) => {
          console.info("🚀 ~ file: _layout.js:95 ~ checkVersionUpdate ~ data:", data)
          if (typeof data == "object" && !data.updateversion) {
            router.replace("/containers/NewVersion")
          } else {
            openQuiz()
          }
        })
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);

    });

    return () => {
      subscription.remove();
    };
  }

  useEffect(() => {
    stateapp()
  }, []);

  return (
    <Provider store={store}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: tabbarcolor,
          height: 50
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}>
        <Stack.Screen name="containers/ListWords/index" options={{ headerShown: false }} />
        <Stack.Screen name="containers/Login/index" options={{ headerShown: false }} />
        <Stack.Screen name="containers/Home/index" options={{ headerShown: false }} />
        <Stack.Screen name="containers/Congratulations/index" options={{ headerShown: false }} />
        <Stack.Screen name="containers/Onboard/index" options={{ headerShown: false }} />
        <Stack.Screen name="containers/NewVersion/index" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
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
          gestureEnabled: true,
          headerShown: false
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